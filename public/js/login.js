$("#phone").focus(function() {
  $("#fu").hide();
});
$("#phone").blur(function() {
  var uname = $("#phone").val();
  if (uname.length <= 0) {
    $("#fu").show();
  } else {
    $("#fu").hide();
  }
});
    $("#yan").focus(function() {
  $("#yan_one").hide();
});
$("#yan").blur(function() {
  var uname = $("#yan").val();
  if (uname.length <= 0) {
    $("#yan_one").show();
  } else {
    $("#yan_one").hide();
  }
});
    $("#yan_du").focus(function() {
  $("#yan_xin").hide();
});
$("#yan_du").blur(function() {
  var uname = $("#yan_du").val();
  if (uname.length <= 0) {
    $("#yan_xin").show();
  } else {
    $("#yan_xin").hide();
  }
});
$(function(){//login.html中jquery-3.2.1.js
  $("input.login1").click(function(){
    var phone=$("input.phone").val();
    var acode=$("input.acode").val();
    var dcode=$("input.dcode").val();
    (async function(){
      var res=await $.ajax({
        url:"http://localhost:3001/users/signin",
        type:"post",
        data:{phone,acode,dcode},
        dataType:"json"
      })
      if(res.ok==0)
        alert(res.msg);
      else{
        alert("登录成功！即将返回来时的页面...")
        if(location.search.startsWith("?back=")){
          var url=location.search.slice(6)
        }else{
          var url="indexShow.html"
        }
        location.href=url;
      }
    })()
  })
})