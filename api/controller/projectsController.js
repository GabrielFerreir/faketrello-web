let db = require('../db-config.js')
let userController = require('./userController.js')
let jwt = require('jsonwebtoken')

//Criando novo projeto
exports.newProject = async function (req, res) {
  req.called = 1
  let caminho
  let newuser = await userController.infoUser(req, res)
  req.idproj = 0

  caminho = '/imgsProjects/default.png'

  db.any('SELECT * FROM newproject($1,$2,$3,$4);', [req.body.nameProject, newuser.id_usuario, req.body.description, caminho])
    .then(async data => {
      if (!data || !data[0]) {
        res.status(404).json({error: 'Nao foi possivel encontrar esse usuário'})
      } else {
        req.idproj = data[0].idproject

        //Inserindo img no banco
        if (req.body.imgBase64 && req.body.imgBase64 !== '') {
          caminho = await userController.imgs(req, res)
          db.any('SELECT * FROM verify_imgproject($1,$2)', [caminho, req.idproj])
            .then(data => {
              if (!data) {
                res.status(404).json({error: 'Projeto nao encontrado'})
              } else {
                res.status(200).json({id: req.idproj})
              }
            })
        } else {
          //res.status(200).json({id: req.idproj})
        }

        //Inserindo owner no team
        req.body.team = [{
          'idproject': req.idproj,
          'iduser': newuser.id_usuario,
          'permission': 'true'
        }
        ]
        exports.insertTeam(req, res)
      }
    })
}

//Mostra os projetos do usuario na tela home
exports.infoProject = async function (req, res) {
  req.called = 1
  let info = await userController.infoUser(req, res)

  db.any('SELECT * FROM getproject($1);', [info.id_usuario])
    .then(data => {
      if (!data || !data[0]) {
        res.status(404).json({error: 'Esse usuario nao possui projetos'})
      } else {
        res.status(200).json(data)
      }
    })
}

//Mostra informações do projeto especifico
exports.infoProjectSearch = function (req, res) {
  let auth = req.headers.authorization
  let id = req.params.id

  if ((!auth) || (!auth.startsWith('Bearer'))) {
    res.status(401).json({error: 'Sessão Inválida'})
  } else {
    auth = auth.split('Bearer').pop().trim()
  }
  jwt.verify(auth, userController.senha, function (error, data) {
    if (error) {
      res.status(401).json({error: 'Sessão invalida'})
    } else {
      db.any('SELECT * FROM getprojectsearch($1,$2)', [id, data.id])
        .then(data => {
          if (!data || !data[0]) {
            res.status(401).json({error: 'Acesso não autorizado'})
          } else {
            res.status(200).json(data[0])
          }
        })
    }
  })
}

//Apaga projetos
exports.deleteproject = function (req, res) {
  let auth = req.headers.authorization
  let id = req.params.id
  if ((!auth) || (!auth.startsWith('Bearer'))) {
    res.status(401).json({error: 'Sessão Inválida'})
  } else {
    auth = auth.split('Bearer').pop().trim()
  }
  jwt.verify(auth, userController.senha, function (error, data) {
    if (error) {
      res.status(401).json({error: 'Sessão invalida'})
    } else {
      db.any('SELECT * FROM deactivateProject($1,$2);', [id, data.id])
        .then(data => {
          if (!data) {
            res.status(404).json({error: 'Projeto nao encontrado no banco'})
          } else {
            res.status(200).json({result: 'Projeto deletado'})
          }
        })
    }
  })
}

//Altera dados do projeto
exports.changeProject = function (req, res) {
  let auth = req.headers.authorization
  let id = req.params.id
  req.called = 1
  req.idproj = 0
  let caminho = '/imgsProjects/default.png'

  if ((!auth) || (!auth.startsWith('Bearer'))) {
    res.status(401).json({error: 'Sessão Inválida'})
  } else {
    auth = auth.split('Bearer').pop().trim()
  }
  jwt.verify(auth, userController.senha, function (error, data) {
    if (error) {
      res.status(401).json({error: 'Sessão invalida'})
    } else {
      req.body.iduser = data.id
      req.body.idproject = id
      let permission = exports.verifyPermission(req, res)
      db.any('SELECT * FROM changeproject($1,$2,$3,$4,$5);', [id, req.body.nameproject, req.body.description, caminho, permission])
        .then(async data => {
          if (!data) {
            res.status(400).json({error: 'Projeto nao encontrado ou pertence a outras pessoas'})
          } else {
            res.status(200).json({result: 'Alterado com sucesso'})
            req.idproj = data[0].idprojectr

            //Inserindo img no banco
            if (req.body.imgBase64) {
              caminho = await userController.imgs(req, res)
              db.any('SELECT * FROM verify_imgproject($1,$2)', [caminho, req.idproj])
                .then(data => {
                  if (!data) {
                    res.status(404).json({error: 'Projeto nao encontrado'})
                  }
                })
            }
          }
        })
    }
  })

}

//Insere o time do projeto
exports.insertTeam = function (req, res) {
  let auth = req.headers.authorization

  if ((!auth) || (!auth.startsWith('Bearer'))) {
    res.status(401).json({error: 'Sessão Inválida'})
  } else {
    auth = auth.split('Bearer').pop().trim()
  }
  jwt.verify(auth, userController.senha, function (error, data) {
    if (error) {
      res.status(401).json({error: 'Sessão invalida'})
    } else {
      db.any('SELECT * FROM timeproject($1,$2,$3,$4)', [req.params.id, req.body.idUser, req.body.permission, data.id])
        .then(data => {
          if (!data) {
            res.status(400).json({error: 'Erro'})
          } else if (req.called !== 1) {
            res.status(200).json({result: 'sucesso'})
          }
        })
    }
  })
}

//Verifica se a permissao do usuario no projeto permite alterações
exports.verifyPermission = function (req, res) {
  return new Promise(function (resolve, reject) {
    let auth = req.headers.authorization

    if ((!auth) || (!auth.startsWith('Bearer'))) {
      res.status(401).json({error: 'Sessão Inválida'})
    } else {
      auth = auth.split('Bearer').pop().trim()
    }
    jwt.verify(auth, userController.senha, function (error, data) {
      if (error) {
        res.status(401).json({error: 'Sessão invalida'})
      } else {
        db.any('SELECT * FROM verify_permission($1,$2)', [req.body.idproject, data.id])
          .then(data => {
            if (!data || !data[0]) {
              reject('Usuario nao faz parte do projeto')
            } else {
              console.log(data)
              resolve(data)
            }
          })
      }
    })

  })
}

//Retira uma pessoa do time
exports.removeUserTeam = async function (req, res) {
  req.body.idproject = req.params.id
  let permission = await exports.verifyPermission(req, res)
  db.any('SELECT * FROM removeUsersTeam($1,$2,$3,$4,$5)', [req.body.idproject, req.body.iduser, permission[0].permission, req.body.idusertarget])
    .then(data => {
      if (data[0].statuscode === 200) {
        res.status(200).json({result: 'Usuario removido do projeto'})
      } else if (data[0].statuscode === 401) {
        res.status(401).json({result: 'Voce nao tem permissao'})
      } else {
        res.status(404).json({result: 'Usuario nao encontrado no projeto'})
      }
    })
}

//Pesquisa usuarios
exports.searchUsers = function (req, res) {
  let idProject = req.params.id

  db.any('SELECT * FROM searchUsers($1,$2)', [req.headers.Search, idProject])
    .then(data => {
      if (!data || !data[0]) {
        res.status(404).json({error: 'Usuario inexistente'})
      } else {
        res.status(200).json(data)
      }
    })
}
