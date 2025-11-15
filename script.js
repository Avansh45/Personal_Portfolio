
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('nav .right a');

hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.classList.toggle('menu-open');
});


navLinks.forEach(link => {
  link.addEventListener('click', function() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  });
});


document.addEventListener('click', function(event) {
  const isClickInsideNav = navMenu.contains(event.target);
  const isClickOnHamburger = hamburger.contains(event.target);
  
  if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  }
});


document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const form = e.target;
  const statusDiv = document.getElementById('status-message');

  statusDiv.textContent = '';
  statusDiv.classList.remove('success', 'error');

  statusDiv.textContent = 'Sending...';
  statusDiv.style.display = 'block';

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      statusDiv.textContent = ' Message sent successfully! I will get back to you soon.';
      statusDiv.classList.add('success');
      form.reset();
    } else {
      const data = await response.json();
      if (Object.hasOwn(data, 'errors')) {
        statusDiv.textContent = ' Oops! ' + data.errors.map(err => err.message).join(', ');
      } else {
        statusDiv.textContent = ' Oops! There was an error submitting your form.';
      }
      statusDiv.classList.add('error');
    }
  } catch (error) {
    statusDiv.textContent = ' A network error occurred. Please try again.';
    statusDiv.classList.add('error');
  }
});