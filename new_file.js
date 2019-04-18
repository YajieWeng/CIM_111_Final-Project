!function($){
  
  var defaults = {
    sectionContainer: "> section",
    angle: 50,
    opacity: true,
    scale: true,
    outAnimation: true
	};
	

  $.fn.tiltedpage_scroll = function(options){
    var settings = $.extend({}, defaults, options),
        el = $(this);
        
    el.find(settings.sectionContainer).addClass("tps-section");
    
    el.find('.tps-section').each(function(){
      var el2 = $(this); 
      el2.wrapInner("<div class='tps-wrapper'></div>");
    });
    
    function isElementInViewport (el3) {
      var docViewTop = $(window).scrollTop(),
          docViewBottom = docViewTop + $(window).height(),
          elemTop = el3.offset().top,
          elemBottom = elemTop + el3.outerHeight(true);
          
      return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) );
    }
  
    function elementVisibilityMayChange (el4) {
      
      if ( isElementInViewport(el4) ) {
        el4.addClass("tps-inview")
      } else {
        el4.removeClass("tps-inview")
      }
    }
    
   
  
    $(window).on('DOMContentLoaded load resize scroll', function() {
      el.find(settings.sectionContainer).each(function(){
        elementVisibilityMayChange($(this));
      });

      
      el.find('.tps-section.tps-inview > .tps-wrapper').each(function(index){
        var el2 = $(this),
            opacity = 0,
            st = $(window).scrollTop(),
            deg = ((el2.parent().offset().top - el2.parent().height()) - st) / $(window).height() * (settings.angle * 3),
            scale = ((st + $(window).height() - (el2.parent().offset().top - el2.parent().height())) / ($(window).height() )) ;
            if(scale > 1) scale = 1;
            if(deg < 0) deg = 0;
            
        if(st > el2.parent().offset().top) {

          if (settings.outAnimation == false) {
            opacity = 1;
            if(opacity < 0) opacity = 0;
            if (deg < 0) deg = 0;
          } else {
            opacity = ((el2.parent().offset().top + ($(window).height() * 1.2) - st)) / ($(window).height());	
            opacity = Math.pow(opacity,25);
            deg = (el2.parent().offset().top - st) / $(window).height() * (settings.angle * 3);
            scale = ((st + $(window).height() - el2.parent().offset().top ) / ($(window).height() )) ;
          }
          
          
        } else {
        	if(index != 0) {
          	var opacity = ((st + $(window).height() - el2.parent().offset().top + (el2.height()/2))/ $(window).height());

        		if(opacity > 1) { opacity = 1; }
				
        	} else {
        		opacity = 1;
            deg = 0;
            scale = 1;
        	}
        }
        
        if (settings.scale == false) scale = 1;
        if (settings.angle == false) deg = 0;
        if (settings.opacity == false) opacity = 1;
        
        el2.css({
          'transform': 'rotateX(' + deg + 'deg) scale('+scale+', '+scale+')',
          opacity: opacity
        });
      });
    }); 

  }
  
  
}(window.jQuery);


function leftTimer(year,month,day,hour,minute,second){
        var timer = null,
            leftTime = (new Date(year,month-1,day,hour,minute,second)) - (new Date()), 
            days = parseInt(leftTime / 1000 / 60 / 60 / 24  , 10), 
            hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10),
            minutes = parseInt(leftTime / 1000 / 60 % 60, 10),
            seconds = parseInt(leftTime / 1000 % 60, 10);
        days = checkTime(days);
        hours = checkTime(hours);
        minutes = checkTime(minutes);
        seconds = checkTime(seconds);
        $(".days").html(days);
        $(".hours").html(hours);
        $(".minutes").html(minutes);
        $(".seconds").html(seconds);
    }
    function move() {
        timer =setInterval(function () {
            leftTimer(2019,06,01,12,00,00); 
            var day = parseInt($(".days").html()),
                hour = parseInt($(".hours").html()),
                minute = parseInt($(".minutes").html()),
                second = parseInt($(".seconds").html());
        
            if( day === 0 && hour === 0&& minute === 0 && second === 0 ){
                $(".timeContainer").css("display","none");
                clearTimeout(timer);
            }
        },1000)
    }
    function checkTime(i){ 
        if(i<10){
            i = "0" + i;
        }
        return i;
    }
       move();
       




$(function () {
    var $menu = $(".menu"), $menuLi = $menu.find("li"), $current = $menu.find('.current'), $li_3 = $menu.find('li.li_3'), $li_3_content = $li_3.find('.li_3_content');
    $menuLi.hover(function () {
        var $this = $(this), num = $menuLi.index($this), current = $menuLi.index($(".first")), len = current - num;
        $menu.css("background-position", (101 * current) + "px" + " bottom");
        $current.removeClass("lihover");
        $menuLi.removeClass("first");
        $this.addClass("first");
        if (len <= 0) {
			len = -len;
		};
        if (num != 4) {
            $menu.stop().animate({ backgroundPosition: (101 * num) + "px" + " bottom" }, 100 * len);
        }
        else {
            $menu.stop().animate({ backgroundPosition: (101 * num + 30) + "px" + " bottom" }, 100 * len);
        }
    });
    $li_3.hover(function () {
        $li_3_content.stop(true, true).fadeIn(0);
    }, function () {
        $li_3_content.fadeOut(500, function () {
            $li_3_content.css("display", "none");
        });
    });
    $menu.mouseleave(function () {
        var $this = $(this), num = $menuLi.index($this), current = $menuLi.index($current), len = current - num;
        $menuLi.removeClass("first");
        $current.addClass("first");
        if (len <= 0) { len = -len; };
        $menu.stop().animate({ backgroundPosition: (100 * current + 1) + "px" + " bottom" }, 100 * len);
    });
    $("a.noclick").click(function (event) {
        event.preventDefault();
    });
});
