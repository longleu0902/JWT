import roleApiService from "../service/roleApiService"

const readFunc = async (req, res) => {
 
}
const createFunc = async (req, res) => {
    try{
        let data  = await roleApiService.createNewRoles(req.body);
        return res.status(200).json({
            EM :data.EM,
            EC: data.EC,
            DT: data.DT,
        })
        
    }catch(e){
        console.log(e)
        return res.status(500).json({
            EM:'error from sever', //error message
            EC:'-1', // Error code
            DT: '', //data
        })

    }

}
const updateFunc = (req, res) => {

}
const deleteFunc = (req, res) => {

}
module.exports = {
    readFunc,
    createFunc,
    updateFunc,
    deleteFunc
}