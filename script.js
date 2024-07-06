const getDateMethod = document.querySelector('.date');
const d = new Date();
getDateMethod.textContent = d.getFullYear();

const burgerMenuBtn = document.querySelector('.burger-menu-btn');
const burgerMenu = document.querySelector('.burger-menu');
const navLink1 = document.querySelector('.link1');
const navLink2 = document.querySelector('.link2');
const navLink3 = document.querySelector('.link3');
const navLink4 = document.querySelector('.link4');
const cancelBtn = document.querySelector('.cancel-btn');
const overlay = document.querySelector('.overlay');

const cancelBurgerMenu = () => {
  burgerMenu.style.display = 'none';
  overlay.style.position = 'static';
};
document.addEventListener('DOMContentLoaded', function () {
  burgerMenuBtn.addEventListener('click', () => {
    burgerMenu.style.display = 'block';
    overlay.style.position = 'fixed';
  });
  cancelBtn.addEventListener('click', () => cancelBurgerMenu());
  overlay.addEventListener('click', () => cancelBurgerMenu());
  navLink1.addEventListener('click', () => cancelBurgerMenu());
  navLink2.addEventListener('click', () => cancelBurgerMenu());
  navLink3.addEventListener('click', () => cancelBurgerMenu());
  navLink4.addEventListener('click', () => cancelBurgerMenu());
});
