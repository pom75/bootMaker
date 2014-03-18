var timer = new Object;
var cpt = 0;
var bool = true;
function slider(){
		if(bool){
			nextSlide();
		}else{
			prevSlide();
		}
	cpt++;
	if(cpt > 1){
		if(bool){
			bool=false;
		}else{
			bool=true;
		}
		cpt =0;
	}
	timer = window.setTimeout(slider,3000);
}

function start(){
	window.clearTimeout(timer);
	timer = window.setTimeout(slider,3000);
	cpt = 0;
	bool = true;
}

function ChangeImage(url) {
			document.getElementById("change").src = url;
}


function nextSlide(){
	var $Slides = $("#slides");
	$("#nextSlide").unbind("click",nextSlide);
	$Slides.animate(
		{marginLeft:"-=480px"},
		1000,
		function(){
				$Slides.data("currentSlide",$Slides.data("currentSlide")+1);
				if($Slides.data("currentSlide") > $Slides.data("nbSlides")){
					$Slides
						.data("currentSlide",1)
						.css({marginLeft:"-480px"});
				}
				window.clearTimeout(timer);
				timer = window.setTimeout(slider,3000);
				$("#nextSlide").bind("click",nextSlide);
			}
	);
}

function prevSlide(){
	var $Slides = $("#slides");
	$("#prevSlide").unbind("click",prevSlide);
	$Slides.animate(
		{marginLeft:"+=480px"},
		1000,
		function(){
				$Slides.data("currentSlide",$Slides.data("currentSlide")-1);
				if($Slides.data("currentSlide") == 0){
					$Slides
						.data("currentSlide",$Slides.data("nbSlides"))
						.css({marginLeft:-(480*$Slides.data("currentSlide"))});
				}
				window.clearTimeout(timer);
				timer = window.setTimeout(slider,3000);
				$("#prevSlide").bind("click",prevSlide);
			}
	);
}


$(function(){
	cpt = 0;
	var $Slides = $("#slides");
	var _step = $Slides.find("li:first").width();
	$Slides
		.data("currentSlide",1)
		.data("nbSlides",$Slides.find("li").size());
	$Slides
		.find("li:last")
			.clone()
			.prependTo("#slides");

	$Slides
		.find("li:first")
			.next()
			.clone()
			.appendTo("#slides");

	$Slides		
		.find("li:first")
			.addClass("clone")
		.end()
		.find("li:last")
			.addClass("clone")
		.end()
		.css({marginLeft:-_step});

	$Slides.width($Slides.find("li").size()*_step);
	
	$("#nextSlide").bind("click",nextSlide);
	$("#prevSlide").bind("click",prevSlide);
	
	timer = window.setTimeout(slider,3000);
	
})