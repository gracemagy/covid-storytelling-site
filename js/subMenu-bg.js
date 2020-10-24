//change background on subMenu hover
$("#nav-first-bg").hover(function(){
     	 	$(this).parent().css("background","url(images/home-bg.jpg) no-repeat center center");
     	 	$(this).parent().css("background-size","auto 100%");
 		});
		 $("#nav-second-bg").hover(function(){
     	 	$(this).parent().css("background","url(images/office-building.jpg) no-repeat center center");
     	 	$(this).parent().css("background-size","auto 100%");
 		});
		 $("#nav-third-bg").hover(function(){
     	 	$(this).parent().css("background","url(images/singapore-map.jpg) no-repeat center center");
     	 	$(this).parent().css("background-size","auto 100%");
 		});

    $(document).mousemove(function(){
         if($(".nav-background").length != 0){
 			$(".nav-cta-text").hide().delay(200);
        } else{
            $(".nav-cta-text").show();
        }
    });