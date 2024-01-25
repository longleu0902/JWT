import jwt from 'jsonwebtoken';

require('dotenv').config()

const createJWT = (data) => {
    let key = process.env.JWT_SECRET;
    let token = null
    try {
        token = jwt.sign(data, key);
        // console.log("check token", token);
    } catch (err) {
        console.log(err);
    }
    return token
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null

    try {
        decoded = jwt.verify(token, key);
    } catch (err) {
        console.log(err)

    }
    return decoded

}

const checkUserJWT = (req, res, next) => {
    let cookies = req.cookies;
    if (cookies && cookies.jwt) {
        let token = cookies.jwt;
        // console.log("check token" ,token )
        let decoded = verifyToken(token)
        if(decoded){
            req.user  = decoded;
            next();
        }else{
            return res.status(401).json({
                EC: -1,
                DT: '',
                EM: 'Not authenticated the user'
            })
        }
        // console.log(">>> check jwt", cookies)
    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'Not authenticated the user'
        })
    }
}
const checkUserPermission = (req , res, next) => {
    if(req.user){
        let email = req.user.email ;
        let roles = req.user.groupWithRoles.Roles;
        let currentUrl = req.path;

        if(!roles || roles.length === 0 ){
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: `You don't permisstion to access this resource...`
            })
        }

        let canAccess  = roles.some(item => item.url === currentUrl)
        if(canAccess === true){
            next();
        }else{
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: `You don't permisstion to access this resource...`
            })
        }

    }else{
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'Not authenticated the user'
        })
    }
}
module.exports = {
    createJWT, verifyToken, checkUserJWT , checkUserPermission
}