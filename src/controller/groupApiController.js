import groupApiService from "../service/groupApiService"
const readFunc = async (req ,res) => {
    try{
        let data = await groupApiService.getGroups()
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    }catch(err){
        return {
            EM: 'Error from server',
            EC: 1,
            DT: []
        }
    }

}
module.exports = {
    readFunc,
}