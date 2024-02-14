const topButton = document.getElementById('toTop');

if (topButton !== null) {
  topButton.classList.remove('fade');
  window.onscroll = function() {
    scrollFunction()
  };

  topButton.addEventListener('click', topFunction);
}

function scrollFunction() {
  if (document.body.scrollTop > 270 || document.documentElement.scrollTop > 270) {
    topButton.classList.add('fade');
  } else {
    topButton.classList.remove('fade');
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


// $(document).ready(function() {
//     $(window).scroll(function() {
//         if($(this).scrollTop() > 100){
//             $('#toTop').stop().animate({
//                 top: '20px'    
//                 }, 500);
//         }
//         else{
//             $('#toTop').stop().animate({
//                top: '-100px'    
//             }, 500);
//         }
//     });
//     $('#toTop').click(function() {
//         $('html, body').stop().animate({
//            scrollTop: 0
//         }, 500, function() {
//            $('#toTop').stop().animate({
//                top: '-100px'    
//            }, 500);
//         });
//     });
// });   
