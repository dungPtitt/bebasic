import productService from "../services/productService";
//web
let createProductWeb = async(req, res)=>{
  try {
    let data = req.body;
    // console.log(data);
    let response = await productService.handleCreateProduct(data);
    return res.redirect("product");
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let updateProductWeb = async(req, res)=>{
  try{
    let data = req.body;
    await productService.handleUpdateProduct(data);
    return res.redirect("product");
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let deleteProductWeb = async(req, res)=>{
  try {
    let idProduct = req.query.id;
    await productService.handleDeleteProduct(idProduct);
    return res.redirect("product");
  }catch(e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let getEditAddProduct = async(req, res)=>{
  try{
    let response = "";
    let idProduct = req.query.id;
    if(idProduct!=-1){
      response = await productService.handleGetProduct(idProduct);
      return res.render("admin/EditAndAddProduct.ejs", {data: response.data, idProduct: idProduct});
    }else{// xu ly them moi
      let data = {
        id: "",
        nameP:"",
        priceP: "",
        countP:"",
        imageP: "",
        infoP: "",
        parameterP: "",
        idGroup: ""
      }
      return res.render("admin/EditAndAddProduct.ejs", {data: data, idProduct: idProduct});
    }
  }catch(e){
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

//@----------------------------------------controllor product api----------------------------------
//api
let getProduct = async (req, res) => {
  try{
    let id = req.query.id;
    let response = await productService.handleGetProduct(id);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
  
}

let createProduct = async(req, res)=>{
  try {
    let data = req.body;
    let response = await productService.handleCreateProduct(data);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}


let updateProduct = async (req, res) => {
  try{
    let data = req.body;
    let response = await productService.handleUpdateProduct(data);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
  
}

let deleteProduct = async (req, res) => {
  try {
    let idProduct = req.query.id;
    let response = await productService.handleDeleteProduct(idProduct);
    return res.status(200).json(response);
  }catch(e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

module.exports = {
  createProductWeb,
  getEditAddProduct,
  deleteProductWeb,
  updateProductWeb,
  ///-------------
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}