let db = require('../db-config.js')
let fs = require('fs')
let app = require('express')
let socket = require('socket.io')
let http = require('http')
const server = http.Server(app)
server.listen(3000)
const io = socket(server)

//Adiciona quadros nos projetos
exports.newblock = function (req, res) {
  let idProject = req.params.id
  db.any('SELECT * FROM newblocks($1,$2)', [req.body.nameBlock, idProject])
    .then(data => {
      if (data) {
        res.status(200).json({result: 'Quadro criado'})
      } else {
        res.status(404).json({error: 'Projeto nao foi encontrado'})
      }
    })
}

//Muda o nome do bloco
exports.changeBlockName = function (req, res) {
  db.any('SELECT * FROM changeBlockName($1,$2)', [req.body.newName, req.body.idBlock])
    .then(data => {
      if (!data) {
        res.status(404).json({error: 'Nao foi possivel encontrar o bloco desejado'})
      } else {
        res.status(200).json({result: 'Alterado com sucesso'})
      }
    })
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
  db.any('SELECT * FROM deleteBlock($1)', [req.params.id])
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
  //let position = await exports.lastPosition(req, res)
  db.any('SELECT * FROM newtasks($1,$2,$3,$4)', [req.body.nameTask, req.body.finalDate, req.body.description, req.params.id])
    .then(data => {
      if (!data || !data[0]) {
        res.status(404).json({error: 'Nao foi encontrado esse bloco no projeto'})
      } else {
        if (req.body.attachment) {
          req.idTask = data[0].idtask
          let path = exports.buildAttachment(req, res)

          db.any('SELECT * FROM buildAttachment($1,$2,$3,$4)', [req.body.fileName, req.body.size, req.idTask, path])
            .then(data => {
              if (!data) {
                res.status(404).json({error: 'Erro ao inserir o anexo porque nao encontrou tarefa criada'})
              } else {
                res.status(200).json({result: 'Tafera criada'})
              }
            })
        } else {
          res.status(200).json({result: 'Tafera criada'})
        }
      }
    })
}

//Altera tarefa
exports.changeTask = function (req, res) {
  db.any('SELECT * FROM changeTask($1,$2,$3,$4)', [req.body.idTask, req.body.nameTask, req.body.finalDate, req.body.description])
    .then(data => {
      if (!data) {
        res.status(404).json({error: 'Tarefa nao encontrada'})
      } else {
        res.status(200).json({result: 'Alterado com sucesso'})
      }
    })
}

//Move a tarefa de bloco
exports.moveTask = async function (req, res) {
  await db.any('SELECT * FROM moveTask($1,$2)', [req.body.idTask, req.body.idBlock])
    .then(data => {
      if (!data) {
        res.status(400).json({error: 'Erro ao mover tarefa'})
      } else {
        res.status(200).json({result: 'Movido!'})

        io.on('connection', function (socket) {
          socket.emit('moved', {
            greeting: 'list updated'
          })
        })

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
  db.any('SELECT * FROM deleteTask($1)', [req.params.id])
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
  req.idTask = req.body.idTask
  let path = await exports.buildAttachment(req, res)

  db.any('SELECT * FROM buildAttachment($1,$2,$3,$4)', [req.body.fileName, req.body.size, req.body.idTask, path])
    .then(data => {
      if (!data || !data[0]) {
        res.status(404).json({error: 'Tarefa nao encontrada'})
      } else {
        res.status(200).json({result: 'Anexo criado'})
      }
    })
}

//Cria arquivo do anexo no servidor
exports.buildAttachment = function (req, res) {
  return new Promise(async function (resolve, reject) {
    const fs = require('fs')
    let file = req.body.file
    let matches = file.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)
    let response = {}
    let extensions = ['jpg', 'jpeg', 'png', 'gif', 'rar', 'zip', '7z', '3gp', 'm4a', 'mp3', 'ogg', 'wma', 'wmv', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'mp4', 'avi', 'mkv', 'mov', 'flv', 'mpg', 'mpeg', 'xd', 'psd', 'ai', 'txt', 'html', 'css']

    if (matches.length !== 3) {
      return new Error('Invalid input string')
    }
    response.type = matches[1]
    if (extensions.indexOf(req.body.fileType) !== -1) {

      response.data = new Buffer(matches[2], 'base64')
      let caminhoBd = `./files/attachment/${req.idTask}.rar`

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
  db.any('SELECT * FROM buildChecklist($1,$2);', [req.body.idTask, JSON.stringify(json)])
    .then(data => {
      if (!data) {
        res.status(404).json({error: 'Tarefa inexistente'})
      } else {
        res.status(200).json({result: 'Checklist criada com sucesso'})
      }
    })
}

//Altera a booleana da checkList
exports.changeStatusChecklist = function (req, res) {
  db.any('SELECT * FROM ChangeStatusChecklist($1)', [req.body.idChecklist])
    .then(data => {
      if(!data) {
        res.status(404).json({error: 'Checklist nao encontrada'})
      } else {
        res.status(200).json({result: 'Alterado'})
      }
    })
}

//Cria comentario nas tarefas
exports.newComment = function (req, res) {
  db.any('SELECT * FROM newComment($1,$2)', [req.body.idTask, req.body.comment])
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
  db.any('SELECT * FROM changeComment($1,$2);', [req.body.idComment, req.body.comment])
    .then(data => {
      if (!data) {
        res.status(404).json({error: 'Comentário não encontrado'})
      } else {
        res.status(200).json({result: 'Comentário alterado'})
      }
    })
}

//Deletar comentário
exports.deleteComment = function (req, res) {
  db.any('SELECT * FROM deleteComment($1)', [req.params.id])
    .then(data => {
      if(!data) {
        res.status(404).json({error: 'Comentário nao encontrado'})
      } else {
        res.status(200).json({result: 'Comentário deletado'})
      }
    })
}

//Deleta o attachment
exports.deleteAttachment = function (req, res) {
  db.any('SELECT * FROM getPathAttachment($1)', [req.params.id])
    .then(data => {
      if (!data || !data[0]) {
        res.status(404).json({error: ' Tarefa inexistente'})
      } else {
        fs.unlink('./files' + data[0].path, function (error) {
          if (error) {
            console.log(error)
          }
          else {
            db.any('SELECT * FROM removePathAttachment($1)', [req.params.id])
              .then(data => {
                if (!data) {
                  res.status(404).json({error: ' Tarefa inexistente'})
                } else {
                  res.status(200).json({result: 'Anexo removido'})
                }
              })
          }
        })
      }
    })
}

//Pega a ultima posição
exports.lastPosition = function (req, res) {
  db.any('SELECT * FROM getLastPosition($1)', [req.body.idBlock])
    .then(data => {
      console.log(data)
      if (!data || !data[0]) {
        console.log(data)
      } else {
        req.lastPosition = data[0].position
      }
    })
}
