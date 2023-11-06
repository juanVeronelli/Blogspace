import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

export const renewToken = (user) => {
    return jwt.sign({ id: user.id }, Math.floor(Date.now() / 1000) + 900);
}

export const authenticate = (req, res, next) => {
    const token = req.header('x-access-token');

    if(!token) return res.status(401).send({ message: 'Token no proporcionado' });
    try{
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch(err){
        return res.status(401).send({ message: 'Token no válido' });
    }
}
