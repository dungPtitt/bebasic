import db from "../models/index";

let handleGetFeedback=(idProduct)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      let feedback;
      if(!idProduct){
        feedback = await db.Feedback.findAll();
      }else{
        feedback = await db.Feedback.findAll({
          where: { idProduct: idProduct },
        })
      }
      return resolve({
        errCode: 0,
        message: "Get feedback successfully!",
        data: feedback
      })
    }catch(e){
      reject(e);
    }
  });
}

let handleCreateFeedback = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(!data.idAcc || !data.idProduct || !data.content){
        return resolve({
          errCode:1,
          errMessage: "Missing input!"
        })
      }
      await db.Feedback.create({
        idAcc: data.idAcc,
        idProduct: data.idProduct,
        nameCustomer: data.nameCustomer?data.nameCustomer: "",
        email: data.email?data.email: "",
        content: data.content
      })
      // cap nhat san pham
      // let feedback = await db.Feedback.findOne({
      //   where: {idAcc: data.idAcc},
      //   raw: false
      // })
      // if(!feedback){
      //   return resolve({
      //     errCode: 3,
      //     errMessage: "Product not found in db"
      //   })
      // }
      // feedback.countP = feedback.countP - data.quantityP;
      // await feedback.save();
      return resolve({
        errCode: 0,
        message: "Create feedback successfully!"
      });
    } catch (e) {
      reject(e)
    }
  })
}

let handleUpdateFeedback = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter"
        })
      }
      let feedback = await db.Feedback.findOne({
        where: { id: data.id },
        raw: false
      })
      if (!feedback) {
        resolve({
          errCode: 2,
          errMessage: "Feedback not found!"
        })
      }
      feedback.idGroup = data.idGroup;
      feedback.nameP = data.nameP;
      feedback.priceP = data.priceP;
      feedback.countP = data.countP;
      feedback.imageP = data.imageP;
      feedback.infoP = data.infoP;
      feedback.parameterP = data.parameterP;
      feedback.save();
      // let feedbacks = await db.Feedback.findAll();
      resolve({
        errCode: 0,
        message: "Update Feedback Successfully!",
      })
    } catch (e) {
      reject(e)
    }
  })
}

let handleDeleteFeedback = async(idFeedback)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!idFeedback){
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter!"
        })
      }
      let feedback = await db.Feedback.findOne({
        where: {id: idFeedback},
        raw: false
      })
      if(!feedback){
        resolve({
          errCode: 2,
          errMessage: "Feedback not found!"
        })
      }
      await feedback.destroy();
      // let feedbacks = await db.Feedback.findAll();
      resolve({
        errCode:0,
        message: "Delete feedback successfully!"
      })
    }catch(e){
      reject(e);
    }
  })
}

module.exports = {
  handleCreateFeedback,
  handleGetFeedback,
  handleUpdateFeedback,
  handleDeleteFeedback
}