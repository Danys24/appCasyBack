import express from 'express';
import {verificarUsuario} from '../controllers/user.controller.js';
import {authMiddleware} from '../middlewares/authmiddleware.js';

const routerAuth = express.Router();

//POST/login
routerAuth.post('/', verificarUsuario);

export default routerAuth;