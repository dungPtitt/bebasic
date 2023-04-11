import billService from "../services/billService";
//web
let createBillWeb = async(req, res)=>{
  try {
    let data = req.body;
    console.log(data);
    let response = await billService.handleCreateBill(data);
    res.redirect("/bill");
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let getEditAddBill = async(req, res)=>{
  try{
    let response = "";
    let idBill = req.query.id;
    if(idBill!=-1){
      response = await billService.handleGetBill(idBill);
      return res.render("admin/EditAndAddBill.ejs", {data: response.data, idBill: idBill});
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
      return res.render("admin/EditAndAddBill.ejs", {data: data, idBill: idBill});
    }
  }catch(e){
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

//@----------------------------------------controllor bill api----------------------------------
//api
let getBill = async (req, res) => {
  try{
    let id = req.query.id;
    let response = await billService.handleGetBill(id);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
  
}

let createBill = async(req, res)=>{
  try {
    let data = req.body;
    let response = await billService.handleCreateBill(data);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let updateBill = async (req, res) => {
  try{
    let data = req.body;
    let response = await billService.handleUpdateBill(data);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
  
}

let deleteBill = async (req, res) => {
  try {
    let idBill = req.query.id;
    let response = await billService.handleDeleteBill(idBill);
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
  createBillWeb,
  getEditAddBill,
  ///-------------
  getBill,
  createBill,
  updateBill,
  deleteBill,
}