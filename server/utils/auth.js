import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const tokenBlackList = new Set();



export const authenticate = (req, res, next) => {
    const token = req.header('x-access-token')
    if(!token) {
        return res.status(401).send({ message: 'Token no proporcionado' });
    } else {
        try{
            const decoded = jwt.verify(token, process.env.SECRET);
            const now = Math.floor(Date.now() / 1000);
            if(decoded.exp < now) return res.status(401).send({ message: 'Token ha expirado' });

            const renewedToken = jwt.sign({ ...decoded, exp: Math.floor(Date.now() / 1000) + 3600 }, process.env.SECRET);
            res.setHeader('x-access-token', renewedToken);

            req.user = decoded;
            next();
        } catch(err){
            res.status(401).send({ message: 'Token ha expirado' });
            console.log(err)
        }
    }
}
