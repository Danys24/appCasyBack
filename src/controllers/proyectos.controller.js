import {crearProyecto,todosProyectos,actualizarProyecto,eliminarProyecto} from '../models/proyectosModel.js';

const TABLAS = 'proyectos';
const TABLAR = 'usuario_proyecto';

export const crearProyectos = async(req, res) => {
    try{
        const { nombre, descripcion } = req.body;
        const idUsuario = req.usuarioId;

        if (!nombre || !descripcion) {
            return res.status(400).json({ error: 'Faltan valores por ingresar' });
        }

        const proyectos = await crearProyecto(TABLAS, TABLAR, nombre, descripcion, idUsuario);

        if (!proyectos) {
            //return res.status(401).json({ error: 'El proyecto no se ha creado' });
        }

        res.status(201).json({mensaje: 'Proyecto creado', proyecto: proyectos});

    }catch (error){
        console.error('Error al crear el proyecto:', error);
        res.status(500).json({ error: 'Error al crear el proyecto' });
    }
}

export const obtenerTodosProyectos = async(req, res) => {
    try{
        const proyectos = await todosProyectos(TABLAS);
        res.json(proyectos)
    }catch{
        res.status(500).json({ error: 'Error al obtener los proyectos' });
    }
}

export const obtenerUnProyecto = async(req, res) => {
    try{
        const proyectos = await todosProyectos(TABLAS);
        const proyecto = proyectos.find(u => u.id === parseInt(req.params.id));
        proyecto ? res.json(proyecto) : res.status(404).send('Proyecto no encontrado');
    }catch{
        res.status(500).json({ error: 'Error al obtener el proyecto' });
    }
}

export const actualizarUnProyecto = async(req, res) => {
    try{
        const { nombre, descripcion } = req.body;

        if (!nombre || !descripcion) {
            return res.status(400).json({ error: 'Faltan valores por ingresar' });
        }

        const proyectos = await todosProyectos(TABLAS);
        const proyecto = proyectos.find(u => u.id === parseInt(req.params.id));
        const actualizar = await actualizarProyecto(TABLAS, nombre, descripcion,proyecto?.id);

        proyecto ? res.status(200).json({mensaje:'El proyecto se ha actualizado exitosamente', proyecto: actualizar}) : res.status(404).send('Proyecto no encontrado');

    }catch(error){
        res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
}

export const eliminarUnProyecto = async(req, res) => {
    try{
        const proyectos = await todosProyectos(TABLAS);
        const proyecto = proyectos.find(u => u.id === parseInt(req.params.id));
        const actualizar = await eliminarProyecto(TABLAS,proyecto?.id);

        proyecto ? res.status(200).json({mensaje:'El proyecto se ha eliminado exitosamente'}):res.status(404).send('Proyecto no encontrado');
    }catch{
        res.status(500).json({ error: 'Error al eliminar el proyecto' });
    }
}