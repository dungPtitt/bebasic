import db from "../models/index";

let handleTestApi = async()=>{
  return new Promise(async(resolve, reject)=>{
    try{
      let data = await db.Test.findOne({
        attributes: ['name', 'email'],
        where: { id: 1 },
        raw: true
      })
      resolve(data);
    }catch(e){
      reject(e);
    }
  });
}

let handleGetAcc = async()=>{
  return new Promise(async(resolve, reject)=>{
    try{
      let data = await db.Slides.findAll();
      if(!data){
        resolve({
          errorCode: 1,
          errorMessage: "Account not found!"
        })
      }
      resolve({
        errorCode: 0,
        message: "Get account successfully!",
        data: data
      })
    }catch(e){
      reject(e);
    }
  })
}

let handleCreateSlide = async(data)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!data){
        resolve({
          errorCode: 1,
          errorMessage: "Account not found!"
        })
      }
      await db.User.create({name: "jane", email:"dung@da", address: "adaf"});
      // User.create({ firstName: "Jane", lastName: "Doe" });
      resolve({
        errorCode: 0,
        message: "Get account successfully!",
        data: data
      })
    }catch(e){
      reject(e);
    }
  })
}

module.exports = {
  handleGetAcc,
  handleCreateSlide,
  handleTestApi
}