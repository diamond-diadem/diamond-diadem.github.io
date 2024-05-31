const topButton = document.getElementById('totopbutton');

if (topButton !== null) {
  topButton.classList.remove('fade');
  window.onscroll = function() {
    scrollFunction()
  };

  topButton.addEventListener('click', topFunction);
}

function scrollFunction() {
  if (document.body.scrollTop < 30 || document.documentElement.scrollTop < 30) {
    topButton.classList.remove('fade');
  } else {
    topButton.classList.add('fade');
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
