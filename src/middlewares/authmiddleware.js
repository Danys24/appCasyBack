import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if(!token) {
        return res.status(401).json({error:"no autorizado"});
    }
    
    try{

        const payload = jwt.verify(token, 'serna');
        req.nombre = payload;
        next();

    } catch (err) {

        res.status(403).json({error: "Token Invalido"});

    }

}