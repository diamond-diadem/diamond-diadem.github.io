const topButton = document.getElementById('totopbutton');

if (topButton !== null) {
  topButton.classList.remove('fade');
  window.onscroll = function() {
    scrollFunction()
  };

  topButton.addEventListener('click', topFunction);
}

function scrollFunction() {
  if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
    topButton.classList.remove('fade');
  } else {
    topButton.classList.add('fade');
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
