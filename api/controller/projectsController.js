(async () => {
  let db = await require('../db-config.js')
  //const jwt = require('jsonwebtoken')
  let userController = require('./userController.js')

  //Criando novo projeto
  exports.newProject = async function (req, res) {
    req.called = 1
    let caminho
    let newuser = await userController.infoUser(req, res)

    if (req.body.imgBase64) {
      caminho = await userController.imgs(req, res)
    } else {
      caminho = '/imgsProjects/default.png'
    }
    db.any('SELECT * FROM newproject($1,$2,$3,$4);', [req.body.nameProject, newuser.id_usuario, req.body.description, caminho])
      .then(data => {
        if (!data || !data[0]) {
          res.status(404).json({error: 'Nao foi possivel encontrar esse usuário'})
        } else {
          res.status(200).json({id: data[0].idproject})
        }
      })
  }

  exports.infoProject = async function (req,res) {
    req.called = 1
    let info = await userController.infoUser(req, res)
    console.log(info)

    db.any('SELECT * FROM getproject($1);',[info.id_usuario])
      .then(data =>{
        if(!data || !data[0]){
          res.status(404).json({error: 'Esse usuario nao possui projetos'})
        } else {
          res.status(200).json(data)
        }
      })
  }
})()
