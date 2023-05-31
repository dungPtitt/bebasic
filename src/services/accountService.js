import db from "../models/index";
import bcrypt from 'bcryptjs';
let salt = bcrypt.genSaltSync(10);
import emailService from "./emailService";

let handleUserLogin = async(email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(!email){
        resolve({
          errCode: 5,
          errMessage: "Missing input email!"
        })
      }
      if(!password){
        resolve({
          errCode: 6,
          errMessage: "Missing password"
        })
      }
      let isExist = await checkEmail(email);
      // neu ton tai email thi check password
      if(!isExist){
        resolve({
          errCode: 1,
          errMessage: "Your email not exit. Please try again!"
        })
      }
      let acc = await db.Account.findOne({
        where: { emailAcc: email },
        raw: true
      })
      if(!acc){
        resolve({
          errCode: 1,
          errMessage: "Your email not exit. Please try again!"
        })
      }
      let check = await bcrypt.compare(password, acc.passwordAcc);
      if(!check){
        resolve({
          errCode: 2,
          errMessage: "Wrong password. Please try again!"
        })
      }
      let response = {};
      response.errCode = 0;
      response.message = "Login successfully!";
      response.dataAcc = acc;
      resolve(response);
    } catch (e) {
      reject(e);
    }
  })
}

let handleChangePassword = async(data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let idAcc = data.idAcc;
      let oldPassword = data.oldPassword;
      let newPassword = data.newPassword;
      if(!idAcc){
        resolve({
          errCode: 5,
          errMessage: "Missing input idAcc!"
        })
      }
      if(!oldPassword || !newPassword){
        resolve({
          errCode: 6,
          errMessage: "Missing password"
        })
      }
      let acc = await db.Account.findOne(
          {where: {id: idAcc}, raw: false}
        );
      // neu ton tai email thi check password
      
      if(!acc){
        resolve({
          errCode: 1,
          errMessage: "Account is not exit. Please try again!"
        })
      }
      let check = await bcrypt.compare(oldPassword, acc.passwordAcc);
      if(!check){
        resolve({
          errCode: 2,
          errMessage: "Wrong password. Please try again!"
        })
      }
      let hashPasswordFromBcrypt = await hashUserPassword(newPassword);
      acc.passwordAcc = hashPasswordFromBcrypt;
      await acc.save();
      return resolve({
        errCode: 0,
        message: "change password success",
        data: acc
      });
    } catch (e) {
      reject(e);
    }
  })
}

let handleForgotPassword = async(data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let nameAcc = data.nameAcc;
      let emailAcc = data.emailAcc;
      if(!nameAcc){
        resolve({
          errCode: 5,
          errMessage: "Missing input name!"
        })
      }
      if(!emailAcc){
        resolve({
          errCode: 6,
          errMessage: "Missing email"
        })
      }
      let acc = await db.Account.findOne(
          {where: {emailAcc: emailAcc, nameAcc: nameAcc}, raw: false}
        );
      // neu ton tai email thi check password
      
      if(!acc){
        resolve({
          errCode: 1,
          errMessage: "Account is not exit. Please try again!"
        })
      }
      let password = Math.random().toString().substr(2, 6);
      console.log(password);
      data.password = password;
      await emailService.sendForgotPassword(data);
      let hashPasswordFromBcrypt = await hashUserPassword(password);
      acc.passwordAcc = hashPasswordFromBcrypt;
      await acc.save();
      return resolve({
        errCode: 0,
        message: "get password success",
        data: acc
      });
    } catch (e) {
      reject(e);
    }
  })
}

let handleAuthorityLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExist = await checkEmail(email);
      // neu ton tai email thi check password
      let dataUser = {}
      if(!isExist){
        dataUser.errCode = 1,
        dataUser.errMessage = 'Your email not exit. Please try other!'
      }else{
      //check password
      // check user co ton tai tiep de tranh loi
        let user = await db.Account.findOne({
          attributes: ['emailAcc', 'passwordAcc', 'idAuth'],
          where: { emailAcc: email },
          raw: true
        })
        if (user) {
          let check = await bcrypt.compare(password, user.passwordAcc);
          if (check) {
            dataUser.errCode = 0;
            dataUser.errMessage = 'OK';
            delete user['passwordAcc'];
            dataUser.userInfo = user;
          } else {
            dataUser.errCode = 3,
              dataUser.errMessage = 'Wrong password'
          }
        }
        else {
          dataUser.errCode = 2,
          dataUser.errMessage = 'User not found!'
        }
      }
      resolve(dataUser)
    } catch (e) {
      reject(e)
    }
  })
}

let checkEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try{
      let user = await db.Account.findOne({
        where: { emailAcc: userEmail }
      })
      if(user) {
        resolve(true)
      }
      else {
        resolve(false)
      }
    }catch(e) {
      reject(e)
    }
  })
}

let handleCreateAcc = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(!data){
        return resolve({
          errCode:1,
          errMessage: "Missing input value!"
        })
      }
      if(!data.nameAcc||!data.emailAcc|| !data.passwordAcc){
        return resolve({
          errCode: 1,
          errMessage: "Missing input value!"
        })
      }
      let acc = await db.Account.findOne({
        where: {nameAcc: data.nameAcc, emailAcc: data.emailAcc}
      })
      if(acc){
        return resolve({
          errCode: 2,
          errMessage: "Your email is already in use"
        })
      }
      let hashPasswordFromBcrypt = await hashUserPassword(data.passwordAcc);
      if(!data.idAuth){
        data.idAuth = 3;
      }
      await db.Account.create({
        idAuth: parseInt(data.idAuth),
        nameAcc: data.nameAcc,
        emailAcc: data.emailAcc,
        passwordAcc: hashPasswordFromBcrypt
      })
      return resolve({
        errCode: 0,
        message: "Create account successfully!"
      });
    } catch (e) {
      reject(e)
    }
  })
}

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword)
    } catch (e) {
      reject(e)
    }
  })
}




let handleGetAcc = (id) => {
  return new Promise(async (resolve, reject) => {
  let users = '';
    try {
      if(!id){
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter!"
        })
      }
      if (id == 'All') {
        users = await db.Account.findAll();
      }
      if (id && id !== 'All') {
        let idAcc = parseInt(id);
        users = await db.Account.findOne({
          where: { id: idAcc },
          include: [
            {
              model: db.Authority,
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
      resolve({
        errCode: 0,
        message: "Get account successfully!",
        data: users
      })
    } catch (err) {
      reject(err)
    }
  })
}

let handleUpdateAcc = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter"
        })
      }
      let acc = await db.Account.findOne({
        where: { id: data.id },
        raw: false
      })
      if (!acc) {
        resolve({
          errCode: 2,
          errMessage: "Account not found!"
        })
      }
      acc.idAuth = data.idAuth? data.idAuth : acc.idAuth;
      acc.nameAcc = data.nameAcc? data.nameAcc : acc.nameAcc;
      acc.emailAcc = data.emailAcc? data.emailAcc: acc.emailAcc;
      //co the cho cap nhat mat khau lun hoac chia thanh th khac
      acc.password = data.passwordAcc==""? data.passwordAcc: acc.passwordAcc;
      await acc.save();
      // let accounts = await db.Account.findAll();
      resolve({
        errCode: 0,
        message: "Update Account Successfully!",
      })
    } catch (e) {
      reject(e)
    }
  })
}

let handleDeleteAcc= async(idAcc)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!idAcc){
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter!"
        })
      }
      let account = await db.Account.findOne({
        where: {id: idAcc},
        raw: false
      })
      if(!account){
        resolve({
          errCode: 2,
          errMessage: "Account not found!"
        })
      }
      await account.destroy();
      // let accounts = await db.Account.findAll();
      resolve({
        errCode:0,
        message: "Delete account successfully!"
      })
    }catch(e){
      reject(e);
    }
  })
}
module.exports = {
  handleUserLogin,
  handleChangePassword,
  handleForgotPassword,

  handleGetAcc,
  handleCreateAcc,
  handleUpdateAcc,
  handleDeleteAcc,
}