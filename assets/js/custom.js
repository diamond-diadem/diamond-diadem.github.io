const topButton = document.getElementById("topbutton");

if (topButton !== null) {
  topButton.classList.remove('fade');
  window.onscroll = function() {
    scrollFunction()
  };

  topButton.addEventListener('click', topFunction);
}

function scrollFunction() {
  if (document.body.scrollTop > 270 || document.documentElement.scrollTop > 270) {
    topButton.classList.remove('fade');
  } else {
    topButton.classList.add('fade');
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}