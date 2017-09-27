(async () => {
  let userController = require('./controller/userController')
  let projectsController = require('./controller/projectsController')
  let app = await require('./app-config')
  const fs = require('fs')
  const express = require('express')
  const compression = require('compression')
  let blocksController = require('./controller/blocksController')

  app.get('/userInfo', userController.userAuth)
  app.post('/login', userController.login)
  app.get('/session', userController.authSession)
  app.put('/session/change', userController.change)
  app.put('/session/changepassword', userController.changepass)
  app.post('/newuser', userController.newUser)
  app.get('/users', userController.db)
  app.post('/uploadImg', userController.imgs)
  app.get('/user', userController.infoUser)
  app.put('/authEmail', userController.authEmail)
  app.get('/authentication', userController.validaToken)
  app.post('/newpass', userController.verifyEmail)
  app.post('/resendEmail', userController.verifyEmail)
  app.delete('/deleteUser', userController.deleteUser)

  //Parte de projetos
  app.post('/project', projectsController.newProject)
  app.get('/project', projectsController.infoProject)
  app.get('/project/:id', projectsController.infoProjectSearch)
  app.delete('/project/:id', projectsController.deleteproject)
  app.put('/project/:id', projectsController.changeProject)
  app.post('/insertUser/:id', projectsController.insertTeam)
  app.delete('/userteam/:id', projectsController.removeUserTeam)
  app.get('/searchMembers/:id', projectsController.searchUsers)

  //Parte de blocos
  app.post('/newblock/:id', blocksController.newblock)
  app.post('/newtask', blocksController.newtask)

  let filesPath

  filesPath = require('path').join(__dirname, '/files')

  app.use(compression())
  app.use(express.static(filesPath))
  app.set('views', filesPath)

  app.get('/*', (req, res) => {
    fs.readFile(`${filesPath}`, (err, text) => {
      res.end(text)
    })
  })
})()
