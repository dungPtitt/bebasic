import loginService from "../services/loginService";

let login = async(req, res)=>{
  try{
    let data = req.body;
    let response = await loginService.handleLogin(data);
    if(response.errCode==0){
      res.cookie("token", response.data, {
        maxAge: 86400*60// thoi gian song sau 60 phut;
      });
      return res.redirect("/verify");
    }
    return res.redirect("/login");

    
  }catch(e){
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

let verify = async(req, res)=>{
  try{
    let token = req.cookies.token;
    let response = await loginService.verifyToken(token);
    if(response.errCode==0){
      //set idAuth vao cookie
      res.cookie("idAuth", response.data.idAuth, {
        maxAge: 86400*60// thoi gian song sau 60 phut;
      });
      switch (response.data.idAuth) {
        case 1:
          return res.redirect("/admin");
        case 2:
          return res.redirect("/manager");
        case 3:
          return res.redirect("/member");
        default:
          return res.redirect("/login");
      }
    }else{
      return res.redirect("/login");
    }
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

module.exports = {
  login,
  verify,
}