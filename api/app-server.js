(async () => {
  let userController = require('./controller/userController')
  let projectsController = require('./controller/projectsController')
  let app = await require('./app-config')
  const fs = require('fs')
  const express = require('express')
  const compression = require('compression')

  app.get('/userInfo', userController.userAuth)
  app.post('/login', userController.login)
  app.get('/session', userController.authSession)
  app.put('/session/change', userController.change)
  app.post('/newuser', userController.newUser)
  app.get('/users', userController.db)
  app.post('/uploadImg', userController.imgs)
  app.get('/user', userController.infoUser)
  app.put('/authEmail', userController.authEmail)
  app.post('/lostPass', userController.emailPassword)
  app.get('/authentication', userController.validaToken)
  app.post('/resendEmail', userController.email)
  app.delete('/deleteUser', userController.deleteUser)
  app.post('/newProject', projectsController.newProject)
  //app.get('/email', userController.email)
  //app.post('/verifyEmail', userController.generatorTokken)

  let filesPath

  filesPath = require('path').join(__dirname, '/imgs')

  app.use(compression())
  app.use(express.static(filesPath))
  app.set('views', filesPath)

  app.get('/*', (req, res) => {
    fs.readFile(`${filesPath}`, (err, text) => {
      res.end(text)
    })
  })
})()