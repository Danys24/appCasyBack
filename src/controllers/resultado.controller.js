import {crearResultado, 
        actualizarResultadoById, 
        resultadoById, 
        resultsByIdPasoCiclo, 
        eliminarEvidenciaById, 
        crearEvidencia,
        resultsByIdCasoCiclo } from '../models/resultadoModels.js';

const TABLAS = 'resultado_paso_prueba';
const TABLAE = "evidencias";

export const crearResultadoPrueba = async(req, res) => {
    try{
        const { idPaso, idCiclo, idCaso ,observacion, estado } = req.body;
        const imagenes = req.files; //Array de archivos

        if (!idPaso || !idCiclo || !idCaso || !observacion || !estado) {
            return res.status(400).json({ error: 'Faltan valores por ingresar' });
        }

        const resultado = await crearResultado(TABLAS,TABLAE, idPaso, idCiclo,idCaso, observacion, imagenes,estado);

        if (!resultado) {
            //return res.status(401).json({ error: 'El set no se ha creado' });
        }

        res.status(201).json({mensaje: 'resultado de prueba creado', resultado: resultado});

    }catch (error){
        console.error('Error al crear el resultado:', error);
        res.status(500).json({ error: 'Error al crear un resultado de prueba' });
    }
}

export const obtenerResultadosByIdPasoCiclo = async(req, res) => {

    const obtenerUrl = (evidendia) => {
        const urlEvidencia = [];
        for(const evi of evidendia){
            urlEvidencia.push(`http://localhost:3000/imagenes/${evi}`);
        }
        return urlEvidencia
    }
    
    try{
        const resultado = await resultsByIdPasoCiclo(TABLAS,TABLAE, req.params.idPaso, req.params.idCiclo);

        if(resultado.length === 0){
            return res.status(404).json({mensaje:"no se encuntraron resultados"})
        }

        const datosConURL = resultado.map(r => ({
            ...r,
            url_evidencia: r.evidencia
                ? obtenerUrl(r.evidencia)
                : null
        }));
        res.json(datosConURL);
    }catch(error){
        console.error('Error al obtener el resultado:', error);
        res.status(500).json({ error: 'Error al obtener los resultados de prueba' });
    }
}

export const obtenerResultadosByIdCasoCiclo = async(req, res) => {

    const obtenerUrl = (evidendia) => {
        const urlEvidencia = [];
        for(const evi of evidendia){
            urlEvidencia.push(`http://localhost:3000/imagenes/${evi}`);
        }
        return urlEvidencia
    }
    
    try{
        const resultado = await resultsByIdCasoCiclo(TABLAS,TABLAE, req.params.idCaso, req.params.idCiclo);

        if(resultado.length === 0){
            return res.status(404).json({mensaje:"no se encuntraron resultados"})
        }

        const datosConURL = resultado.map(r => ({
            ...r,
            url_evidencia: r.evidencia
                ? obtenerUrl(r.evidencia)
                : null
        }));
        res.json(datosConURL);
    }catch(error){
        console.error('Error al obtener el resultado:', error);
        res.status(500).json({ error: 'Error al obtener los resultados de prueba' });
    }
}

export const obtenerUnResultado = async(req, res) => {
    try{
        const resultado = await resultadoById(TABLAS, req.params.id);
        resultado ? res.json(resultado) : res.status(404).send('Resultado no encontrado');
    }catch{
        res.status(500).json({ error: 'Error al obtener el resultado' });
    }
}

export const actualizarUnResultado = async(req, res) => {
    try{
        const { observacion, estado } = req.body;

        if (!observacion || !estado ) {
            return res.status(400).json({ error: 'Faltan valores por ingresar' });
        }

        const actualizar = await actualizarResultadoById(TABLAS, observacion, estado, req.params.id);

        actualizar ? res.status(200).json({mensaje:'El resultado se ha actualizado exitosamente', caso: actualizar}) : res.status(404).send('Resultado no encontrado');

    }catch(error){
        res.status(500).json({ error: 'Error al actualizar el resultado de prueba' });
    }
}

export const crearEvidencias = async(req, res) => {
    try{
        const { idResultado } = req.body;
        const imagenes = req.files; //Array de archivos

        if (!idResultado ) {
            return res.status(400).json({ error: 'Faltan valores por ingresar' });
        }

        const evidencia = await crearEvidencia(TABLAE, idResultado, imagenes);

        res.status(201).json({mensaje: 'evidencia de prueba creado', evidencia: evidencia});

    }catch(error){
        console.error("Error al crear evidencia",error);
        res.status(500).json({ error: 'Error al crear la evidencia de prueba' });
    }
}

export const eliminarEvidencia = async(req, res) => {
    try{

        const evidencia = await eliminarEvidenciaById(TABLAE, req.params.id);

        evidencia ? res.status(200).json({mensaje:'La evidencia se ha eliminado exitosamente'}):res.status(404).send('Evidencia no encontrada');

    }catch(error){
        console.error("Error al eliminar evidencia",error);
        res.status(500).json({ error: 'Error al eliminar la evidencia' });
    }
}






