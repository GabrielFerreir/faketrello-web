let db = require('../db-config.js')
let fs = require('fs')
let app = require('express')
let md5 = require('md5')
let socket = require('./socket.js')

//Adiciona quadros nos projetos
exports.newblock = function (req, res) {
  let idProject = req.params.id

  if (req.body.nameBlock && req.body.nameBlock.length > 0 && req.body.nameBlock.length < 50) {

    db.any('SELECT * FROM newblocks($1,$2,$3)', [req.body.nameBlock, idProject, req.dataToken.id])
      .then(data => {
        if (data) {
          res.status(200).json({result: 'Quadro criado'})
        } else {
          res.status(404).json({error: 'Projeto nao foi encontrado'})
        }
      })
  } else {
    res.status(406).json({error: 'Nome do bloco muito longo ou muito curto'})
  }
}

//Muda o nome do bloco
exports.changeBlockName = function (req, res) {
  if (req.body.newName && req.body.newName.length > 0 && req.body.newName.length <= 50) {

    db.any('SELECT * FROM changeBlockName($1,$2,$3)', [req.body.newName, req.params.id, req.dataToken.id])
      .then(data => {
        if (!data || !data[0].changeblockname) {
          res.status(404).json({error: 'Nao foi possivel encontrar o bloco desejado'})
        } else {
          res.status(200).json({result: 'Alterado com sucesso'})
        }
      })
  } else {
    res.status(406).json({error: 'Nome do bloco muito longo ou muito curto'})
  }
}

//Mostra os blocos do projeto
exports.seachblocks = function (req, res) {
  db.any('SELECT * FROM searchblock($1)', [req.params.id])
    .then(data => {
      if (!data || !data[0]) {
        res.status(404).json({error: 'Esse projeto nao foi encontrado'})
      } else {
        res.status(200).json(data)
      }
    })
}

//Deleta um bloco
exports.deleteBlock = function (req, res) {
  db.any('SELECT * FROM deleteBlock($1,$2)', [req.params.id, req.dataToken.id])
    .then(data => {
      if (data) {
        res.status(200).json({result: 'Bloco deletado!'})
      } else {
        res.status(404).json({error: 'Bloco nao encontrado'})
      }
    })
}

//Cria uma nova tarefa
exports.newtask = async function (req, res) {
  req.idBlock = req.params.id
  await lastPosition(req, res)
  if (req.body.nameTask && req.body.nameTask.length > 0 && req.body.nameTask.length <= 100) {

    db.any('SELECT * FROM newtasks($1,$2,$3,$4,$5,$6)', [req.body.nameTask, req.body.finalDate, req.body.description, req.params.id, req.lastPosition, req.dataToken.id])
      .then(data => {
        if (!data || !data[0]) {
          res.status(404).json({error: 'Nao foi encontrado esse bloco no projeto'})
        } else {
          res.status(200).json({result: 'Tafera criada'})
        }
      })
  } else {
    res.status(406).json({code: 406, message: 'Nome da tarefa muito longo ou muito curto'})
  }
}

//Altera tarefa
exports.changeTask = function (req, res) {
  if (req.body.nameTask && req.body.nameTask.length > 0 && req.body.nameTask.length <= 100) {

    db.any('SELECT * FROM changeTask($1,$2,$3,$4,$5)', [req.params.id, req.body.nameTask, req.body.finalDate, req.body.description, req.dataToken.id])
      .then(data => {
        if (!data) {
          res.status(404).json({error: 'Tarefa nao encontrada'})
        } else {
          res.status(200).json({result: 'Alterado com sucesso'})
        }
      })
  } else {
    res.status(406).json({code: 406, message: 'Nome da tarefa muito longo ou muito curto'})
  }
}

//Move a tarefa de bloco
exports.moveTask = async function (req, res) {
  await db.any('SELECT * FROM moveTask($1,$2,$3)', [req.params.id, req.body.idBlock, req.dataToken.id])
    .then(data => {
      if (!data) {
        res.status(400).json({error: 'Erro ao mover tarefa'})
      } else {

        exports.updatePositions(req, res)
      }
    })
}

//Mostra conteudo das tarefas
exports.showContentTask = function (req, res) {
  db.any('SELECT * FROM showContentTask($1)', [req.params.id])
    .then(data => {
      if (!data || !data[0]) {
        res.status(404).json({error: 'Tarefa nao existe ou vazia'})
      } else {
        res.status(200).json(data[0])
      }
    })
}

//Deleta a tarefa
exports.deleteTask = function (req, res) {
  db.any('SELECT * FROM deleteTask($1,$2)', [req.params.id, req.dataToken.id])
    .then(data => {
      if (!data || !data[0].deletetask) {
        res.status(404).json({error: 'Tarefa nao encontrada'})
      } else {
        res.status(200).json({result: 'Deletado!'})
      }
    })
}

//Novo anexo
exports.newAttachment = async function (req, res) {
  req.fileName = req.body.fileName
  let path = await buildAttachment(req, res)

  db.any('SELECT * FROM buildAttachment($1,$2,$3,$4,$5)', [req.body.fileName, req.body.size, req.params.id, path, req.dataToken.id])
    .then(data => {
      if (!data || !data[0]) {
        res.status(404).json({error: 'Tarefa nao encontrada'})
      } else {
        res.status(200).json({result: 'Anexo criado'})
      }
    })
}

//Cria arquivo do anexo no servidor
function buildAttachment (req) {
  return new Promise(async function (resolve, reject) {
    const fs = require('fs')
    let file = req.body.file
    let matches = file.split(',', 2)
    let response = {}
    let extensions = ['jpg', 'jpeg', 'png', 'gif', 'rar', 'zip', '7z', '3gp', 'm4a', 'mp3', 'ogg', 'wma', 'wmv', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'mp4', 'avi', 'mkv', 'mov', 'flv', 'mpg', 'mpeg', 'xd', 'psd', 'ai', 'txt', 'html', 'css']

    if (extensions.indexOf(req.body.fileType) !== -1) {
      let d = new Date()
      let dateT = d.getTime()

      let string = req.body.fileName + req.body.fileType + dateT
      let encode = md5(string)
      response.data = new Buffer(matches[1], 'base64')
      let caminhoBd = `./files/attachment/${encode}.${req.body.fileType}`

      let caminho = caminhoBd.replace('./files', '')

      fs.writeFile(caminhoBd, response.data, function (error) {
        if (error) {
          reject(error)
        } else {
          resolve(caminho)
        }
      })
    } else {
      reject('Tipo incorreto de arquivo')
    }
  })
}

//Cria as checklists no banco
exports.newChecklist = function (req, res) {
  let json = req.body.jsonChecklists
  if (json[0].namechecklist && json[0].namechecklist.length > 0 && json[0].namechecklist.length <= 100) {

    db.any('SELECT * FROM buildChecklist($1,$2);', [JSON.stringify(json), req.dataToken.id])
      .then(data => {
        if (!data) {
          res.status(404).json({error: 'Tarefa inexistente'})
        } else {
          res.status(200).json({result: 'Checklist criada com sucesso'})
        }
      })
  } else {
    res.status(406).json({error: 'Nome da checklist muito longo ou muito curto'})
  }
}

//Altera a booleana da checkList
exports.changeStatusChecklist = function (req, res) {
  db.any('SELECT * FROM ChangeStatusChecklist($1,$2)', [req.params.id, req.dataToken.id])
    .then(data => {
      if (!data || !data[0].rstatus) {
        res.status(404).json({error: 'Checklist nao encontrada'})
      } else {
        res.status(200).json({result: data[0].rstatus})
      }
    })
}

//Altera o nome da checklist
exports.changeNameChecklist = function (req, res) {
  db.any('SELECT * FROM changeNameChecklist($1,$2,$3)', [req.params.id, req.body.name, req.dataToken.id])
    .then(data => {
      console.log(req.params.id)
      if (!data || !data[0].changenamechecklist) {
        res.status(404).json({error: 'Id Inexistente'})
      } else {
        res.status(200).json({result: 'Alterado'})
      }
    })
}

//Deletar checklists
exports.deleteChecklist = function (req, res) {
  db.any('SELECT * FROM deleteChecklist($1,$2)', [req.params.id, req.dataToken.id])
    .then(data => {
      if (!data) {
        res.status(404).json({error: 'Checklist nao encontrada'})
      } else {
        res.status(200).json({result: 'Deletado'})
      }
    })
}

//Cria comentario nas tarefas
exports.newComment = function (req, res) {
  db.any('SELECT * FROM newComment($1,$2,$3)', [req.body.idTask, req.body.comment, req.dataToken.id])
    .then(data => {
      if (data) {
        res.status(200).json({result: 'Comentário adicionado a tarefa'})
      } else {
        res.status(404).json({error: 'Tarefa nao encontrada no banco'})
      }
    })
}

//Altera comentario
exports.changeComment = function (req, res) {
  db.any('SELECT * FROM changeComment($1,$2,$3);', [req.params.id, req.body.comment, req.dataToken.id])
    .then(data => {
      if (!data || !data[0].changecomment) {
        res.status(404).json({error: 'Comentário não encontrado'})
      } else {
        res.status(200).json({result: 'Comentário alterado'})
      }
    })
}

//Deletar comentário
exports.deleteComment = function (req, res) {
  db.any('SELECT * FROM deleteComment($1,$2)', [req.params.id, req.dataToken.id])
    .then(data => {
      if (!data) {
        res.status(404).json({error: 'Comentário nao encontrado'})
      } else {
        res.status(200).json({result: 'Comentário deletado'})
      }
    })
}

//Deleta o attachment
exports.deleteAttachment = function (req, res) {
  db.any('SELECT * FROM deleteAttachment($1,$2)', [req.params.id, req.dataToken.id])
    .then(data => {
      if (!data || !data[0]) {
        res.status(404).json({error: 'Erro ao remover'})
      } else {
        fs.unlink('./files' + data[0].path, function (error) {
          if (error) {
            console.log(error)
          } else {
            res.status(200).json({result: 'Anexo removido'})
          }
        })
      }
    })
}

//Atualiza posições das tarefas
exports.updatePositions = function (req, res) {
  db.any('SELECT * FROM updatePositions($1,$2)', [JSON.stringify(req.body.positions), JSON.stringify(req.body.oldPositions)])
    .then(data => {
      if (!data || !data[0]) {
        console.log(data)
      } else {
        res.status(200).json({result: 'Posições alteradas'})
      }
    })
}

//Pega a ultima posição do bloco
async function lastPosition (req) {
  const data = await db.any('SELECT * FROM getLastPosition($1)', [req.idBlock])
  if (!data || !data[0]) {
    console.log(data)
  } else {
    req.lastPosition = data[0].position
  }
}

//Insere membros no projeto
exports.insertMembersTask = function (req, res) {
  db.any('SELECT * FROM insertMembersTask($1,$2,$3)', [req.params.id, req.body.idUser, req.dataToken.id])
    .then(data => {
      if (!data || !data[0].insertmemberstask) {
        res.status(409).json({error: 'Tarefa nao encontrada ou usuario já inserido'})
      } else {
        res.status(200).json({result: 'Inserido'})
      }
    })
}

//Remove membro da tarefa
exports.removeMemberTask = function (req, res) {

  db.any('SELECT * FROM removeMemberTask($1,$2)', [req.params.id, req.dataToken.id])
    .then(data => {
      if (!data) {
        res.status(404).json({error: 'Tarefa nao encontrada'})
      } else {
        res.status(200).json({result: 'Removido'})
      }
    })
}
