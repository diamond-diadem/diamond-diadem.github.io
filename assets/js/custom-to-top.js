const topButton = document.getElementById('totopbutton');

if (topButton !== null) {
  topButton.classList.remove('show');
  window.onscroll = function() {
    scrollFunction()
  };

  topButton.addEventListener('click', topFunction);
}

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topButton.classList.add('show');
  } else {
    topButton.classList.remove('show');
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
