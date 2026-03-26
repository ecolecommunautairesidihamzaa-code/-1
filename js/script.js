// Modern School Website JS

// Theme Toggle
const darkToggle = document.querySelector('.dark-toggle');
const body = document.body;
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') { body.setAttribute('data-theme', 'dark'); }

darkToggle.addEventListener('click', () => {
  if (body.getAttribute('data-theme') === 'dark') {
    body.removeAttribute('data-theme'); localStorage.setItem('theme', 'light');
  } else {
    body.setAttribute('data-theme', 'dark'); localStorage.setItem('theme', 'dark');
  }
});

// Smooth Scroll & Active Nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault(); document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

window.addEventListener('scroll', () => {
  let current = '';
  document.querySelectorAll('section[id]').forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) { current = section.getAttribute('id'); }
  });
  document.querySelectorAll('nav a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) { a.classList.add('active'); }
  });
});

// Contact Form with EmailJS (TEMPLATE_ID still needed)
const contactForm = document.querySelector('.contact');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  emailjs.sendForm('service_8ztk73n', 'YOUR_TEMPLATE_ID', contactForm, 'HYQEsk9D9yTfbuUhw')
    .then(() => { 
      alert('تم إرسال الرسالة بنجاح!');
      contactForm.reset(); 
    }, (error) => { 
      alert('خطأ في الإرسال: ' + error.text); 
    });
});

// Gallery Lightbox
document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', () => {
    const lightbox = document.createElement('div'); lightbox.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:2000;display:flex;align-items:center;justify-content:center;cursor:pointer;';
    const imgCopy = img.cloneNode(); imgCopy.style.maxWidth = '90%'; imgCopy.style.maxHeight = '90%'; imgCopy.style.borderRadius = '12px';
    lightbox.appendChild(imgCopy); document.body.appendChild(lightbox);
    lightbox.addEventListener('click', () => document.body.removeChild(lightbox));
  });
});

// Animate on Scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.opacity = '1';
    }
  });
});

document.querySelectorAll('.card, .section').forEach(el => observer.observe(el));
