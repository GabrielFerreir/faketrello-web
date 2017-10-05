(async () => {
  let userController = require('./controller/userController')
  let projectsController = require('./controller/projectsController')
  let app = await require('./app-config')
  const fs = require('fs')
  const md5 = require('md5')
  const jwt = require('jsonwebtoken')
  const express = require('express')
  const compression = require('compression')
  let blocksController = require('./controller/blocksController')
  let PASSWORD = md5('senhaParaAuth')

  // app.use(function (req, res, next) {
  //
  //   if (req.method === 'OPTIONS')
  //     return res.status(204).end();
  //
  //   if (req._parsedUrl.pathname === '/userinfo' || req._parsedUrl.pathname === '/login') {
  //     next()
  //   } else {
  //
  //     let auth = req.headers.authorization
  //
  //     if ((!auth) || (!auth.startsWith('Bearer'))) {
  //       return res.status(401).json({error: 'Token errado'})
  //     } else {
  //       auth = auth.split('Bearer').pop().trim()
  //     }
  //     jwt.verify(auth, PASSWORD, async function (error, data) {
  //       if (error) {
  //         return res.status(401).json({error: 'Sessão invalida'})
  //       } else {
  //         console.log(data)
  //         req.dataToken = data
  //         next()
  //       }
  //     })
  //   }
  // })

  //Parte de usuario
  app.get('/userInfo', userController.userAuth)
  app.post('/login', userController.login)
  app.get('/session', userController.authSession)
  app.put('/session/change', userController.change)
  app.put('/session/changepassword', userController.changepass)
  app.post('/newuser', userController.newUser)
  app.get('/users', userController.db)
  app.post('/uploadImg', userController.imgs)
  app.delete('/imgUser/:id', userController.removeImg)
  app.get('/user', userController.infoUser)
  app.put('/authEmail', userController.authEmail)
  app.get('/authentication', userController.validaToken)
  app.post('/newpass', userController.verifyEmail)
  app.post('/resendEmail', userController.verifyEmail)
  app.delete('/deleteUser', userController.deleteUser)
  app.post('/emailExists', userController.emailExists)

  //Parte de projetos
  app.post('/project', projectsController.newProject)
  app.get('/project', projectsController.infoProject)
  app.get('/project/:id', projectsController.infoProjectSearch)
  app.delete('/project/:id', projectsController.deleteproject)
  app.put('/project/:id', projectsController.changeProject)
  app.post('/insertUser/:id', projectsController.insertTeam)
  app.delete('/userTeam/:id', projectsController.removeUserTeam)
  app.get('/searchMembers/:id', projectsController.searchUsers)
  app.put('/promoteUser/:id', projectsController.promoteUser)
  app.delete('/exitProject/:id', projectsController.exitProject)
  app.post('/project/verifyPermission', projectsController.verifyPermission)

  //Parte de blocos
  app.post('/blocks/:id', blocksController.newblock)
  app.put('/blocks', blocksController.changeBlockName)
  app.delete('/blocks', blocksController.deleteBlock)
  app.get('/project/blocks/:id', blocksController.seachblocks)
  app.post('/blocks/task/:id', blocksController.newtask)
  app.put('/blocks/task', blocksController.changeTask)
  app.get('/blocks/task/:id', blocksController.showContentTask)
  app.get('/task/attachment/:id', blocksController.deleteAttachment)
  app.post('/task/checklist', blocksController.newChecklist)
  app.put('/task/move', blocksController.moveTask)

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
