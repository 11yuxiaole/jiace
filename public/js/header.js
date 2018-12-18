$(function() {
    $(".main").click(function() {
        $("#qrcode").fadeIn();
        $(".wechatbg").fadeIn();
    });
    $(".wechatbg").click(function() {
        $(".wechatbg").fadeOut();
        $("#qrcode").fadeOut();
    })

});