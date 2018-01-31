$(function() {
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: false,//可选选项，自动滑动
        autoplay: 2000,
        loop: true,
        preventClicks : false,//默认true
        autoplayDisableOnInteraction : false,
        // 如果需要分页器
        pagination: '.swiper-pagination',
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
    })
    mySwiper.stopAutoplay();
    // $('.swiper-container .swiper-slide').mouseenter(function () {
    //     mySwiper.stopAutoplay();
    // });
    // $('.swiper-container .swiper-slide').mouseleave(function () {
    //     mySwiper.startAutoplay();
    // });

    // 移动端移动到计算器位置
    $(".go-fee-wrap").click(function() {
        $("html, body").animate({scrollTop: $("#mobFeeWrap").offset().top-50 }, 500);
    });

    // 下载
    $('.download-app').click(function() {
        $('.download-app-wrap').fadeIn(500)
    });
    $('.download-app-wrap .container').click(function(e){
        e.stopPropagation();
    });
    $('.download-app-wrap').click(function(){
        $('.download-app-wrap').fadeOut(500)
    });

    // 计算器
    var feeObj = [
        {
            value: 1000,
            repayments10: 100,
            repayments15: 66.67,
            repayments20: 50,
            fee10: 16.8,
            fee15: 21.8,
            fee20: 26.8
        },
        {
            value: 3000,
            repayments10: 300,
            repayments15: 200.00,
            repayments20: 150,
            fee10: 30.4,
            fee15: 35.4,
            fee20: 40.4	
        },
        {
            value: 5000,
            repayments10: 500,
            repayments15: 333.33,
            repayments20: 250,
            fee10: 44,
            fee15: 49,
            fee20: 54
        },
        {
            value: 10000,
            repayments10: 1000,
            repayments15: 666.67,
            repayments20: 500,
            fee10: 78,
            fee15: 83,
            fee20: 88
        },
        {
            value: 20000,
            repayments10: 2000,
            repayments15: 1333.33,
            repayments20: 1000,
            fee10: 146,
            fee15: 151,
            fee20: 156
        },
        {
            value: 30000,
            repayments10: 3000,
            repayments15: 2000.00,
            repayments20: 1500,
            fee10: 214,
            fee15: 219,
            fee20: 224
        },
        {
            value: 50000,
            repayments10: 5000,
            repayments15: 3333.33,
            repayments20: 2500,
            fee10: 350,
            fee15: 355,
            fee20: 360
        }
    ]
    // 滑块
    var ScrollBar = {
        value: 1,
        values: Array.from({length:100}, (v,k) => k+1),
        data: 1,
        initX: 0,
        currentIdx: 0,
        Initialize: function (callback) {
            this.getInitX();
            var $scrollBar = $('.scroll-bar-wrap');
            $scrollBar.find(".track").css("width", this.initX + 4 + "px");
            $scrollBar.find(".thumb").css("margin-left", this.initX + "px");
            $scrollBar.find('.txt').html(this.value)
            this.Value();
        },
        Value: function (callback) {
            var valite = false;
            var currentX;
            var scrollBarWidth = $("#scrollBar").width()
            var $thumb = $('.scroll-bar-wrap .thumb')
            var $track = $('.scroll-bar-wrap .track')
            var $txt = $('#scrollBar .txt')
            $('.scroll-bar-wrap .scrollbar').click(function(e) {
                console.log($('.scroll-bar-wrap .track').offset().left, $('.scroll-bar-wrap .track').parents('.fee-slider').offset().left, $('.scroll-bar-wrap .track').offset().left - $('.scroll-bar-wrap .track').parents('.fee-slider').offset().left)
                var startX = $track.offset().left;
                currentX = e.clientX - startX - 15;
                $thumb.css("margin-left", currentX + "px");
                $track.css("width", currentX + 4 + "px");
                if (currentX >= scrollBarWidth) {
                    currentX = scrollBarWidth
                    $thumb.css("margin-left", currentX + "px");
                    $track.css("width", currentX + 4 + "px");
                    ScrollBar.value = ScrollBar.values[ScrollBar.values.length-1];
                }else if(currentX <= 0){
                    currentX = 0
                    $thumb.css("margin-left", "0px");
                    $track.css("width", "0px");
                    ScrollBar.value = ScrollBar.values[0]
                }else{
                    var itemW = scrollBarWidth / ScrollBar.values.length;
                    ScrollBar.currentIdx = (currentX % itemW) > 0 ? Math.floor((currentX / itemW)) : (Math.floor(currentX / itemW) - 1)
                    ScrollBar.value = ScrollBar.values[ScrollBar.currentIdx]
                }
                $txt.html(ScrollBar.value);
                ScrollBar.resetrepaymentsHtml(ScrollBar.currentIdx)
                ScrollBar.initX = currentX;
            })
            $(".scroll-bar-wrap .thumb").on('mousedown touchstart', function (e) {
                e.stopPropagation();
                valite = true;
                var startX = e.clientX
                $(document.body).on('mousemove touchmove', function (event) {
                    if (valite == false) return;
                    var changeX = event.clientX - startX;
                    currentX = changeX + ScrollBar.initX
                    console.log('currentX',currentX, changeX, ScrollBar.initX)
                    $thumb.css("margin-left", currentX + "px");
                    $track.css("width", currentX + 4 + "px");
                    // 超过最大
                    if ((currentX + 25) >= scrollBarWidth) {
                        currentX = scrollBarWidth
                        $thumb.css("margin-left", currentX - 20 + "px");
                        $track.css("width", (currentX - 4) + "px");
                        ScrollBar.value = ScrollBar.values[ScrollBar.values.length-1];
                    } else if (currentX <= 0) {
                        currentX = 0
                        $thumb.css("margin-left", "0px");
                        $track.css("width", "0px");
                        ScrollBar.value = ScrollBar.values[0]
                    } else {
                        var itemW = scrollBarWidth / ScrollBar.values.length;
                        ScrollBar.currentIdx = (currentX % itemW) > 0 ? Math.floor((currentX / itemW)) : (Math.floor(currentX / itemW) - 1)
                        ScrollBar.value = ScrollBar.values[ScrollBar.currentIdx]
                    }
                    $txt.html(ScrollBar.value);
                    ScrollBar.resetrepaymentsHtml(ScrollBar.currentIdx)
                });
                $(document.body).on('mouseup touchend', function () {
                    ScrollBar.value = ScrollBar.values[ScrollBar.currentIdx]
                    valite = false;
                    if (ScrollBar.value >= ScrollBar.maxValue){
                        ScrollBar.value = ScrollBar.values[ScrollBar.values.length-1];
                    } else if (ScrollBar.value <= 0) {
                        ScrollBar.value = ScrollBar.values[0]
                    } else {
                        $txt.html(ScrollBar.value)
                    }
                    console.log('mouseup',currentX)
                    ScrollBar.initX = currentX;
                    ScrollBar.resetrepaymentsHtml(ScrollBar.currentIdx)
                });
            });
        },
        getInitX: function () {
            for(var i = 0, l = this.values.length; i < l; i++){
                if(this.values[i] > this.value && i > 0){
                    this.initX = $(".scroll-bar-wrap").width() * (i / l);
                    return
                }
            }
        },
        resetrepaymentsHtml: function(index) {
            var repaymentsHtml = '<span>还款周转金(元)</span>';
            repaymentsHtml += '<span>'+this.data[index].repayments10+'</span>' ;
            repaymentsHtml += '<span>'+this.data[index].repayments15+'</span>' ;  
            repaymentsHtml += '<span>'+this.data[index].repayments20+'</span>';
            $('.fee-wrap .table-wrap .repayments').html(repaymentsHtml);
            var feeHtml = '<span>手续费(元)</span>';
            feeHtml += '<span>'+this.data[index].fee10+'</span>' ;
            feeHtml += '<span>'+this.data[index].fee15+'</span>' ;  
            feeHtml += '<span>'+this.data[index].fee20+'</span>';
            $('.fee-wrap .table-wrap .fee').html(feeHtml);
        }
    }
    // 设置滑块取值区间
    ScrollBar.values = feeObj.map(function (elem) {
        return elem.value;
    });
    // 设置初始值
    ScrollBar.value = feeObj[0].value;
    // 设置数据
    ScrollBar.data = feeObj;
    // 初始化滑块
    ScrollBar.Initialize()
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
    // 地区选择
    $('[data-select]').click(function(e){
        var $this = $(this)
        var defaulValue = $this.val();
        var $options = $this.siblings('[data-option]');
        $.getJSON('/lib/jquery/city.min.js',function(json){
            var provincesList = json.citylist;
            var html = ''
            $options.html(html);
            console.log($this.attr(name));
            if($this.attr('name') === 'province'){
                for(var i = 0, len = provincesList.length; i < len; i++){
                    if(provincesList[i].p == defaulValue){
                        html += '<li class="active">'+provincesList[i].p+'</li>';
                    }else{
                        html += '<li>'+provincesList[i].p+'</li>';
                    }
                }
            }else{
                var province = $('input[name="province"]').val()
                for(var i = 0, len = provincesList.length; i < len; i++){
                    if(provincesList[i].p === province){
                        for(var j = 0, l = provincesList[i].c.length; j < l; j++){
                            if(provincesList[i].c[j].n == defaulValue){
                                html += '<li class="active">'+provincesList[i].c[j].n+'</li>';
                            }else{
                                html += '<li>'+provincesList[i].c[j].n+'</li>';
                            }
                        }
                    }
                }
            }
            $options.html(html);
            $options.show();
            $('[data-option] li').click(function(){
                var value = $(this).html();
                var $option = $(this).parents('[data-option]')
                $option.hide()
                $option.siblings('[data-select]').val(value);
                if($this.attr('name') === 'province'){
                    // 重新选择了省份就要把城市置空
                    defaulValue != value && $('input[name="city"]').val('请选择城市')
                }
            });
        })
        e.stopPropagation();
    });
    $(document.body).click(function(){
        $('[data-option]').hide();
    });

    //柱状图标
    var cardList = [
        {label: '2017',value: 6.91},
        {label: '2018E',value: 7.84},
        {label: '2019E',value: 8.87},
        {label: '2020E',value: 10.07},
        {label: '2021E',value: 11.3}
    ]
    getCardListCanvas('cardList', cardList)
})
function getCardListCanvas(dom, obj){
    var c=document.getElementById(dom);
    var ctx=c.getContext("2d"); 
    var w = c.clientWidth, h = c.clientHeight, max, inter = 2, step, left = 15, bottom = 15, top = 10;
    c.width = ctx.width = w;
    c.height = ctx.height = h;

    w = c.clientWidth - left;
    h = c.clientHeight - bottom - top;
    
    
    var yList = obj.map(function(ele){
        return ele.value;
    })
    var xList = obj.map(function(ele){
        return ele.label;
    })
    
    max = Math.max.apply(Math, yList);
    step = ~~(max/inter)
    max = (max % inter > 0) ? (step + 1) * inter : step * inter;

    ctx.beginPath();
    ctx.lineWidth = .5;
    ctx.strokeStyle = '#ccc';
    // 画y轴
    for(var i = 0; i < step + 2; i++){
        y = (h/(step+1))*i + top;
        ctx.moveTo(left, y);
        ctx.lineTo(w, y);
        ctx.font="10px Arial right";
        ctx.fillStyle="#666";
        ctx.fillText((step+1-i)*inter,0,y + 3);
    }
    ctx.stroke();
    // 画X轴
    for(var i = 0, len = obj.length; i < len; i++){
        x = w/len * i + w/len/2;
        y = (max - obj[i].value) / max * h + top;
        val = obj[i].value / max * h
        ctx.font = "10px Arial right";
        ctx.fillStyle="#666";
        ctx.fillText(obj[i].label,x,h+top+bottom);

        var grd=ctx.createLinearGradient(x-w/len/8, y, x-w/len/8, h);
        grd.addColorStop(0,"#70a5db");
        grd.addColorStop(1,"#438ac9");
        ctx.fillStyle=grd;
        ctx.fillRect(x-w/len/8, y, w/len/2,val); 

        ctx.font = "10px Arial right";
        ctx.fillStyle="#404040";
        ctx.fillText(obj[i].value,x,y-5);
    }
}