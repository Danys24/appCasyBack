import {todos, crearUsuario} from "../config/db.js";

const TABLA = 'users';

export const consultarUsuarios = () => {
    return todos(TABLA)
}

export const crearUser = (usuario, clave) => {
    return crearUsuario(TABLA,usuario,clave)
}