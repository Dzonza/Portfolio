const aboutMeText = document.querySelector('.about-me-text');
const aboutMeTitle = document.querySelector('.about-me-title');
const projectsList = document.querySelectorAll('.project-articles');
const contactTitle = document.querySelector('.contact-animation-title');
const contactDetails = document.querySelectorAll('.contact-animation-details');

const moveLeft = function (entries) {
  entries.forEach((entry) => {
    const element = entry.target;
    const animation = element.getAttribute('data-animation');
    if (entry.isIntersecting) {
      element.classList.add(animation);
    } else {
      element.classList.remove(animation);
    }
  });
};

const observer = new IntersectionObserver(moveLeft, {
  threshold: [0, 0.5],
});

observer.observe(aboutMeText);
observer.observe(aboutMeTitle);
projectsList.forEach((project) => observer.observe(project));
observer.observe(contactTitle);
contactDetails.forEach((detail) => observer.observe(detail));
