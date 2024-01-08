import loginRegisterService from "../service/loginRegisterService"

const testApi =(req,res) => {
  return res.status(200).json({
    message:"ok",
    data:'test api'
  })
}
const handleRegister = async (req,res) => {
    // console.log(">>call me" ,req.body)
    try{
        if(!req.body.email || !req.body.phone || !req.body.password){
            return res.status(200).json({
                EM:'Missing required parameters',
                EC:'1',
                DT:''
            })
        }
        if(req.body.password && req.body.password.length <4){
            return res.status(200).json({
                EM:'Your password must have mor than 4 letters',
                EC:'1',
                DT:''
            })
        }

        //service : create user
        let data = await loginRegisterService.registerNewUser(req.body) 

        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, // Error code
            DT: '', //data
        })

    }catch(e){
        return res.status(500).json({
            EM:'error from sever', //error message
            EC:'-1', // Error code
            DT: '', //data
        })
    }
}
module.exports = {
    testApi,
    handleRegister,
} 