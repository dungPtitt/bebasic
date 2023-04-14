import accountService from "../services/accountService";
import productService from "../services/productService";

let getManagerPage = async (req, res)=>{
  try{
    return res.render("manager/ManagerPage.ejs");
  }catch(e){
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let getViewAccount = async (req, res)=>{
  try{
    let response = await accountService.handleGetAcc("All");
    if(response.errCode===0){
      return res.render("account.ejs", {data: response.data});
    }
  }catch(e){
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let getViewProduct = async (req, res)=>{
  try{
    let response = await productService.handleGetProduct();
    if(response.errCode===0){
      return res.render("product.ejs", {data: response.data});
    }
  }catch(e){
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

module.exports = {
  getManagerPage,
  getViewAccount,
  getViewProduct
}