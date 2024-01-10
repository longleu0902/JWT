import db from '../models/index';

const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            attributes : ["id","username","email","phone","sex"],
            include: {model : db.Group , attributes : ["name","description"]},
            nest: true
        });
        if (users) {
            return {
                EM: 'get data success',
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: 'get data success',
                EC: 0,
                DT: []
            }
        }
    } catch (err) {
        console.log(err)
        return {
            EM: 'something wrongs with service',
            EC: 1,
            DT: []
        }

    }

}
const getUserWithPagination = async (page , limit ) => {
    try{
       let offset = (page - 1) * limit;

       const {count , rows} = await db.User.findAndCountAll({
        offset: offset,
        limit: limit
       })
       let totalPage = Math.ceil(count/limit)
       let data = {
        totalRows : count,
        totalPage : totalPage,
        users: rows
       }
       console.log(">>>check data", data)

       return {
        EM:'fetch ok',
        EC : 0,
        DT : data
    }

    }catch(err){
        console.log(err)
        return {
            EM:'Something wrongs with service',
            EC : 1,
            DT : []
        }
    }

}
const createNewUser = async (data) => {
    try{
        await db.User.create({

        })

    }catch(err){
        console.log(err)
    }

}
const updateUser = async (data) => {
    try{
        let user = await db.User.findOne({
            where : { id : data.id}
        })
        if(user){
            //update

        }else{
            // not found
        }

    }catch(err){
        console.log(err)
    }

}
const deleteUser = async (id) => {
    try{
        await db.User.delete({
            where : {id : id}
        })
    }catch(err){
        console.log(err)
    }

}

module.exports = {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser,
    getUserWithPagination


}