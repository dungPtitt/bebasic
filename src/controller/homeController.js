import pool from "../configs/connectDB";

  
let getHomePage = async (req, res)=> {
  // var data=[]
  // connection.query(
  //   'SELECT * FROM `users`',
  //   function(err, results, fields) {
  //     // console.log(results); // results contains rows returned by server
  //     results.map((row)=>{
  //       data.push({
  //         id:row.id,
  //         name: row.name,
  //         address: row.address,
  //         email: row.email
  //       })
  //     })
      // res.render("index.ejs", {dataUser: data})
  //   }

  // );
  const [rows, fields] = await pool.execute('SELECT * FROM `users`',);
  res.render("index.ejs", {dataUser: rows})
}

let getAboutPage = (req, res)=> {
  res.render("about.ejs")
}

module.exports = {
  getHomePage,
  getAboutPage
}