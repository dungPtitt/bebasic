let getMemberPage = async (req, res)=>{
  try{
    // let response = await accountService.handleGetAcc("All");
    // if(response.errCode===0){
    //   res.render("account.ejs", {data: response.data});
    // }
    return res.render("manage/ManagerPage.ejs");
  }catch(e){
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

module.exports = {
  getMemberPage,
}