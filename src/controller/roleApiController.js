import roleApiService from "../service/roleApiService"

const readFunc = async (req, res) => {
    try{
        if(req.query && req.query.page && req.query.limit){
            let page = req.query.page;
            let limit = req.query.limit
            // console.log("page",page,"limit",page)
            let data = await roleApiService.getRoleWithPagination(+page ,+limit)
            return res.status(200).json({
                EM :data.EM,
                EC: data.EC,
                DT: data.DT,
            })
        }else{
            let data = await roleApiService.getAllRole()
            return res.status(200).json({
                EM :data.EM,
                EC: data.EC,
                DT: data.DT,
            })
        }
 
  

    }catch(err){
        console.log(err)
        return res.status(500).json({
            EM:'error from sever', //error message
            EC:'-1', // Error code
            DT: '', //data
        })
    }
 
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
const deleteFunc = async (req, res) => {
    try{
        let data = await roleApiService.deleteRole(req.body.id);
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

const getRoleByGroup = async (req,res) => {
    try{
        let id = req.params.groupId;
        let data = await roleApiService.RoleByGroup(id);
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

const assignRole = async (req ,res) => {
    try{
        let data = await roleApiService.assignRoleToGroup(req.body)
        // console.log(data)
        // console.log(req.body)

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
module.exports = {
    readFunc,
    createFunc,
    updateFunc,
    deleteFunc,
    getRoleByGroup,
    assignRole
}