let db = require('../db-config.js')
let userController = require('./userController.js')

//Criando novo projeto
exports.newProject = async function (req, res) {
  req.called = 1
  let caminho
  let newuser = await userController.infoUser(req, res)
  req.idproj = 0

  caminho = '/imgsProjects/default.png'
  if (req.body.nameProject && req.body.nameProject.length > 0 && req.body.nameProject.length < 20) {

    db.any('SELECT * FROM newproject($1,$2,$3,$4);', [req.body.nameProject, newuser.id_user, req.body.description, caminho])
      .then(async data => {
        if (!data || !data[0]) {
          res.status(404).json({error: 'Nao foi possivel encontrar esse usuário'})
        } else {
          req.idproj = data[0].idproject

          //Inserindo img no banco
          if (req.body.imgBase64) {
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
            res.status(200).json({id: req.idproj})
          }

          //Inserindo owner no team
          req.idOwner = newuser.id_user
          req.permission = true
          exports.insertOwner(req, res)
          exports.defaultBlocks(req, res)
          if (req.body.teamJson) {

            db.any('SELECT * FROM insertTeamNewProject($1)', [req.body.teamJson])
              .then(data => {
                if (!data) {
                  res.json({error: 'Falha ao inserir time de criação do projeto'})
                }
              })
          }
        }
      })
  } else {
    res.status(406).json({error: 'Nome da checklist muito longo ou muito curto'})
  }
}

//Mostra os projetos do usuario na tela home
exports.infoProject = async function (req, res) {
  req.called = 1
  let info = await userController.infoUser(req, res)

  db.any('SELECT * FROM getproject($1);', [info.id_user])
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
  let id = req.params.id

  db.any('SELECT * FROM getprojectsearch($1,$2)', [id, req.dataToken.id])
    .then(data => {
      if (!data || !data[0]) {
        res.status(401).json({error: 'Acesso não autorizado'})
      } else {
        res.status(200).json(data[0])
      }
    })
}

//Apaga projetos
exports.deleteproject = function (req, res) {
  let id = req.params.id

  db.any('SELECT * FROM deactivateProject($1,$2);', [id, req.dataToken.id])
    .then(data => {
      if (!data || !data[0].deactivateproject) {
        res.status(401).json({error: 'Nao tem permissao'})
      } else {
        res.status(200).json({result: 'Projeto deletado'})
      }
    })
}

//Altera dados do projeto
exports.changeProject = async function (req, res) {
  let id = req.params.id
  req.called = 1
  req.idproj = 0
  let imgPath = '/imgsProjects/default.png'

  db.any('SELECT * FROM getPathImg($1)', [id])
    .then(data => {
      if(data[0].path)
        imgPath = data[0].path
    })

  req.body.iduser = req.dataToken.id
  req.body.idproject = id
  let permission = await exports.verifyPermission(req, res)

  if (req.body.nameProject && req.body.nameProject.length > 0 && req.body.nameProject.length <= 20) {

    db.any('SELECT * FROM changeproject($1,$2,$3,$4,$5,$6);', [id, req.body.nameProject, req.body.description, imgPath, permission[0].permission, req.dataToken.id])
      .then(async data => {
        if (!data || data[0].idprojectr === 0) {
          res.status(400).json({error: 'Projeto nao encontrado ou permissao insuficiente'})
        } else {
          res.status(200).json({result: 'Alterado com sucesso'})
          req.idproj = data[0].idprojectr

          //Inserindo img no banco
          if (req.body.imgBase64) {
            console.log(req.body.imgBase64)
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
  } else {
    res.status(406).json({error: 'Nome da checklist muito longo ou muito curto'})
  }
}

//Insere o time do projeto
exports.insertTeam = function (req, res) {

  db.any('SELECT * FROM timeproject($1,$2,$3,$4)', [req.params.id, req.body.idUser, req.body.permission, req.dataToken.id])
    .then(data => {
      if (!data) {
        res.status(400).json({error: 'Erro'})
      } else {
        res.status(200).json({result: 'Sucesso'})
      }
    })
}

//Insere o dono do projeto
exports.insertOwner = function (req, res) {

  db.any('SELECT * FROM insertOwner($1,$2,$3)', [req.idproj, req.idOwner, req.permission])
    .then(data => {
      if (!data) {
        res.json({error: 'Falha ao inserir dono do projeto'})
      }
    })
}

//Se retira do projeto
exports.exitProject = function (req, res) {
  let idProject = req.params.id

  db.any('SELECT * FROM exitproject($1,$2)', [req.dataToken.id, idProject])
    .then(data => {
      if (!data || data[0].status === 0) {
        res.status(404).json({error: 'Usuario ou projeto nao encontrado'})
      }
      else if (data[0].status === 1) {
        res.status(200).json({result: 'Você saiu'})
      }
      else if (data[0].status === 2) {
        res.status(200).json({result: 'Há mais administradores, administrador que tentou sair conseguiu'})
      }
      else if (data[0].status === 3) {
        res.status(401).json({result: 'Voce e o ultimo administrador, passe o cargo a outro antes de sair'})
      }
      else if (data[0].status === 4) {
        res.status(401).json({result: 'Voce e o ultimo administrador e ultimo membro, o projeto foi excluido'})
      }
    })
}

//Verifica se a permissao do usuario no projeto permite alterações
exports.verifyPermission = async function (req) {
  return new Promise(function (resolve, reject) {

    db.any('SELECT * FROM verify_permission($1,$2)', [req.body.idproject, req.dataToken.id])
      .then(data => {
        if (!data || !data[0]) {
          reject('Usuario nao faz parte do projeto')
        } else {
          resolve(data)
        }
      })
  })
}

//Retira uma pessoa do time
exports.removeUserTeam = async function (req, res) {
  req.body.idproject = req.params.id
  let permission = await exports.verifyPermission(req, res)
  db.any('SELECT * FROM removeUsersTeam($1,$2,$3,$4)', [req.body.idproject, permission[0].iduserr, permission[0].permission, req.body.idusertarget])
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

//Promove um usuario a administrador
exports.promoteUser = async function (req, res) {
  req.body.idproject = req.params.id
  let permission = await exports.verifyPermission(req, res)
  db.any('SELECT * FROM changePermissionMember($1,$2,$3,$4)', [req.params.id, req.body.idusertarget, permission[0].permission, req.dataToken.id])
    .then(data => {
      if (data[0].status === 0) {
        res.status(401).json({error: 'Deu merda'})
      } else {
        res.status(200).json({result: 'Alterou permissao'})
      }
    })
}

//Pesquisa usuarios
exports.searchUsers = function (req, res) {
  let idProject = req.params.id

  db.any('SELECT * FROM searchUsers($1,$2)', [req.headers.search, idProject])
    .then(data => {
      if (!data || !data[0]) {
        res.status(404).json({error: 'Usuario inexistente'})
      } else {
        res.status(200).json(data)
      }
    })
}

//Criando os blocos padrões
exports.defaultBlocks = function (req, res) {

  db.any('SELECT * FROM defaultBlocks($1)', [req.idproj])
    .then(data => {
      if (!data) {
        res.json({error: 'Falha ao criar blocos padrões'})
      }
    })
}

//Mostra as notificações
exports.getNotifications = function (req, res) {
  db.any('SELECT * FROM getNotifications($1)', [req.dataToken.id])
    .then(data => {
      let cleanObject = []
      if (!data || !data[0]) {
        res.status(404).json({result: 'Esse projeto nao possui notificações'})
      } else {
        data.forEach((item) => {
          cleanObject.push(clearObject(item))
        })
        db.any('SELECT * FROM newNotifications($1)', [req.dataToken.id])
          .then(data => {
            if (!data)
              res.status(404).json({result: 'Usuario nao encontrado'})
            else
              res.status(200).json({newNotifications: data[0].newnotifications,notifications: cleanObject})
          })
      }
    })

  function clearObject (o) {
    if (typeof o === 'object') {
      const properties = Object.keys(o)
      properties.forEach((item) => {
        if (!o[item]) {
          delete o[item]
        }
      })
    }
    return o
  }
}

//Confirma que o usuario viu a notificação
exports.sawNotification = function (req, res) {
  db.any('SELECT * FROM sawNotification($1)', [req.dataToken.id])
    .then(data => {
      if (!data) {
        res.status(404).json({error: 'Usuário não encontrado no projeto'})
      } else {
        res.status(200).json({result: 'Visualizou'})
      }
    })
}


