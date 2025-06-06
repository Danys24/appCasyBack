import {crearPaso, pasosByIdCaso, pasoById, actualizarPasoById, eliminarPasoById, ordenarPasoByIdCaso} from '../models/pasoModel.js';

const TABLAS = 'paso_prueba';

export const crearPasoPrueba = async(req, res) => {
    try{
        const { idCaso, paso, resultado } = req.body;

        if (!idCaso || !paso || !resultado ) {
            return res.status(400).json({ error: 'Faltan valores por ingresar' });
        }

        const pasos = await crearPaso(TABLAS, idCaso, paso, resultado);

        if (!pasos) {
            //return res.status(401).json({ error: 'El set no se ha creado' });
        }

        res.status(201).json({mensaje: 'caso de prueba creado', paso: pasos});

    }catch (error){
        console.error('Error al crear el paso:', error);
        res.status(500).json({ error: 'Error al crear un paso de prueba' });
    }
}

export const obtenerPasosByIdCasos = async(req, res) => {
    try{
        const pasos = await pasosByIdCaso(TABLAS, req.params.id);
        res.json(pasos);
    }catch{
        res.status(500).json({ error: 'Error al obtener los pasos de prueba' });
    }
}

export const obtenerUnPaso = async(req, res) => {
    try{
        const paso = await pasoById(TABLAS, req.params.id);
        paso ? res.json(paso) : res.status(404).send('Paso no encontrado');
    }catch{
        res.status(500).json({ error: 'Error al obtener el paso' });
    }
}

export const actualizarUnPaso = async(req, res) => {
    try{
        const { paso, resultado } = req.body;

        if (!paso || !resultado) {
            return res.status(400).json({ error: 'Faltan valores por ingresar' });
        }

        const actualizar = await actualizarPasoById(TABLAS, paso, resultado, req.params.id);

        actualizar ? res.status(200).json({mensaje:'El paso se ha actualizado exitosamente', paso: actualizar}) : res.status(404).send('Paso no encontrado');

    }catch(error){
        res.status(500).json({ error: 'Error al actualizar el paso de prueba' });
    }
}


export const eliminarUnPaso = async(req, res) => {
    try{

        const paso = await eliminarPasoById(TABLAS,req.params.id);

        paso ? res.status(200).json({mensaje:'El paso se ha eliminado exitosamente'}):res.status(404).send('paso no encontrado');
    }catch(error){
        console.error("Error al eliminar el paso", error)
        res.status(500).json({ error: 'Error al eliminar el paso de prueba' });
    }
}

export const ordenarPasos = async(req, res) => {
    try{

        const caso = await ordenarPasoByIdCaso(TABLAS,req.params.id);

        caso ? res.status(200).json({mensaje:'Los pasos se han ordenado correctamente'}):res.status(404).send('pasos no encontrados');
    }catch(error){
        console.error("Error al ordenar los pasos", error)
        res.status(500).json({ error: 'Error al ordenar los pasos de prueba' });
    }
}
