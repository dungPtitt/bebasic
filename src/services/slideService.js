import db from "../models/index";

let handleGetSlide=(idSlide)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      let slide;
      if(!idSlide){
        slide = await db.Slide.findAll();
      }else{
        slide = await db.Slide.findOne({
          where: {id: idSlide}
        });
      }
      return resolve({
        errCode: 0,
        message: "Get slide successfully!",
        data: slide
      })
    }catch(e){
      reject(e);
    }
  });
}

let handleCreateSlide = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(!data){
        resolve({
          errCode:1,
          errMessage: "Missing input!"
        })
      }
      await db.Slide.create({
        idGroup: data.idGroup,
        nameP: data.nameP,
        priceP: data.priceP,
        countP: data.countP,
        imageP: data.imageP,
        infoP: data.infoP,
        parameterP: data.parameterP
      })
      resolve({
        errCode: 0,
        message: "Create slide successfully!"
      });
    } catch (e) {
      reject(e)
    }
  })
}

let handleUpdateSlide = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter"
        })
      }
      let slide = await db.Slide.findOne({
        where: { id: data.id },
        raw: false
      })
      if (!slide) {
        resolve({
          errCode: 2,
          errMessage: "Slide not found!"
        })
      }
      slide.idGroup = data.idGroup;
      slide.nameP = data.nameP;
      slide.priceP = data.priceP;
      slide.countP = data.countP;
      slide.imageP = data.imageP;
      slide.infoP = data.infoP;
      slide.parameterP = data.parameterP;
      slide.save();
      // let slides = await db.Slide.findAll();
      resolve({
        errCode: 0,
        message: "Update Slide Successfully!",
      })
    } catch (e) {
      reject(e)
    }
  })
}

let handleDeleteSlide = async(idSlide)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!idSlide){
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter!"
        })
      }
      let slide = await db.Slide.findOne({
        where: {id: idSlide},
        raw: false
      })
      if(!slide){
        resolve({
          errCode: 2,
          errMessage: "Slide not found!"
        })
      }
      await slide.destroy();
      // let slides = await db.Slide.findAll();
      resolve({
        errCode:0,
        message: "Delete slide successfully!"
      })
    }catch(e){
      reject(e);
    }
  })
}

module.exports = {
  handleCreateSlide,
  handleGetSlide,
  handleUpdateSlide,
  handleDeleteSlide
}