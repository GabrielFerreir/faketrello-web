(async () => {
  let db = await require('../db-config.js')
  const jwt = require('jsonwebtoken')
  let userController = require('./userController.js')

  //Criando novo projeto
  exports.newProject = async function (req, res) {
    req.called = 1
    let newuser = await userController.infoUser(req,res)

    db.any('SELECT * FROM newproject($1,$2);', [req.body.nameProject, newuser.id_usuario])
      .then(data => {
        if (!data) {
          res.status(404).json({error: 'Nao foi possivel encontrar esse usuário'})
        } else {
          res.status(200).json({result: 'Projeto criado com sucesso'})
        }
      })
  }
})()