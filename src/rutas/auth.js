import express from 'express';
const routerAuth = express.Router();
import {verificarUsuario} from '../controllers/user.controller.js'

//POST/login
routerAuth.post('/', verificarUsuario);

export default routerAuth;