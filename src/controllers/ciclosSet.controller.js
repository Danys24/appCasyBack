import {crearCicloSet, ciclosSetByIdProyecto, ciclosSetById, actualizarCiclosSetById, eliminarCiclosSetById} from '../models/cicloSetModel.js';

const TABLAS = 'ciclo_set';
const TABLAP = 'proyectos';

export const crearCiclosSets = async(req, res) => {
    try{
        const { idProyecto, nombre, descripcion } = req.body;

        if (!idProyecto || !nombre || !descripcion) {
            return res.status(400).json({ error: 'Faltan valores por ingresar' });
        }

        const ciclo = await crearCicloSet(TABLAS, idProyecto, nombre, descripcion);

        if (!ciclo) {
            //return res.status(401).json({ error: 'El set no se ha creado' });
        }

        res.status(201).json({mensaje: 'ciclo creado', cliclo: ciclo});

    }catch (error){
        console.error('Error al crear el ciclo:', error);
        res.status(500).json({ error: 'Error al crear el ciclo' });
    }
}

export const obtenerCiclosSetByIdProyecto = async(req, res) => {

    try{
        const ciclo = await ciclosSetByIdProyecto(TABLAS, req.params.id);

        if (ciclo.length === 0) {
            return res.status(404).json({ error: 'Ciclos no encontrados' });
        }

        res.json(ciclo);

    }catch (error){
        console.error('Error al obtener los ciclos:', error);
        res.status(500).json({ error: 'Error al obtener los ciclos' });
    }
}

export const obtenerCiclosSetById = async(req, res) => {

    try{
        const ciclo = await ciclosSetById(TABLAS, req.params.id);

        if (ciclo.length === 0) {
            return res.status(404).json({ error: 'Ciclo no encontrado' });
        }

        res.json(ciclo);

    }catch (error){
        console.error('Error al obtener el ciclo:', error);
        res.status(500).json({ error: 'Error al obtener el ciclo' });
    }
}

export const editarCiclosSetById = async(req, res) => {

    try{

        const {nombre, descripcion} = req.body;

        if (!nombre || !descripcion) {
            return res.status(400).json({ error: 'Faltan valores por ingresar' });
        }

        const ciclo = await actualizarCiclosSetById(TABLAS, nombre, descripcion, req.params.id);

        ciclo ? res.status(200).json({mensaje:'El ciclo se ha actualizado exitosamente', ciclo: ciclo}) : res.status(404).send('Ciclo no encontrado');

    }catch (error){
        console.error('Error al actualizar el ciclo:', error);
        res.status(500).json({ error: 'Error al actualizar el ciclo' });
    }
}

export const borrarCiclosSetById = async(req, res) => {

    try{
        const ciclo = await eliminarCiclosSetById(TABLAS, req.params.id);

        ciclo ? res.status(200).json({mensaje:'El ciclo se ha eliminado exitosamente'}) : res.status(404).send('Ciclo no encontrado');

    }catch (error){
        console.error('Error al eliminar el ciclo:', error);
        res.status(500).json({ error: 'Error al eliminar el ciclo' });
    }
}