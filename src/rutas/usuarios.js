import express from 'express';
const router = express.Router();
import {consultarUsuarios,crearUser,verificarUsuario} from '../controllers/user.controller.js'


// Datos simulados (en memoria)
let users = [
  { id: 1, name: 'Juan' },
  { id: 2, name: 'María' }
];

// GET /users - Obtener todos los usuarios
router.get('/', (req, res) => {
  const todos = consultarUsuarios()
  .then((items) => {
    res.json(items);
  })
  
});

// GET /users/:id - Obtener usuario por ID
router.get('/:id', (req, res) => {
  const usuario = consultarUsuarios()
  .then((items) => {
    const user = items.find(u => u.id === parseInt(req.params.id))
    user ? res.json(user) : res.status(404).send('Usuario no encontrado');
  })
});

// POST /users - Crear nuevo usuario
router.post('/', async (req, res) => {
  const {usuario, clave} = req.body;

  if (!usuario || !clave) {
    return res.status(400).send('Faltan datos');
  }

  try{
    //Espera a que crearUser termine
    await crearUser(usuario,clave);

    // Devuelve la respuesta
    res.status(201).json({ mensaje: 'Usuario creado correctamente', usuario });

  } catch{
    console.error('Error al crear usuario:', err);
    res.status(500).json({ error: 'Error al crear usuario' });
  }

});

//POST/login
router.post('/login', async (req, res) => {
  const { usuario, clave } = req.body;

  if (!usuario || !clave) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  // Verifica contra la base de datos
  const resultado = await verificarUsuario(usuario, clave);
  
  if (!resultado) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }


  res.json({ mensaje: 'Login exitoso', usuario: resultado});
});

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