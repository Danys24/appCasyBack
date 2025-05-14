import express from 'express';
const routerAuth = express.Router();
import {verificarUsuario} from '../controllers/user.controller.js'

//POST/login
routerAuth.post('/', async (req, res) => {
  const { usuario, clave } = req.body;

  if (!usuario || !clave) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  // Verifica contra la base de datos
  const resultado = await verificarUsuario(usuario, clave);
  
  if (!resultado) {
    return res.status(401).json({ error: 'Usuario o Clave incorrecta' });
  }


  res.json({ mensaje: 'Login exitoso', usuario: resultado});
});

export default routerAuth;