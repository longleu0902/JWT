import loginRegisterService from "../service/loginRegisterService"

const testApi = (req, res) => {
    return res.status(200).json({
        message: "ok",
        data: 'test api'
    })
}
const handleRegister = async (req, res) => {
    // console.log(">>call me" ,req.body)
    try {
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing required parameters',
                EC: '1',
                DT: ''
            })
        }
        if (req.body.password && req.body.password.length < 4) {
            return res.status(200).json({
                EM: 'Your password must have mor than 4 letters',
                EC: '1',
                DT: ''
            })
        }

        //service : create user
        let data = await loginRegisterService.registerNewUser(req.body)

        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, // Error code
            DT: '', //data
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from sever', //error message
            EC: '-1', // Error code
            DT: '', //data
        })
    }
}
const handleLogin = async (req, res) => {
    console.log("check login from react", req.body)
    try {
        let data = await loginRegisterService.handleUserLogin(req.body);
        if(data && data.DT && data.DT.access_token){
            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            EM: 'error from sever', //error message
            EC: '-1', // Error code
            DT: '', //data
        })

    }
}
const handleLogout = (req,res) => {
    try {
        res.clearCookie("jwt")
        return res.status(200).json({
            EM: 'ok',
            EC: 0,
            DT:'',
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            EM: 'error from sever', //error message
            EC: '-1', // Error code
            DT: '', //data
        })

    }
}
module.exports = {
    testApi,
    handleRegister,
    handleLogin,
    handleLogout
} 