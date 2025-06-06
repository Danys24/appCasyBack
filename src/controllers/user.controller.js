import {todosUsuarios,crearUsuario, verificarUser, usuariosByIdProyecto} from '../models/usuariosModel.js';
import jwt from 'jsonwebtoken';

const TABLA = 'users';
const TABLAU = 'usuarios';
const TABLAR = 'usuario_proyecto';

export const obtenerTodosUsuarios = async(req, res) => {
    try{
        const usuarios = await todosUsuarios(TABLAU);
        res.json(usuarios)
    }catch{
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
}

export const obtenerUnUsuario = async(req, res) => {
    try{
        const usuarios = await todosUsuarios(TABLAU);
        const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
        usuario ? res.json(usuario) : res.status(404).send('Usuario no encontrado');
    }catch{
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
}

export const crearUsuarios = async(req, res) => {

    const {idRol, nombre, clave} = req.body;

    if (!idRol || !nombre || !clave) {
    return res.status(400).send('Faltan datos');
    }

    try{
        const usuarios = await crearUsuario(TABLAU, idRol, nombre, clave);
        res.status(201).json({ mensaje: 'Usuario creado correctamente', usuario: usuarios});
    }catch{
        console.error('Error al crear usuario:', err);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
}


export const verificarUsuario = async (req, res) => {
    try{
        const { nombre, clave } = req.body;

        if (!nombre || !clave) {
            return res.status(400).json({ error: 'Faltan datos' });
        }

        // Verifica contra la base de datos
        const resultado = await verificarUser(TABLAU, nombre, clave);
        
        if (!resultado) {
            return res.status(401).json({ error: 'Usuario o Clave incorrecta' });
        }

        const token = jwt.sign({id:resultado.id}, 'serna', { expiresIn: '1h' });

        res.json({ token });
        //res.json({ mensaje: 'Inicio de sesion exitoso', nombre: resultado});

    }catch{
        res.status(500).json({ error: 'Error al comparar nombre y clave' });
    }
}

export const usuarioByIdProyecto = async (req, res) => {
    try{

        const resultado = await usuariosByIdProyecto(TABLAU, TABLAR, req.params.id);
        
        if (resultado.length === 0) {
            return res.status(401).json({ error: 'los usuarios no se encontraron' });
        }

        res.json(resultado)

    }catch{
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
}