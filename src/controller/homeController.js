import userService from "../service/userService"


const handleHelloWord = (req, res) => {
    return res.render("home.ejs")
}
const handleUserPage = async(req, res) => {
    let userList = await userService.getUserList();
    console.log(">>>check user list",userList)
    return res.render("user.ejs",{userList})
}
const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    userService.createNewUser(email,password,username)
    console.log(">>>check request: ", req.body)
    return res.redirect("/user")


}
const handleDeleteUser = (req,res) => {
    console.log(">>>check id",req.params.id)
    userService.deleteUser(req.params.id);
    return res.redirect("/user")
}
module.exports = {
    handleHelloWord,
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser,
}