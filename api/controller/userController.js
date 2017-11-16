let db = require('../db-config.js')
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

//Verificação alterar username
exports.usernameAuth = function (req, res) {
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

//Verifica se o email nao existe
exports.emailExists = function (req, res) {
  db.any('SELECT * FROM emailnewuser($1)', [req.query.email])
    .then(data => {
      if (!data) {
        res.status(409).json({error: 'Email existe'})
      } else {
        res.status(200).json({result: 'Email nao existe'})
      }
    })
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

  res.status(200).json({
    user: req.dataToken.user,
    statusAcc: req.dataToken.authEmail
  })
}

//Alteração de dados
exports.change = async function (req, res) {
  try {

    db.any('SELECT * FROM returnDataUser($1)', [req.dataToken.id])
      .then(async data => {
        let username = data[0].username, email = data[0].email

        if (username !== req.body.username && req.body.username) {
          await db.any('SELECT * FROM changeUsername($1,$2)', [req.body.username, username])
            .then(data => {
              if (!data || !data[0].changeusername) {
                res.json({error: 'Erro de proc'})
                return
              }
            })
        }
        if (email !== req.body.email && req.body.email) {
          db.any('SELECT * FROM changeEmail($1,$2)', [req.body.email, email])
            .then(data => {
              if (!data || !data[0].changeemail) {
                res.json({error: 'Erro de proc'})
                return
              }
            })
        }
        if (req.body.name) {
          db.any('SELECT * FROM changeName($1,$2)', [req.body.name, username])
            .then(data => {
              if (!data || !data[0].changename) {
                res.json({error: 'Erro de proc'})
                return
              }
            })
        }
      })
    res.status(200).json({result: 'Alterado'})
    // if (req.body.imgBase64) {
    //   let caminho
    //   try {
    //     caminho = await exports.imgs(req, res)
    //   } catch (e) {
    //     console.log(e)
    //   }
    //   if (caminho !== 'Tipo de arquivo errado') {
    //     db.any('SELECT * from verify_img($2,$1);', [req.body.username, caminho])
    //       .then(data => {
    //         if (!data[0].verify_img) {
    //           res.json({error: 'Usuario nao encontrado'})
    //         }
    //       })
    //   } else {
    //     res.status(415).json(caminho)
    //   }
    // }
  } catch (error) {
    console.log(error)
  }
}

//Altera senha do usuario
exports.changepass = function (req, res) {
  db.any('SELECT * FROM changepass($1,$2,$3);', [req.dataToken.user, md5(req.body.oldpass), md5(req.body.newpass)])
    .then(data => {
      if (!data[0].changepass) {
        res.status(401).json({error: 'Senha atual não confere'})
      } else {
        res.status(200).json({result: 'Senha Alterada com sucesso'})
      }
    })
}

//Altera senha do usuario pelo esqueceu senha
exports.forgotPass = function (req, res) {
  db.any('SELECT * FROM forgotPass($1,$2)', [req.body.user, md5(req.body.newPass)])
    .then(data => {
      if (!data || !data[0]) {
        res.status(404).json({error: 'Erro ao alterar senha'})
      } else {
        res.status(200).json({result: 'Senha alterada com sucesso'})
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
        res.status(201).json({result: 'Usuário cadastrado com sucesso'})
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

//Base64 to image
exports.imgs = async function (req) {
  return new Promise(async function (resolve, reject) {
    const fs = require('fs')
    let image = req.body.imgBase64
    let matches = image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)
    let response = {}

    if (matches === null || matches.length !== 3) {
      reject('Tipo de arquivo errado')
    } else {
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
    }
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

    db.any('SELECT * FROM consultuser($1);', [req.dataToken.user])
      .then(data => {
        if (!data[0]) {
          res.status(404).json({result: 'Nao encontrado'})
          reject('Nao encontrado')
        } else {
          if (req.called === 1) {
            return resolve(data[0])
          }
          res.status(200).json(data[0])
        }
      })
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
    html: ``
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
exports.generatorTokken = async function (req) {
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

  db.any('SELECT * FROM verify_token($1);', [req.dataToken.user])
    .then(data => {
      if (!data[0]) {
        res.status(208).json(data[0])
      } else {
        res.status(200).json(data[0])
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
