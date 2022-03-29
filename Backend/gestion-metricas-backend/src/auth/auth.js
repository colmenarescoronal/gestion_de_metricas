const jwt = require('jwt-simple');
var moment = require('moment');

const TOKEN_SECRET = process.env.TOKEN_SECRET || "Gestion_metricas";

const check = (req, res, next) => { //Validar token
    if (!req.headers.authorization) {
        return res
            .status(403)
            .send({ message: "Acceso denegado" });
    }
    const token = req.headers.authorization;
    const payload = jwt.decode(token, TOKEN_SECRET);
    req.user = payload.sub;
 
    next();
}

const createToken = (user) => { 
    var payload = {
        sub: user,
        iat: moment().unix(),
        exp: moment().add(180, "days").unix()
    };
    return jwt.encode(payload, TOKEN_SECRET);
};

const validate = (req, res, next) => {
    if (!req.headers.authorization) {
        return res
            .status(403)
            .send({ message: "Acceso denegado" });
    }else{
        try {
            const token = req.headers.authorization;
            const payload = jwt.decode(token, TOKEN_SECRET);
            req.user = payload.sub;

        } catch (error) {
            return res
            .status(401)
            .send({ message: "Incorrecto, Token invalido o expirado" });
        }
    }
    
    next();
}

module.exports = {
    check,
    createToken,
    validate
}