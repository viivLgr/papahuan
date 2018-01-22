var mySwiper = new Swiper('.swiper-container', {
    autoplay: true,//可选选项，自动滑动
    width: window.innerWidth,
    autoplay: 2000
})
$(function() {
    $('.video-wrapper').hover(function(){
        $('.control').animate({'opacity': 1}, 50)
    },function(){
        $('.control').animate({'opacity': 0}, 50)
    })
    $('.switch').click(function(){
        if(!$(this).hasClass('pause')){
            $(this).addClass('pause');
            $('#player').trigger('play');
        }else{
            $(this).removeClass('pause');
            $('#player').trigger('pause');
        }
    })
    $('[data-select]').click(function(e){
        var $options = $(this).siblings('[data-option]');
        $options.show();
        e.stopPropagation();
    });
    $('[data-option] li').click(function(){
        var value = $(this).html();
        var $option = $(this).parents('[data-option]')
        $option.hide()
        $option.siblings('[data-select]').val(value);
    });
    $(document.body).click(function(){
        $('[data-option]').hide();
    });
    $.getJSON('/lib/jquery/city.min.js',function(json){
        console.log('city',city);
    })
})