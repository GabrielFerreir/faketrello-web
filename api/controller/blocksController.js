let db = require('../db-config.js')

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
  db.any('SELECT * FROM searchBlock($1)', [req.params.id])
    .then(data => {
      if (!data || !data[0]) {
        res.status(404).json({error: 'Esse projeto nao foi encontrado'})
      } else {
        res.status(200).json({data})
      }
    })
}

//Deleta um bloco
exports.deleteBlock = function (req, res) {
  db.any('SELECT * FROM deleteBlock($1)', [req.body.idBlock])
    .then(data => {
      if (data) {
        res.status(200).json({result: 'Bloco deletado!'})
      } else {
        res.status(404).json({error: 'Bloco nao encontrado'})
      }
    })
}

//Cria uma nova tarefa
exports.newtask = function (req, res) {
  db.any('SELECT * FROM newtasks($1,$2,$3,$4)', [req.body.nameTask, null, req.body.finalDate, req.params.id])
    .then(data => {
      if (!data || !data[0]) {
        res.status(404).json({error: 'Nao foi encontrado esse bloco no projeto'})
      } else {
        if (req.body.attachment) {
          req.idtask = data[0].idtask
          let path = exports.buildAttachment(req, res)

          db.any('SELECT * FROM buildAttachment($1,$2)', [req.idtask, path])
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

//Cria arquivo do anexo no servidor
exports.buildAttachment = function (req, res) {
  return new Promise(async function (resolve, reject) {
    const fs = require('fs')
    let file = req.body.file
    let matches = file.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)
    let response = {}

    if (matches.length !== 3) {
      return new Error('Invalid input string')
    }
    response.type = matches[1]
    if (response.type === 'application/x-zip-compressed') {

      response.data = new Buffer(matches[2], 'base64')
      let caminhoBd = `./files/attachment/${req.idtask}.rar`

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
  db.any('SELECT * FROM buildChecklist($1,$2);', [req.params.id, JSON.stringify(json)])
    .then(data => {
      if (!data) {
        res.status(404).json({error: 'Tarefa inexistente'})
      } else {
        res.status(200).json({result: 'Checklist criada com sucesso'})
      }
    })
}

//Cria comentario nas tarefas
exports.newComment = function (req, res) {
  db.any('SELECT * FROM newComment($1,$2)', [req.params.id, req.body.comment])
    .then(data => {
      if (data) {
        res.status(200).json({result: 'Comentário adicionado a tarefa'})
      } else {
        res.status(404).json({error: 'Tarefa nao encontrada no banco'})
      }
    })
}
