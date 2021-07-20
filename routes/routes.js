'use strict'

const express = require('express');
const router = express.Router();
const ProyectosController = require('../controllers/proyectos');

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './uploads' });

router.post('/save', ProyectosController.save);
router.get('/getProjectById/:id', ProyectosController.getProject);
router.get('/getProjects', ProyectosController.getProjects);
router.put('/update/:id', ProyectosController.updateProject);
router.delete('/delete/:id', ProyectosController.deleteProject);
router.post('/uploadImage/:id', multipartMiddleware, ProyectosController.uploadImage);
router.get('/getImage/:image', ProyectosController.getImagenFile);

module.exports = router;