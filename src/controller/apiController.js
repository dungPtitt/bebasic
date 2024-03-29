import accountService from "../services/accountService";
import pool from "../configs/connectDB";
let getUsers = async(req, res)=> {
  let [rows, fields] = await pool.execute("select * from users")

  res.status(200).json({
    message: "ok",
    data: rows
  })

}

let createUser = async(req, res)=> {
  let {name, email, address} = req.body;
  if(!name || !email || !address) {
    res.status(200).json({
      message: "Missing params!"
    })
  }
  await pool.execute("insert into users(name, email, address) values(?, ?, ?)", [name, email, address])
  res.status(200).json({
    message: "create user sussess"
  })
}
let updateUser = async(req, res)=> {
  let {id, name, email, address} = req.body;
  console.log(req.body);
  if(!id || !name || !email || !address) {
    res.status(200).json({
      message: "Missing params!"
    })
  }
  await pool.execute("update users set name=?, email=?, address=? where id = ?", [name, email, address, id])
  res.status(200).json({
    message: "update user sussess"
  })
}
let deleteUser = async(req, res)=> {
  let userId = req.params.id
  console.log(userId)
  if(!userId) {
    res.status(200).json({
      message: "Missing params"
    })
  }
  await pool.execute("DELETE FROM users WHERE id = ?", [userId])
  res.status(200).json({
    message: "delete user success"
  })
}

let checkLogin = async(req, res)=>{
  try{
    let data = req.body;
    let response = await accountService.handleUserLogin(data.email, data.password);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

let registerMember = async(req, res)=>{
  try{
    let data = req.body;
    let response = await accountService.handleCreateAcc(data);
    if(response.errCode==0){
      return res.status(200).json({
        errCode: 0,
        message: "Register successfully!"
      });
    }
    return res.status(200).json(response);
    
  }catch(e){
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

let changePassword = async(req, res)=>{
  try{
    let data = req.body;
    let response = await accountService.handleChangePassword(data);
    if(response.errCode==0){
      return res.status(200).json({
        errCode: 0,
        message: "change password successfully!"
      });
    }
    return res.status(200).json(response);
    
  }catch(e){
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

let forgotPassword = async(req, res)=>{
  try{
    let data = req.body;
    let response = await accountService.handleForgotPassword(data);
    if(response.errCode==0){
      return res.status(200).json({
        errCode: 0,
        message: "get password successfully!"
      });
    }
    return res.status(200).json(response);
    
  }catch(e){
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}
module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,

  checkLogin,
  registerMember,
  changePassword,
  forgotPassword
}