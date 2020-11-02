//change background on subMenu hover
$("#nav-first-bg").hover(function(){
     	 	$(this).css("background","url(images/home-bg.jpg) no-repeat center center");
     	 	$(this).css("background-size","auto 100%");
 		});
		 $("#nav-second-bg").hover(function(){
     	 	$(this).css("background","url(images/office-building.jpg) no-repeat center center");
     	 	$(this).css("background-size","auto 100%");
 		});
		 $("#nav-third-bg").hover(function(){
     	 	$(this).css("background","url(images/flying.jpg) no-repeat center center");
     	 	$(this).css("background-size","auto 100%");
 		});


$(".nav-first a").mouseover(function() {
    $(".nav-first-img").attr("src", "images/home.svg");
})
.mouseout(function() {
    $(".nav-first-img").attr("src", "images/home-color.svg");
});

$(".nav-second a").mouseover(function() {
    $(".nav-second-img").attr("src", "images/briefcase.svg");
})
.mouseout(function() {
    $(".nav-second-img").attr("src", "images/briefcase-color.svg");
});

$(".nav-third a").mouseover(function() {
    $(".nav-third-img").attr("src", "images/airplane.svg");
})
.mouseout(function() {
    $(".nav-third-img").attr("src", "images/airplane-color.svg");
});