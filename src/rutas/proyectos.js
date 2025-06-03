import express from 'express';
import {crearProyectos,obtenerTodosProyectos,obtenerUnProyecto,actualizarUnProyecto,eliminarUnProyecto} from '../controllers/proyectos.controller.js';
import {authMiddleware} from '../middlewares/authmiddleware.js';

const routerProyecto = express.Router();

//POST /proyectos - crear un proyecto
routerProyecto.post('/',authMiddleware,crearProyectos);

//GET /Proyectos - obtener todos los proyectos
routerProyecto.get('/',authMiddleware,obtenerTodosProyectos);

//GET /proyectos/:id - obtener un proyecto por id
routerProyecto.get('/:id',authMiddleware,obtenerUnProyecto);

//PUT /proyectos/:id - actualizar un proyecto por id
routerProyecto.put('/:id',authMiddleware,actualizarUnProyecto);

//DELETE /proyectos/:id - eliminar un proyecto por id
routerProyecto.delete('/:id',authMiddleware,eliminarUnProyecto);

export default routerProyecto;