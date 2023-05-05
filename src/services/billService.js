import db from "../models/index";

let handleGetBill=(idBill)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      let bill;
      if(!idBill){
        bill = await db.Bill.findAll();
      }else{
        bill = await db.Bill.findOne({
          where: { id: idBill },
          include: [
            {
              model: db.Bill,
              as: "DataAuth",
              attributes: ["nameAuth"]
            },
            {
              model: db.Bill,
              as: "DataAccAndBill"
            }
          ],
          raw: true,
          nest: true
        })
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
        return resolve({
          errCode:1,
          errMessage: "Missing input!"
        })
      }
      await db.Bill.create({
        idAcc: data.idAcc?data.idAcc: 8,
        nameCustomer: data.nameCustomer?data.nameCustomer: "",
        email: data.email?data.email: "",
        phone: data.phone?data.phone:"",
        address: data.address?data.address:"",
        dateBill: data.dateBill?data.dateBill:"",
        totalMoney: data.totalMoney?data.totalMoney: 0,
        methodPay: data.methodPay?data.methodPay: '',
        noteBill: data.noteBill? data.noteBill:"",
        statusBill:data.statusBill?data.statusBill:"",
        idP: data.idP? data.idP: 2,
        quantityP: data.quantityP? data.quantityP: 1
      })
      // cap nhat san pham
      let product = await db.Product.findOne({
        where: {id: data.idP},
        raw: false
      })
      if(!product){
        return resolve({
          errCode: 3,
          errMessage: "Product not found in db"
        })
      }
      product.countP = product.countP - data.quantityP;
      await product.save();
      return resolve({
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