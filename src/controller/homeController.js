import userService from "../service/userService"


const handleHelloWord = (req, res) => {
    return res.render("home.ejs")
}
const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList();
    // console.log(">>>check user list", userList)
    return res.render("user.ejs", { userList })
}
const handleCreateNewUser =  async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

     await userService.createNewUser(email, password, username)
    // console.log(">>>check request: ", req.body)
    return res.redirect("/user")


}
const handleDeleteUser = (req, res) => {
    console.log(">>>check id", req.params.id)
    userService.deleteUser(req.params.id);
    return res.redirect("/user")
}
const getUpdateUserPage = async (req, res) => {
    let id = req.params.id;
    let user = await userService.getUserById(id);
    let userData = user;
    // if (user && user.length > 0) {
    //     userData = user[0];

    // }
    console.log(">>>check user data",userData)
    return res.render("user-update.ejs", { userData })
}

const handleUpdateUser = async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let id = req.body.id;
    await userService.updateUserInfo(email, username, id);
    return res.redirect("/user");

}
module.exports = {
    handleHelloWord,
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser,
    getUpdateUserPage,
    handleUpdateUser,
}