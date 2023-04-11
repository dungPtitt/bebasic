import accountService from "../services/accountService";

let getAdminPage = async (req, res)=>{
  try{
    let response = await accountService.handleGetAcc("All");
    if(response.errCode===0){
      res.render("account.ejs", {data: response.data});
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
  getAdminPage,
}