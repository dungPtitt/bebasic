import pool from "../configs/connectDB";

  
let getHomePage = async (req, res)=> {
  const [rows, fields] = await pool.execute('SELECT * FROM `users`',);
  res.render("index.ejs", {dataUser: rows})
}

let getAboutPage = (req, res)=> {
  res.send("Hello from about page")
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

module.exports = {
  getHomePage,
  getAboutPage,
  getDetailUser,
  createUser,
  deleteUser,
  editUser,
  updateUser
}