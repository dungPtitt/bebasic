import db from "../models/index";

let handleGetBill=(idBill)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      let bill;
      if(!idBill){
        bill = await db.Bill.findAll();
      }else{
        bill = await db.Bill.findOne({
          where: {id: idBill}
        });
      }
      return resolve({
        errCode: 0,
        message: "Get bill successfully!",
        data: bill
      })
    }catch(e){
      reject(e);
    }
  });
}

let handleCreateBill = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(!data){
        resolve({
          errCode:1,
          errMessage: "Missing input!"
        })
      }
      await db.Bill.create({
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
        message: "Create bill successfully!"
      });
    } catch (e) {
      reject(e)
    }
  })
}

let handleUpdateBill = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter"
        })
      }
      let bill = await db.Bill.findOne({
        where: { id: data.id },
        raw: false
      })
      if (!bill) {
        resolve({
          errCode: 2,
          errMessage: "Bill not found!"
        })
      }
      bill.idGroup = data.idGroup;
      bill.nameP = data.nameP;
      bill.priceP = data.priceP;
      bill.countP = data.countP;
      bill.imageP = data.imageP;
      bill.infoP = data.infoP;
      bill.parameterP = data.parameterP;
      bill.save();
      // let bills = await db.Bill.findAll();
      resolve({
        errCode: 0,
        message: "Update Bill Successfully!",
      })
    } catch (e) {
      reject(e)
    }
  })
}

let handleDeleteBill = async(idBill)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!idBill){
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter!"
        })
      }
      let bill = await db.Bill.findOne({
        where: {id: idBill},
        raw: false
      })
      if(!bill){
        resolve({
          errCode: 2,
          errMessage: "Bill not found!"
        })
      }
      await bill.destroy();
      // let bills = await db.Bill.findAll();
      resolve({
        errCode:0,
        message: "Delete bill successfully!"
      })
    }catch(e){
      reject(e);
    }
  })
}

module.exports = {
  handleCreateBill,
  handleGetBill,
  handleUpdateBill,
  handleDeleteBill
}