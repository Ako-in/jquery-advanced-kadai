$(function(){
  $('.button-more').on('mouseover',function(){
    $(this).animate({
      opacity:0.5,
      marginLeft:20,
    },100);
  });
  
  $('.button-more').on('mouseout',function(){
    $(this).animate({
      marginLeft:0,
      opacity:1.0,
    },100);
  })
});

$('.carousel').slick({
  autoplay:true,
  dots:true,
  indinite:true,
  autoplaySpeed:5000,
  arrows:false,
});