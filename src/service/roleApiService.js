import e from 'express';
import db from '../models/index';

const findDifference = (arr1 , arr2) => {
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
        attributes :['url', 'description'],
        raw : true
    })
    const result = findDifference(roles,currentRoles)
    if(result.length == 0){
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

 }catch(err){
    console.log(e)
    return {
        EM: 'Something wrongs with service',
        EC: 1,
        DT: []
    }
 }
}
module.exports = {
    createNewRoles,
}