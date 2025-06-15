const topButton = document.getElementById('totopbutton');

if (topButton !== null) {
  topButton.classList.remove('fade');
  window.addEventListener('scroll', scrollFunction);
  topButton.addEventListener('click', topFunction);
}

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    topButton.classList.add('fade');
  } else {
    topButton.classList.remove('fade');
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

