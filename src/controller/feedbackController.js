import feedbackService from "../services/feedbackService";

//@----------------------------------------controllor feedback api----------------------------------
//api
let getFeedback = async (req, res) => {
  try{
    let idProduct = req.query.idProduct;
    let response = await feedbackService.handleGetFeedback(idProduct);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
  
}

let createFeedback = async(req, res)=>{
  try {
    let data = req.body;
    let response = await feedbackService.handleCreateFeedback(data);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let updateFeedback = async (req, res) => {
  try{
    let data = req.body;
    let response = await feedbackService.handleUpdateFeedback(data);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
  
}

let deleteFeedback = async (req, res) => {
  try {
    let idFeedback = req.query.id;
    let response = await feedbackService.handleDeleteFeedback(idFeedback);
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
  getFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
}