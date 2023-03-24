import accountService from "../services/accountService";
let getHomePage = async (req, res)=> {
  // let conn = await pool;
  // await conn.request().query('SELECT * FROM `users`', (err, data)=>{
  //   console.log("check>>", data);
  //   // res.render("index.ejs", {dataUser: data})
  // })

  // const [rows, fields] = await pool.execute('SELECT * FROM `users`',);
  res.render("home.ejs");
}
let testApi = async(req, res)=>{
  try{
    let data = await accountService.handleTestApi();
    res.status(200).json({
      errCode: 0,
      errMessage: "Get data successfully!",
      data: data
    })
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}
let getAllAcc = async (req, res)=>{
  try{
    let response = await accountService.handleGetAcc();
    res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errorCode: -1,
      errorMessage: "Error from server!"
    })
  }
}
let createSlide = async (req, res)=>{
  try{
    let data = req.body;
    let response = await accountService.handleCreateSlide(data);
    res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errorCode: -1,
      errorMessage: "Error from server!"
    })
  }
}

let getAboutPage = (req, res)=> {
  res.render("login.ejs");
  // res.render("about.ejs")
}
let getDetailUser = async(req, res)=> {
  // res.send("hello from page detail"+ req.params.userId)
  const userId = req.params.userId;
  const user = await pool.execute("select * from users where id= ?", [userId])
  // console.log(user[0])
  res.render("about.ejs", {user: JSON.stringify(user[0])})
}

let createUser = async(req, res)=> {
  // console.log(req.body)
  const {name, email, address} = req.body;
  await pool.execute("insert into users(name, email, address) values(?, ?, ?)", [name, email, address])
  res.redirect("/")
}
let deleteUser = async (req, res)=> {
  const userId = req.body.id;
  console.log(userId)
  // await pool.execute("delete from users whrere id = ?", [userId])
  // await pool.execute("insert into users(name, email, address) values(?, ?, ?)", [name, email, address])
  res.redirect("/")
}

let editUser = async(req, res)=> {
  const userId = req.params.id;
  const [user] = await pool.execute("select * from users where id = ?", [userId])
  console.log(user[0])
  res.render("update.ejs", {dataUser: user[0]})
}

let updateUser = async (req, res)=> {
  // const userId = req.body.id;
  const {id, name, email, address} = req.body;
  // console.log(id)
  console.log(req.body)
  // goi de update user
  // await pool.execute("update users(name, email, address) where id=?", [name, email, address, id])
  res.send("hello from update")
}
let loginPage = async (req, res)=>{
  try{
    res.render("login.ejs");
  //   let data = req.body;
  //   // let response = await homeService.handleUserLogin(data.email, data.password);
  //   console.log("data: ", response);
  //   if(response.errCode==0){
  //     switch (response.idAuth) {
  //       case 1:
  //         res.redirect("/admin");
  //         break;
  //       case 2:
  //         res.render("manager/home.ejs");
  //         break;
  //       case 3:
  //         res.render("member/home.ejs");
  //         break;
  //       default:
  //         res.render("login.ejs");
          
  //         break;
  //     }
  //   }else{
  //     res.render("login.ejs", {data: JSON.stringify(response.errMessage)});
  //   }
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

module.exports = {
  getHomePage,
  getAboutPage,
  getDetailUser,
  createUser,
  deleteUser,
  editUser,
  updateUser,
  getAllAcc,
  createSlide,
  loginPage,
  testApi
}

