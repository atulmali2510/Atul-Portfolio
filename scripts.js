// Smooth scroll for anchor links and simple UI interactions
document.addEventListener('DOMContentLoaded', function () {
  // Smooth scroll
  document.querySelectorAll('a.js-scroll-trigger[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      const t = document.querySelector(this.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Fade-in sections on scroll
  const sections = document.querySelectorAll('.resume-section');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  sections.forEach(s => io.observe(s));

  // Contact form front-end validation
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = form.elements['name'].value.trim();
      const email = form.elements['email'].value.trim();
      const message = form.elements['message'].value.trim();
      if (!name || !email || !message) { alert('Please complete all fields.'); return; }
      if (!/^\S+@\S+\.\S+$/.test(email)) { alert('Please enter a valid email.'); return; }
      alert('Thanks ' + name + '! This is a demo form — implement backend to receive messages.');
      form.reset();
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  // Smooth scroll
  // ...your existing smooth scroll code...

  // Fade-in sections on scroll
  // ...your existing fade-in code...

  // New code for skills animation
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBars = skillsSection.querySelectorAll('.progress-bar');
          progressBars.forEach(bar => {
            const width = bar.getAttribute('aria-valuenow');
            bar.style.width = width + '%';
          });
          // Unobserve the section after animation
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 }); // Adjust threshold as needed

    skillsObserver.observe(skillsSection);
  }

  // Contact form front-end validation
  // ...your existing form validation code...
});

const textElement = document.getElementById('typewriter-text');
const textToType = "Atul Sonawane";
const typingSpeed = 100; // milliseconds per character
const erasingSpeed = 50;  // milliseconds per character
const delayBetweenTexts = 1000; // milliseconds

let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentText = textToType.substring(0, charIndex);
  textElement.textContent = currentText;

  if (!isDeleting && charIndex < textToType.length) {
    charIndex++;
    setTimeout(typeWriter, typingSpeed);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeWriter, erasingSpeed);
  } else if (charIndex === 0) {
    isDeleting = false;
    setTimeout(typeWriter, typingSpeed);
  } else if (charIndex === textToType.length) {
    isDeleting = true;
    setTimeout(typeWriter, delayBetweenTexts);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (textElement) {
    typeWriter();
  }
});


const form = document.getElementById('contact-form');
const statusMessage = document.createElement('div');
statusMessage.style.marginTop = '1rem';
form.parentNode.insertBefore(statusMessage, form.nextSibling);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  statusMessage.textContent = "Sending your message...";
  statusMessage.style.color = "var(--accent)";

  const data = new FormData(form);
  const response = await fetch(form.action, {
    method: form.method,
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  });

  if (response.ok) {
    statusMessage.textContent = "Thank you! Your message has been sent successfully.";
    statusMessage.style.color = "green";
    form.reset();
  } else {
    statusMessage.textContent = "Oops! Something went wrong. Please try again later.";
    statusMessage.style.color = "red";
  }
});
