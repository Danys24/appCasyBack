import {todos, crearUsuario, verificarUser} from "../config/db.js";

const TABLA = 'users';

export const consultarUsuarios = () => {
    return todos(TABLA)
}

export const crearUser = (usuario, clave) => {
    return crearUsuario(TABLA,usuario,clave)
}

export const verificarUsuario = (usuario, clave) => {
    return verificarUser(TABLA,usuario,clave)
}