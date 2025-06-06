import express from 'express';
import {crearProyectos,obtenerTodosProyectos,obtenerUnProyecto,actualizarUnProyecto,eliminarUnProyecto} from '../controllers/proyectos.controller.js';
import {obtenerCiclosSetByIdProyecto} from '../controllers/ciclosSet.controller.js';
import {obtenerCiclosCasosByIdProyecto} from '../controllers/ciclosCasos.controller.js';
import {obtenerSetsByIdProyecto} from '../controllers/set.controller.js';
import {usuarioByIdProyecto} from '../controllers/user.controller.js';
import {authMiddleware} from '../middlewares/authmiddleware.js';

const routerProyecto = express.Router();

//POST /proyectos - crear un proyecto
routerProyecto.post('/',authMiddleware,crearProyectos);

//GET /Proyectos - obtener todos los proyectos
routerProyecto.get('/',authMiddleware,obtenerTodosProyectos);

//GET /Proyectos/:id/ciclosSet - obtener los ciclos del set por id del proyecto 
routerProyecto.get('/:id/ciclosSet',authMiddleware,obtenerCiclosSetByIdProyecto);

//GET /Proyectos/:id/ciclosCasos - obtener los ciclos del caso por id del proyecto 
routerProyecto.get('/:id/ciclosCasos',authMiddleware,obtenerCiclosCasosByIdProyecto);

//GET /Proyectos/:id/sets - obtener los sets por id del proyecto 
routerProyecto.get('/:id/sets',authMiddleware,obtenerSetsByIdProyecto);

//GET /Proyectos/:id/usuarios - obtener los usuarios por id del proyecto 
routerProyecto.get('/:id/usuarios',authMiddleware,usuarioByIdProyecto);

//GET /proyectos/:id - obtener un proyecto por id
routerProyecto.get('/:id',authMiddleware,obtenerUnProyecto);

//PUT /proyectos/:id - actualizar un proyecto por id
routerProyecto.put('/:id',authMiddleware,actualizarUnProyecto);

//DELETE /proyectos/:id - eliminar un proyecto por id
routerProyecto.delete('/:id',authMiddleware,eliminarUnProyecto);

export default routerProyecto;