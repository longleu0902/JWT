import e from 'express';
import db from '../models/index';
import { asIs } from 'sequelize';

const findDifference = (arr1, arr2) => {
    // const diff1 = arr1.findIndex((item)=> item.url !== arr2.url)
    // // const diff2 = arr2.filter((item)=> item !== arr1)
    // // console.log("diff1",diff1)
    // // console.log("diff2",diff2)
    const diff = arr1.filter(item1 => {
        return !arr2.some(item2 => item2.url === item1.url);
    });

    return diff;
}

const createNewRoles = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true
        })
        const result = findDifference(roles, currentRoles)
        if (result.length == 0) {
            return {
                EM: 'Nothing to create ....',
                EC: 0,
                DT: []
            }
        }
        await db.Role.bulkCreate(result)
        return {
            EM: `Create Role succeeds: ${result.length} roles...`,
            EC: 0,
            DT: []
        }
        // console.log("check",result)
        // console.log("check currentRoles" , currentRoles)

    } catch (err) {
        console.log(e)
        return {
            EM: 'Something wrongs with service',
            EC: 1,
            DT: []
        }
    }
}

const getRoleWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        const { count, rows } = await db.Role.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "url", "description"],
            nest: true,
            order: [['id', 'DESC']],
        })
        let totalPage = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPage: totalPage,
            roles: rows
        }
        // console.log("check data",data)
        return {
            EM: 'fetch ok ',
            EC: 0,
            DT: data
        }

    } catch (err) {
        console.log(err)
        return {
            EM: 'Something wrongs with service',
            EC: 1,
            DT: []
        }
    }


}

const getAllRole = async () => {
    try{
    let data = await db.Role.findAll()
    // console.log("check data",data)
    return {
        EM: 'fetch ok ',
        EC: 0,
        DT: data
    }

    }catch(err){
        console.log(err)
        return {
            EM: 'Something wrongs with service',
            EC: 1,
            DT: []
        }
    }

}

const deleteRole = async (id) => {
    try {
        let Role = await db.Role.findOne({
            where: { id: id }
        })
        if (Role) {
            await Role.destroy();


            return {
                EM: 'delete role success',
                EC: 0,
                DT: []
            }

        } else {
            return {
                EM: 'role not exist',
                EC: 2,
                DT: []
            }

        }
    } catch (err) {
        console.log(err)
        return {
            EM: 'Error from service',
            EC: 1,
            DT: []
        }
    }

}
module.exports = {
    createNewRoles, getRoleWithPagination, getAllRole , deleteRole
}