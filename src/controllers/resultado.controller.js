import {crearResultado} from '../models/resultadoModels.js';

const TABLAS = 'resultado_paso_prueba';
const TABLAE = "evidencias";

export const crearResultadoPrueba = async(req, res) => {
    try{
        const { idPaso, idCiclo, observacion, estado } = req.body;
        const imagenes = req.files; //Array de archivos

        if (!idPaso || !idCiclo || !observacion || !estado) {
            return res.status(400).json({ error: 'Faltan valores por ingresar' });
        }

        const resultado = await crearResultado(TABLAS,TABLAE, idPaso, idCiclo, observacion, imagenes,estado);

        if (!resultado) {
            //return res.status(401).json({ error: 'El set no se ha creado' });
        }

        res.status(201).json({mensaje: 'resultado de prueba creado', resultado: resultado});

    }catch (error){
        console.error('Error al crear el resultado:', error);
        res.status(500).json({ error: 'Error al crear un resultado de prueba' });
    }
}

export const obtenerResultadosByIdCasoCiclo = async(req, res) => {
    try{
        const resultado = await casosByIdSet(TABLAS,TABLAE, req.params.idCaso, req.params.idCiclo);

        const datosConURL = resultado.map(r => ({
            ...r,
            url_evidencia: r.evidencia
                ? `http://localhost:3000/imagenes/${r.ruta_evidencia}`
                : null
        }));
        res.json(datosConURL);
    }catch{
        res.status(500).json({ error: 'Error al obtener los resultados de prueba' });
    }
}

export const obtenerUnResultado = async(req, res) => {
    try{
        const caso = await casoById(TABLAS, req.params.id);
        caso ? res.json(caso) : res.status(404).send('Caso no encontrado');
    }catch{
        res.status(500).json({ error: 'Error al obtener el caso' });
    }
}

export const actualizarUnCaso = async(req, res) => {
    try{
        const { nombre, descripcion, estado, responsable } = req.body;

        if (!nombre || !descripcion || !estado || !responsable) {
            return res.status(400).json({ error: 'Faltan valores por ingresar' });
        }

        const actualizar = await actualizarCasoById(TABLAS, nombre, descripcion, estado, responsable, req.params.id);

        actualizar ? res.status(200).json({mensaje:'El set se ha actualizado exitosamente', caso: actualizar}) : res.status(404).send('Caso no encontrado');

    }catch(error){
        res.status(500).json({ error: 'Error al actualizar el caso de prueba' });
    }
}


export const eliminarUnCaso = async(req, res) => {
    try{

        const caso = await eliminarCasoById(TABLAS,req.params.id);

        caso ? res.status(200).json({mensaje:'El caso se ha eliminado exitosamente'}):res.status(404).send('caso no encontrado');
    }catch(error){
        console.error("Error al eliminar el caso", error)
        res.status(500).json({ error: 'Error al eliminar el caso de prueba' });
    }
}

export const ordenarCasos = async(req, res) => {
    try{

        const caso = await ordenarCasoByIdSet(TABLAS,req.params.id);

        caso ? res.status(200).json({mensaje:'Los casos se han ordenado correctamente'}):res.status(404).send('casos no encontrados');
    }catch(error){
        console.error("Error al ordenar los casos", error)
        res.status(500).json({ error: 'Error al ordenar los casos de prueba' });
    }
}

export const vincularCasoConCiclo = async(req, res) => {
    try{
        const { idCaso, idCiclo } = req.body;

        if (!idCaso || !idCiclo) {
            return res.status(400).json({ error: 'Faltan valores por ingresar' });
        }

        const casoCiclo = await casoConCiclo(TABLAR,idCaso,idCiclo);

        res.status(201).json({mensaje: 'Caso de prueba vinculado con exito', caso: casoCiclo});

    }catch{
        res.status(500).json({ error: 'Error al vincular el caso de prueba al ciclo' });
    }
}