const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.post("/signin",(req,res)=>{
    var phone=req.body.phone;
    var acode=req.body.acode;
    var dcode=req.body.dcode;
    console.log(phone,acode,dcode);
    pool.query(
        "select * from jiace_login where phone=? and acode=? and dcode=?",
        [phone,acode,dcode],
        (err,result)=>{
            if(err) console.log(err);
            console.log(result);
            if(result.length>0){
              res.writeHead(200);
              var user=result[0];
              req.session.uid=user.id;
              res.write(JSON.stringify({
                  OK:1,
                  msg:"登陆成功"
              }))
            }else{
                res.write(JSON.stringify({
                    OK:0,
                    msg:"用户名或密码错误"
                }))
            }
            res.send();
        }
    )
})
router.get("/islogin",(req,res)=>{
    res.writeHead(200);
    if(req.session.uid===undefined){
        res.write(JSON.stringify({ok:0}))
        res.send();
    }else{
        var id=session.uid;
        var sql="select * from jiace_login where id=?"
        pool.query(sql,(err,result)=>{
            console.log(result)
            console.log(123123)
            if(err) console.log(err);
            var user=result[0];
            res.write(JSON.stringify({
                ok:1,uname:user.phone
            }))
            res.send()
        }) 
    }
})
router.get("/signout",(req,res)=>{
    res.session["id"]=undefined;
    res.send();
})
module.exports=router;