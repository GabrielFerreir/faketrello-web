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

  app.use(function (req, res, next) {

    if (req.method === 'OPTIONS')
      return res.status(204).end()
    if (req._parsedUrl.pathname === '/userinfo' || req._parsedUrl.pathname === '/login' || req._parsedUrl.pathname === '/newuser'
      || req.originalUrl.includes('/imgsProjects/') || req.originalUrl.includes('/imgsUser/')
      || req.originalUrl.includes('/assets/') || req._parsedUrl.pathname === '/emailExists/'
      || req.originalUrl.indexOf('/attachment/') === 0 || req.originalUrl.includes('/newpass')) {

      next()
    } else {
      //console.log(req)

      let auth = req.headers.authorization

      if ((!auth) || (!auth.startsWith('Bearer'))) {
        return res.status(401).json({error: 'Token errado'})
      } else {
        auth = auth.split('Bearer').pop().trim()
      }
      jwt.verify(auth, PASSWORD, async function (error, data) {
        if (error) {
          return res.status(401).json({error: 'Sessão invalida'})
        } else {
          req.dataToken = data
          next()
        }
      })
    }
  })

  //Parte de usuario
  app.get('/userInfo', userController.userAuth)
  app.get('/usernameInfo', userController.usernameAuth)
  app.post('/login', userController.login)
  app.get('/session', userController.authSession)
  app.put('/session/change', userController.change)
  app.put('/session/changepassword', userController.changepass)
  app.post('/newuser', userController.newUser)
  app.post('/uploadImg', userController.imgs)
  app.delete('/imgUser/:id', userController.removeImg)
  app.get('/user', userController.infoUser)
  app.put('/authEmail', userController.authEmail)
  app.get('/authentication', userController.validaToken)
  app.post('/newpass', userController.verifyEmail)
  app.post('/resendEmail', userController.verifyEmail)
  app.delete('/deleteUser', userController.deleteUser)
  app.get('/emailExists', userController.emailExists)
  app.get('/user/notifications', projectsController.getNotifications)

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
  app.put('/project/notifications/:id', projectsController.sawNotification)

  //Parte de blocos
  app.post('/blocks/:id', blocksController.newblock)
  app.put('/blocks/:id', blocksController.changeBlockName)
  app.delete('/blocks/:id', blocksController.deleteBlock)
  app.get('/project/blocks/:id', blocksController.seachblocks)

  //Parte de tarefas
  app.post('/blocks/task/:id', blocksController.newtask)
  app.put('/blocks/task/:id', blocksController.changeTask)
  app.get('/blocks/task/:id', blocksController.showContentTask)
  app.delete('/blocks/task/:id', blocksController.deleteTask)
  app.post('/task/attachment/:id', blocksController.newAttachment)
  app.delete('/task/attachment/:id', blocksController.deleteAttachment)
  app.post('/task/comment', blocksController.newComment)
  app.put('/task/comment/:id', blocksController.changeComment)
  app.delete('/task/comment/:id', blocksController.deleteComment)
  app.post('/task/checklist', blocksController.newChecklist)
  app.put('/task/checklistStatus/:id', blocksController.changeStatusChecklist)
  app.put('/task/checklistName/:id', blocksController.changeNameChecklist)
  app.delete('/task/checklist/:id', blocksController.deleteChecklist)
  app.put('/task/move/:id', blocksController.moveTask)
  app.put('/task/positions', blocksController.updatePositions)
  app.post('/task/team/:id', blocksController.insertMembersTask)
  app.delete('/task/team/:id', blocksController.removeMemberTask)

  let filesPath

  filesPath = require('path').join(__dirname, '/files')

  app.use(compression())
  app.use(express.static(filesPath))
  app.set('files', filesPath)

  app.get('/*', (req, res) => {
    fs.readFile(`${filesPath}`, (err, text) => {
      res.end(text)
    })
  })
})()
