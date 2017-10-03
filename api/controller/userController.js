(async () => {
  let db = await require('../db-config.js')
  //let projectsController = require('./projectsController')
  const jwt = require('jsonwebtoken')
  const md5 = require('md5')
  const fs = require('fs')
  let token
  let PASSWORD = md5('senhaParaAuth')

  //Primeira verificação
  exports.userAuth = function (req, res) {
    try {
      db.any('SELECT * FROM loginU($1,$2);', [req.query.user, null])
        .then(data => {
          if (!data[0] || !data[0].email) {
            res.status(404).json('Usuário Incorreto')
          } else {
            res.status(200).json('Usuario Encontrado')
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  //Segunda verificação
  exports.login = function (req, res) {
    let senha = req.body.password
    if (senha.length < 32) {
      senha = md5(req.body.password)
    }
    try {
      db.any('SELECT * from loginU($1,$2);', [req.body.user, senha])
        .then(data => {
          if (!data[0] || !data[0].senhacorreta) {
            res.status(401).json('Login ou senha inválidos')
          } else {
            token = jwt.sign({
              user: req.body.user,
              id: data[0].id,
              authEmail: data[0].statusemail
            }, PASSWORD, {
              //expiresIn: '2 days'
            })
            res.json({token})
            exports.senha = PASSWORD
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  //Verifica se o token é válido
  exports.authSession = function (req, res) {
    let auth = req.headers.authorization

    if ((!auth) || (!auth.startsWith('Bearer'))) {
      res.status(401).json({error: 'Sessão Inválida'})
    } else {
      auth = auth.split('Bearer').pop().trim()
    }
    jwt.verify(auth, PASSWORD, function (error, data) {
      if (error) {
        res.status(401).json({error: 'Sessão invalida'})
      } else {
        res.status(200).json({
          user: data.user,
          statusAcc: data.authEmail
        })
      }
    })
  }

  //Alteração de dados
  exports.change = function (req, res) {
    let auth = req.headers.authorization

    if ((!auth) || (!auth.startsWith('Bearer'))) {
      res.status(401).json({error: 'Token errado'})
    } else {
      auth = auth.split('Bearer').pop().trim()
    }
    jwt.verify(auth, PASSWORD, async function (error, data) {
      if (error) {
        res.status(401).json({error: 'Sessão invalida'})
      } else {
        try {
          await db.any('SELECT * FROM changeUser($1,$2,$3,$4,$5);', [null, req.body.username, data.user, req.body.email, req.body.name])
            .then(data => {
              if (!data || !data[0]) {
                res.status(409).json({Error: 'A alteração falhou'})
              } else {
                console.log(data[0].iduser)
                req.idUserChange = data[0].iduser
                db.any('SELECT * FROM relogin($1);', [req.body.username])
                  .then(data => {
                    if (!data || !data[0]) {
                      res.status(404).json({error: 'Usuario nao encontrado'})
                    } else {
                      req.body.password = data[0].passw
                      req.body.user = req.body.username
                      exports.login(req, res)
                    }
                  })
              }
            })
          if (req.body.imgBase64) {
            let caminho = await exports.imgs(req, res)
            db.any('SELECT * from verify_img($2,$1);', [req.body.username, caminho])
              .then(data => {
                if (!data[0].verify_img) {
                  res.json({error: 'Usuario nao encontrado'})
                }
              })
          }
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  //Altera senha do usuario
  exports.changepass = function (req, res) {
    let auth = req.headers.authorization
    let whocall = false
    let oldpass

    if ((!auth) || (!auth.startsWith('Bearer'))) {
      res.status(401).json({error: 'Token errado'})
    } else {
      auth = auth.split('Bearer').pop().trim()
    }
    jwt.verify(auth, PASSWORD, async function (error, data) {
      if (error) {
        res.status(401).json({error: 'Sessão invalida'})
      } else {
        if (req.body.oldpass) {
          whocall = true
          oldpass = md5(req.body.oldpass)
        } else {
          whocall = false
          oldpass = null
        }
        db.any('SELECT * FROM changepass($1,$2,$3,$4);', [data.user, oldpass, md5(req.body.newpass), whocall])
          .then(data => {
            if (!data[0].changepass) {
              res.status(401).json({error: 'Senha atual não confere'})
            } else {
              res.status(200).json({result: 'Senha Alterada com sucesso'})
            }
          })
      }
    })
  }

  //Cadastro de usuario novo
  exports.newUser = async function (req, res) {

    let caminho = '/imgsUser/default.png'

    await db.any('SELECT * FROM newuser($1,$2,$3,$4,$5);', [req.body.email, md5(req.body.password), caminho, req.body.name, req.body.username])
      .then(data => {
        if (!data || !data[0]) {
          res.status(409).json({error: 'Erro ao cadastrar: Usuário ou email já cadastrado'})
        } else {
          res.status(200).json({result: 'Usuário cadastrado com sucesso'})
          req.idNewUser = data[0].idnewuser
          req.called = 2
        }
      })
    if (req.body.imgBase64) {

      caminho = await exports.imgs(req, res)
      db.any('SELECT * FROM verify_img($1,$2)', [caminho, req.body.username])
        .then(data => {
          if (!data) {
            console.log(data)
          }
        })
    }
  }

  //Consulta do banco
  exports.db = function (req, res) {
    try {
      db.any('SELECT * FROM consult();')
        .then(data => {
          if (!data || !data[0].username) {
            res.status(401).json({Error: 'A consulta falhou'})
          } else {
            res.status(200).json(data)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  //Base64 to image
  exports.imgs = async function (req, res) {
    return new Promise(async function (resolve, reject) {
      const fs = require('fs')
      let image = req.body.imgBase64
      let matches = image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)
      let response = {}

      if (matches.length !== 3) {
        return new Error('Invalid input string')
      }
      response.type = matches[1]
      response.data = new Buffer(matches[2], 'base64')
      let caminhoBd
      if (req.called === 1) {
        caminhoBd = `./files/imgsProjects/picture_${req.idproj}.png`
      }
      else if (req.called === 2) {
        caminhoBd = `./files/imgsUser/picture_${req.idNewUser}.png`
      } else {
        caminhoBd = `./files/imgsUser/picture_${req.idUserChange}.png`
      }

      let caminho = caminhoBd.replace('./files', '')

      fs.writeFile(caminhoBd, response.data, function (error) {
        if (error) {
          reject(error)
        } else {
          resolve(caminho)
        }
      })
    })
  }

  //Remove img do usuario
  exports.removeImg = function (req, res) {
    db.any('SELECT * FROM removeImg($1)', [req.params.id])
      .then(data => {
        if (!data || !data[0]) {
          res.status(409).json({error: 'Imagem já é default'})
        } else {
          fs.unlink(`./files${data[0].path}`, function (error) {
            if (error) {
              console.log(error)
            } else {
              res.status(200).json({result: 'Imagem removida'})
            }
          })
        }
      })
  }

  //Dados do usuário
  exports.infoUser = async function (req, res) {
    return new Promise(function (resolve, reject) {

      let auth = req.headers.authorization

      if ((!auth) || (!auth.startsWith('Bearer'))) {
        res.status(401).json({error: 'Sessão Inválida'})
      } else {
        auth = auth.split('Bearer').pop().trim()
      }
      if (!PASSWORD) {
        res.status(401).json({error: 'Token expirou'})
      } else {
        jwt.verify(auth, PASSWORD, function (error, data) {
          if (error) {
            res.status(401).json({error: 'Sessão invalida'})
            reject(error)
          } else {
            db.any('SELECT * FROM consultuser($1);', [data.user])
              .then(data => {
                if (!data[0]) {
                  res.status(404).json({result: 'Nao encontrado'})
                } else {
                  if (req.called === 1) {
                    return resolve(data[0])
                  }
                  res.status(200).json(data[0])
                }
              })
          }
        })
      }
    })
  }

  //Manda email de confirmacao
  exports.email = async function (req, res) {
    let nodemailer = require('nodemailer')

    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'faketrello2017@gmail.com',
        pass: 'fakeTrello!'
      }
    })
    let tokenEmail = await exports.generatorTokken(req, res)
    let mailOptions = {
      from: 'Fake Trello',
      to: req.body.email,
      subject: 'Confirmação de cadastro!',
      html: `<table align="center" border="0" cellspacing="0" style='width:600px'>
  <tr>
    <td align="center" valign="top">
      <img src='http://192.168.52.105:8080/assets/asset1.png'/>
    </td>
  </tr>

  <tr height="150">
    <td align="center" valign="middle" style='font-size: 36px; color:#333333; font-family: Roboto, Arial '>
      Para confirmar seu email <br/>
      clique no botão abaixo:</td>
  </tr>

  <tr height="150">
    <td align="center" valign="middle">
      <a href="http://192.168.52.3:4200/authentication/${tokenEmail}"><img id="buttonClick" src='http://192.168.52.105:8080/assets/Asset3.png' style='cursor: pointer;'/></a>
    </td>
  </tr>

  <tr>
    <td align="center" valign="top">
      <img src='http://192.168.52.105:8080/assets/Asset4.png'/>
    </td>
  </tr>
</table>`
    }

    transporter.sendMail(mailOptions, function (error, result) {
      if (error) {
        res.json(error)
      } else {
        res.json({result: 'Email reenviado'})
      }
    })
  }

  //Envia a mensagem para o email
  exports.emailPassword = async function (req, res) {
    let nodemailer = require('nodemailer')

    let token = await exports.generatorTokken(req, res)
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'faketrello2017@gmail.com',
        pass: 'fakeTrello!'
      }
    })
    let mailOptions = {
      from: 'Fake Trello',
      to: req.body.email,
      subject: 'Redefinição de senha!',
      html: `<table align="center" border="0" cellspacing="0" style='width:600px'>
  <tr>
    <td align="center" valign="top">
      <img src='http://192.168.52.105:8080/assets/asset1.png'/>
    </td>
  </tr>

  <tr height="150">
    <td align="center" valign="middle" style='font-size: 36px; color:#333333; font-family: Roboto, Arial '>
      Para confirmar seu email <br/>
      clique no botão abaixo:</td>
  </tr>

  <tr height="150">
    <td align="center" valign="middle">
      <a href="http://192.168.52.3:4200/newpass/${token}"><img id="buttonClick" src='http://192.168.52.105:8080/assets/Asset3.png' style='cursor: pointer;'/></a>
    </td>
  </tr>

  <tr>
    <td align="center" valign="top">
      <img src='http://192.168.52.105:8080/assets/Asset4.png'/>
    </td>
  </tr>
</table>`
    }
    transporter.sendMail(mailOptions, function (error, result) {
      if (error) {
        res.json({error: error})
      } else {
        res.status(200).json({result: 'Link de redefinição de senha enviado para o email!'})
      }
    })
  }

  //Gera token para mandar no email
  exports.generatorTokken = async function (req, res) {
    return new Promise(function (resolve, reject) {

      db.any('SELECT * FROM verify_email($1);', [req.body.username])
        .then(data => {
          if (!data || !data[0]) {
            reject({error: 'Usuario nao encontrado no banco!'})
          } else {
            let tokenEmail = jwt.sign({
              user: req.body.username,
              authEmail: data[0].statusemail
            }, PASSWORD, {
              expiresIn: '2 days'
            })
            resolve(tokenEmail)
          }
        })
    })
  }

  //Muda status da variavel booleana no banco
  exports.authEmail = function (req, res) {
    try {
      db.any('SELECT * FROM verify_token($1);', [req.body.user])
        .then(data => {
          if (!data || !data[0]) {
            res.status(404).json({error: 'Usuário nao encontrado'})
          } else {
            res.status(200).json({result: 'Email confirmado'})
          }
        })
    }
    catch (error) {
      throw error
    }
  }

  //Valida token e muda variavel booleana no banco
  exports.validaToken = function (req, res) {
    let auth = req.headers.authorization

    if ((!auth) || (!auth.startsWith('Bearer'))) {
      res.status(401).json({error: 'Sessão Inválida'})
    } else {
      auth = auth.split('Bearer').pop().trim()
    }
    jwt.verify(auth, PASSWORD, function (error, data) {
      if (error) {
        res.status(404).send({error: 'Token Invalido'})
      } else {
        db.any('SELECT * FROM verify_token($1);', [data.user])
          .then(data => {
            if (!data[0]) {
              res.status(208).json(data[0])
            } else {
              res.status(200).json(data[0])
            }
          })
      }
    })

  }

  //Deleta o usuario
  exports.deleteUser = function (req, res) {
    db.any('SELECT * FROM deleteuser($1);', [req.body.user])
      .then(data => {
        if (!data) {
          res.status(404).json({error: 'Usuario nao encontrado'})
        } else {
          res.status(200).json({result: 'Usuario deletado'})
        }
      })
  }

  //Verifica se o email é valido e envia o email
  exports.verifyEmail = function (req, res) {
    db.any('SELECT * FROM emailexists($1);', [req.body.email])
      .then(data => {
        if (!data || !data[0]) {
          res.json({error: 'Email invalido'})
        } else {
          req.body.username = data[0].usern
          req.body.password = data[0].passw
          if (req.body.who) {
            exports.emailPassword(req, res)
          } else {
            exports.email(req, res)
          }
        }
      })
  }
})()
