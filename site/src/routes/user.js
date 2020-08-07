const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '..','..','public','images','usuarios'));

    },
    filename: function (req, file, cb) {
      cb(null, 'usuario-'+Date.now() + path.extname(file.originalname));
    }
  })
   
const upload = multer({ storage })

const userController = require(path.resolve(__dirname, '..', 'controllers', 'userController'));

const registerAuth = require(path.resolve(__dirname,'..','middlewares', 'registerAuth'));

const loginAuth = require(path.resolve(__dirname,'..','middlewares', 'loginAuth'));

router.get('/register', userController.index);

router.post('/register', upload.single('avatar'), registerAuth, userController.register);

router.get('/login', userController.login);

router.post('/login', loginAuth, userController.ingresar);

router.get('/logout', userController.logout);

router.get('/usuario/perfil', userController.profile);


module.exports = router;