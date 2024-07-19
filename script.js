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

// Wave animation for footer
var container = document.querySelector('.waveContainer');
var width = container.offsetWidth;
var height = container.offsetHeight;
var wave = document.getElementById('wave');

var waveWidth = container.offsetWidth; // Wave SVG width (usually container width)
var waveHeight = 100; // Position from the top of container
var waveDelta = 20; // Wave amplitude
var speed = 0.3; // Wave animation speed
var wavePoints = 6; // How many point will be used to compute our wave

const navigation = document.querySelector('.burger-navigation');
const cancelBurgerMenu = () => {
  burgerMenu.style.animation = 'cancelBtnAnimation 0.2s linear forwards';
  cancelBtn.style.display = 'none';
  overlay.style.position = 'static';
  navigation.style.animation = '';
};
document.addEventListener('DOMContentLoaded', function () {
  burgerMenuBtn.addEventListener('click', () => {
    burgerMenu.style.animation = 'animated-menu 0.2s linear forwards';
    cancelBtn.style.display = 'flex';
    overlay.style.position = 'fixed';
    navigation.style.animation = 'hamburger-links 0.1s linear 0.2s forwards';
  });
  cancelBtn.addEventListener('click', () => cancelBurgerMenu());
  overlay.addEventListener('click', () => cancelBurgerMenu());
  navLink1.addEventListener('click', () => cancelBurgerMenu());
  navLink2.addEventListener('click', () => cancelBurgerMenu());
  navLink3.addEventListener('click', () => cancelBurgerMenu());
  navLink4.addEventListener('click', () => cancelBurgerMenu());
});
var points = [];

function calculateWavePoints(factor) {
  var points = [];

  for (var i = 0; i <= wavePoints; i++) {
    var x = (i / wavePoints) * waveWidth;
    var sinSeed = (factor + (i + (i % wavePoints))) * speed * 100;
    var sinHeight = Math.sin(sinSeed / 100) * waveDelta;
    var yPos = Math.sin(sinSeed / 100) * sinHeight + waveHeight;
    points.push({ x: x, y: yPos });
  }

  return points;
}

function buildPath(points) {
  var SVGString = 'M ' + points[0].x + ' ' + points[0].y;

  var cp0 = {
    x: (points[1].x - points[0].x) / 2,
    y: points[1].y - points[0].y + points[0].y + (points[1].y - points[0].y),
  };

  SVGString +=
    ' C ' +
    cp0.x +
    ' ' +
    cp0.y +
    ' ' +
    cp0.x +
    ' ' +
    cp0.y +
    ' ' +
    points[1].x +
    ' ' +
    points[1].y;

  var prevCp = cp0;
  var inverted = -1;

  for (var i = 1; i < points.length - 1; i++) {
    var cpLength = Math.sqrt(prevCp.x * prevCp.x + prevCp.y * prevCp.y);
    var cp1 = {
      x: points[i].x - prevCp.x + points[i].x,
      y: points[i].y - prevCp.y + points[i].y,
    };

    SVGString +=
      ' C ' +
      cp1.x +
      ' ' +
      cp1.y +
      ' ' +
      cp1.x +
      ' ' +
      cp1.y +
      ' ' +
      points[i + 1].x +
      ' ' +
      points[i + 1].y;
    prevCp = cp1;
    inverted = -inverted;
  }

  SVGString += ' L ' + width + ' ' + height;
  SVGString += ' L 0 ' + height + ' Z';
  return SVGString;
}

var lastUpdate;
var totalTime = 0;

function tick() {
  var now = window.Date.now();

  if (lastUpdate) {
    var elapsed = (now - lastUpdate) / 1000;
    lastUpdate = now;

    totalTime += elapsed;

    var factor = totalTime * Math.PI;
    wave.setAttribute('d', buildPath(calculateWavePoints(factor)));
  } else {
    lastUpdate = now;
  }

  window.requestAnimationFrame(tick);
}
tick();
