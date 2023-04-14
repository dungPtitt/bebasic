import db from "../models/index";
const jwt = require('jsonwebtoken');
import bcrypt from 'bcryptjs';
let salt = bcrypt.genSaltSync(10);


let handleLogin = (data)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      let email = data.email;
      let password = data.password;
      if(!email){
        return resolve({
          errCode: 5,
          errMessage: "Missing input email!"
        })
      }
      if(!password){
        return resolve({
          errCode: 6,
          errMessage: "Missing password"
        })
      }
      let isExist = await checkEmail(email);
      // neu ton tai email thi check password
      if(!isExist){
        return resolve({
          errCode: 1,
          errMessage: "Your email not exit. Please try again!"
        })
      }
      let acc = await db.Account.findOne({
        where: { emailAcc: email },
        attributes: ['emailAcc', 'idAuth', 'passwordAcc'],
        raw: true
      })
      if(!acc){
        return resolve({
          errCode: 1,
          errMessage: "Your email not exit. Please try again!"
        })
      }
      let check = await bcrypt.compare(password, acc.passwordAcc);
      if(!check){
        return resolve({
          errCode: 2,
          errMessage: "Wrong password. Please try again!"
        })
      }
      let token = jwt.sign({ email: data.email }, 'mk', {expiresIn: 100});
      return resolve({
        errCode: 0,
        errMessage: "Valided",
        data: token
      })
    }catch(e){
      return reject(e);
    }
  });
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

let verifyToken = (token)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      // console.log(token);
      if(!token){
        return resolve({
          errCode: 1,
          errMessage: "Login Failed"
        })
      }
      let result = jwt.verify(token, 'mk');
      if(result){
        let acc = await db.Account.findOne({
          where: { emailAcc: result.email },
          raw: true
        })
        return resolve({
          errCode: 0,
          data: {idAuth: acc.idAuth},
          errMessage: "Login Successfully!"
        })
      }
      return resolve({
        errCode: 1,
        errMessage: "Login Failed"
      })
    }catch(e){
      reject(e);
    }
  });  
}


let checkAuth = (token)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      // console.log(token);
      if(!token){
        return resolve({
          errCode: 1,
          errMessage: "Login Failed"
        })
      }
      let result = jwt.verify(token, 'mk');
      console.log(result);
      return resolve({});
      // if(result){
      //   let acc = await db.Account.findOne({
      //     where: { emailAcc: result.email },
      //     raw: true
      //   })
      //   return resolve({
      //     errCode: 0,
      //     data: {idAuth: acc.idAuth},
      //     errMessage: "Login Successfully!"
      //   })
      // }
      // return resolve({
      //   errCode: 1,
      //   errMessage: "Login Failed"
      // })
    }catch(e){
      reject(e);
    }
  });  
}

module.exports = {
  handleLogin,
  verifyToken,
  checkAuth,
}