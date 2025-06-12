import express from 'express';
import {crearUsuarios,verificarUsuario, obtenerTodosUsuarios, obtenerUnUsuario,vincularUsuarioAProyecto} from '../controllers/user.controller.js';
import {obtenerProyectosByIdUsuario,obtenerProyectosByIdUsuarioTotal} from '../controllers/proyectos.controller.js';
import {authMiddleware} from '../middlewares/authmiddleware.js';

const router = express.Router();

//GET /usuarios - obtener todos los usuarios
router.get('/',authMiddleware,obtenerTodosUsuarios)

//GET /usuarios/:id/proyectos - obtener proyectos por id usuario con paginado
router.get('/:id/proyectos',authMiddleware,obtenerProyectosByIdUsuario);

//GET /usuarios/:id/proyectosTotales - obtener proyectos por id usuario
router.get('/:id/proyectosTotales',authMiddleware,obtenerProyectosByIdUsuarioTotal);

// GET /users/:id - Obtener usuario por ID
router.get('/:id',authMiddleware,obtenerUnUsuario);

// POST /users - Crear nuevo usuario
router.post('/',authMiddleware,crearUsuarios)

// POST /users - vincular usuario a proyecto
router.post('/vincularUsuarioProyecto',authMiddleware,vincularUsuarioAProyecto)

export default router;