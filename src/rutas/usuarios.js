import express from 'express';
const router = express.Router();
import {crearUsuarios,verificarUsuario, obtenerTodosUsuarios, obtenerUnUsuario} from '../controllers/user.controller.js'


// Datos simulados (en memoria)
let users = [
  { id: 1, name: 'Juan' },
  { id: 2, name: 'María' }
];

//GET /usuarios - obtener todos los usuarios
router.get('/', obtenerTodosUsuarios)


// GET /users/:id - Obtener usuario por ID
router.get('/:id', obtenerUnUsuario);

// POST /users - Crear nuevo usuario
router.post('/', crearUsuarios)

// PUT /users/:id - Actualizar usuario
router.put('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('Usuario no encontrado');

  user.name = req.body.name;
  res.json(user);
});

// DELETE /users/:id - Eliminar usuario
router.delete('/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.status(204).send();
});

export default router;