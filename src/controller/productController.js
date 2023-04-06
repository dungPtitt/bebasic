import productService from "../services/productService";

let createProduct = async(req, res)=>{
  try{
    let response = await productService.getProduct();
    res.render("product.ejs", {data: response.data});
  }catch(e){
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

let getProductView = ()=>{

}

module.exports = {
  createProduct,
  getProductView
}