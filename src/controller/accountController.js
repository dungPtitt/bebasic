import accountService from "../services/accountService";

let authorityLogin = async(req, res)=>{
  try{
    let data = req.body;
    let response = await accountService.handleUserLogin(data.email, data.password);
    console.log("data: ", response);
    if(response.errCode==0){
      switch (response.idAuth) {
        case 1:
          res.redirect("/admin-page");
          break;
        case 2:
          res.render("manager/home.ejs");
          break;
        case 3:
          res.render("member/home.ejs");
          break;
        default:
          res.render("login.ejs");
          break;
      }
    }else{
      res.render("login.ejs");
    }
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

let getViewCRUDAcc = (req, res)=>{
  return res.render("account/crud.ejs");
}

//
let login = async (req, res) => {
  try{
    let email = req.body.email
    let password = req.body.password
    if (!email || !password) {
      return res.status(200).json({
        errCode: 1,
        message: 'Missing input params'
      })
    }
    let dataUser = await accountService.handleUserLogin(email, password)
    return res.status(200).json({
      errCode: dataUser.errCode,
      message: dataUser.errMessage,
      user: dataUser.userInfo ? dataUser.userInfo : {}
      // user: dataUser.userInfo
    })
  }catch(e){
    return res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
  
}

let getEditAcc = async(req, res)=>{
  try{
    let response = "";
    let idAcc = req.query.id;
    if(idAcc!=-1){
      response = await accountService.handleGetAcc(idAcc);
      res.render("admin/EditAndAddAcc.ejs", {data: response.data, idAcc: idAcc});
    }else{
      let data = {
        id: "",
        idAuth:"",
        nameAcc: "",
        emailAcc:""
      }
      res.render("admin/EditAndAddAcc.ejs", {data: data, idAcc: idAcc});
    }
  }catch(e){
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let getAcc = async (req, res) => {
  try{
    let id = req.query.id;
    let response = await accountService.handleGetAcc(id);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
  
}

let getAllAcc = async (req, res) => {
  try {
    let id = req.query.id;
    if(!id){
      res.status(200).json({
        errCode: 1,
        errMessage: "Missing input prarametes"
      })
    }else{
      let accounts = await accountService.handleGetAcc(id);
      return res.status(200).json(accounts);
    }
    
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}
let createAcc = async(req, res)=>{
  try {
    let data = req.body;
    let response = await accountService.handleCreateAcc(data);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}
let createAccWeb = async(req, res)=>{
  try {
    let data = req.body;
    let response = await accountService.handleCreateAcc(data);
    res.redirect("/");
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let updateAcc = async (req, res) => {
  try{
    let data = req.body;
    let response = await accountService.handleUpdateAcc(data);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
  
}

let getUpdateAcc = async(req, res)=>{
  try{
    let data = req.body;
    await accountService.handleUpdateAcc(data);
    return res.redirect("/");
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let deleteAcc = async (req, res) => {
  try {
    let idAcc = req.query.id;
    let response = await accountService.handleDeleteAcc(idAcc);
    return res.render("account.ejs", {data: response.data});
  }catch(e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let deleteAccWeb = async (req, res) => {
  try {
    let idAcc = req.query.id;
    await accountService.handleDeleteAcc(idAcc);
    res.redirect("/");
  }catch(e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}
module.exports = {
  getViewCRUDAcc,
  getEditAcc,
  getUpdateAcc,
  createAccWeb,
  deleteAccWeb,
  //
  authorityLogin,
  login,
  createAcc,
  getAcc,
  getAllAcc,
  updateAcc,
  deleteAcc
}