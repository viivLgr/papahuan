$(function() {
    $(".header-wrap").load("./common/header.html");
    $(".footer-wrap").load("./common/footer.html");
});
// 提示信息
function showMsg(msg){
    var html = '<p class="layer-msg">'+msg+'</p>'
    $(document.body).append(html);
    setTimeout(function(){
        $('.layer-msg').animate({opacity:"0"}, 1000);
    }, 1000)
    setTimeout(function(){
        $('.layer-msg').remove();
    }, 2000)
}