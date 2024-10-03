const progressBar = document.querySelector('.progress-bar');
let width = 0;

function animateProgressBar() {
  if (width >= 70) { // Check for full width (100%)
    clearInterval(interval);
    window.location.href = 'login.html'; // Replace with your actual login page URL
  } else {
    width++;
    progressBar.style.width = width + '%';
  }
}

const interval = setInterval(animateProgressBar, 60);