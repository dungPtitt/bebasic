import accountService from "../services/accountService";
import productService from "../services/productService";

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

let getManageGroupProduct = async (req, res)=> {
  try{
    return res.render("groupProduct");
    // let response = await productService.handleGetProductByGroup(idGroup);
  }catch(e){
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}
module.exports = {
  getAdminPage,
  getManageGroupProduct,
}