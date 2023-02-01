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
module.exports = {
  getHomePage,
  getAboutPage,
  getDetailUser
}