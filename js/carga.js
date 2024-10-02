const progressBar = document.querySelector('.progress-bar');
let width = 0;

function animateProgressBar() {
  if (width >= 70) {
    clearInterval(interval);
  } else {
    width++;
    progressBar.style.width = width + '%';
  }
}

const interval = setInterval(animateProgressBar, 20);