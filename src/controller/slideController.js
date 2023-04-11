import slideService from "../services/slideService";
//web
let createSlideWeb = async(req, res)=>{
  try {
    let data = req.body;
    console.log(data);
    let response = await slideService.handleCreateSlide(data);
    res.redirect("/slide");
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let getEditAddSlide = async(req, res)=>{
  try{
    let response = "";
    let idSlide = req.query.id;
    if(idSlide!=-1){
      response = await slideService.handleGetSlide(idSlide);
      return res.render("admin/EditAndAddSlide.ejs", {data: response.data, idSlide: idSlide});
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
      return res.render("admin/EditAndAddSlide.ejs", {data: data, idSlide: idSlide});
    }
  }catch(e){
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

//@----------------------------------------controllor slide api----------------------------------
//api
let getSlide = async (req, res) => {
  try{
    let id = req.query.id;
    let response = await slideService.handleGetSlide(id);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
  
}

let createSlide = async(req, res)=>{
  try {
    let data = req.body;
    let response = await slideService.handleCreateSlide(data);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let updateSlide = async (req, res) => {
  try{
    let data = req.body;
    let response = await slideService.handleUpdateSlide(data);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
  
}

let deleteSlide = async (req, res) => {
  try {
    let idSlide = req.query.id;
    let response = await slideService.handleDeleteSlide(idSlide);
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
  createSlideWeb,
  getEditAddSlide,
  ///-------------
  getSlide,
  createSlide,
  updateSlide,
  deleteSlide,
}