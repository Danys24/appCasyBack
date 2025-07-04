const autorizarRol = (rolesPermitidos) => {
  return (req, res, next) => {
    const { rol } = req.usuario;
    if (!rolesPermitidos.includes(rol)) {
      return res.status(403).json({ mensaje: 'Acceso denegado: rol no autorizado' });
    }
    next();
  };
};

export default autorizarRol;