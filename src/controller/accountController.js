

let getAllAcc = (req, res)=> {
  res.send("Hello from about page");
  // res.render("about.ejs")
}

let createAcc = (req, res)=>{
  res.render("home.ejs");
}

module.exports = {
  getAllAcc,
}