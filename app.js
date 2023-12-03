
// Funktionen für den Maus-Trail und das Zeichnen
let trailElements = [];
const maxTrail = 30; // Maximale Anzahl an Trail-Elementen
let trailIndex = 0;
let hue = 0; // Farbton für den Trail
let isDrawing = false;
let drawingContainer = document.createElement('div');

document.addEventListener('mousemove', (event) => {
    let trail = trailElements[trailIndex];
    if (!trail) {
        trail = document.createElement('div');
        trail.className = 'trail';
        trail.style.display = 'none'; // Trail anfangs unsichtbar machen
        document.body.appendChild(trail);
        trailElements[trailIndex] = trail;
    }

    trail.style.display = 'block'; // Trail sichtbar machen, wenn Maus bewegt wird
    trail.style.left = event.pageX + 'px';
    trail.style.top = event.pageY + 'px';
    trail.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;

    trailIndex = (trailIndex + 1) % maxTrail;
    hue = (hue + 1) % 360;
});


document.body.appendChild(drawingContainer);
document.addEventListener('mousedown', () => isDrawing = true);
document.addEventListener('mouseup', () => isDrawing = false);
document.addEventListener('mouseleave', () => isDrawing = false);

document.addEventListener('mousemove', (event) => {
    if (isDrawing && !isMouseOnSearchElements(event)) {
        const drawPoint = document.createElement('div');
        drawPoint.className = 'drawPoint';
        drawingContainer.appendChild(drawPoint);

        drawPoint.style.left = event.pageX + 'px';
        drawPoint.style.top = event.pageY + 'px';
        drawPoint.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    }
});

// Stile für Zeichenpunkte
document.head.appendChild(document.createElement('style')).textContent = '.drawPoint { position: absolute; width: 5px; height: 5px; border-radius: 50%; }';

document.addEventListener('DOMContentLoaded', () => {
    const gifs = [
        "https://i.gifer.com/3ZsR.gif",
        "https://media.tenor.com/a4W7UfoAg3oAAAAi/pepe-the-frog9648r-dance.gif",
        "https://media.tenor.com/2bYnXdcbK3sAAAAi/monka-lol.gif",
        "https://media.tenor.com/jR291aTjU6QAAAAi/pepe-deez-nuts-pepe-frog.gif",
        "https://media.tenor.com/eX-EGbJ0zJMAAAAi/pepe-pepe-the-frog.gif",
        "https://media.tenor.com/g6nK3QsP8wkAAAAC/kdaeza-peepo.gif",
        "https://media.tenor.com/9-52JAMIBQ4AAAAC/pepe-peppo.gif",
        "https://media.tenor.com/AHa9SuqhxdAAAAAC/slayge-pepe.gif",
        "https://media.tenor.com/66BDvxP5_OwAAAAi/pepe.gif",
        "https://media.tenor.com/N-WYlyfnjDsAAAAi/pepe-skill-issue.gif",
        "https://media.tenor.com/-G603KA91pcAAAAi/pepe-red-pill.gif",
        "https://media.tenor.com/4Vynzdcm7NcAAAAi/malding-pepe.gif",
        "https://media.tenor.com/TdrQywX2yMAAAAAi/frog.gif",
        "https://media.tenor.com/mT1fGtxy9U8AAAAi/pepe-the-frog.gif",
        "https://media.tenor.com/yrKa2aKFPdcAAAAi/pepe-nerd.gif",
        "https://media.tenor.com/2z8MiLXXHDYAAAAi/yeppers-yep.gif",
        "https://media.tenor.com/WJ8CoTrg-XAAAAAi/pepe-ride.gif",
        "https://media.tenor.com/h5ygN1BrYykAAAAi/madge-late.gif",
        "https://media.tenor.com/4uy-pQcqF04AAAAi/saved.gif",
        "https://media.tenor.com/UftzRXjXOpcAAAAi/peaceout-vanish.gif",
        "https://media.tenor.com/VeIrAH4s5u0AAAAi/peepoblushspinner-pepe.gif",
        "https://media.tenor.com/J1QjkX0SYG8AAAAi/blankies-peepo.gif"
    ];

    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
    const gifContainer = document.getElementById('randomGifContainer');
    gifContainer.innerHTML = `<img src="${randomGif}" alt="Random Gif">`;
});



// Event listener for the search input to trigger search on pressing 'Enter'
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        triggerSearch();
    }
});

// Event listener for the search button to trigger search on click
document.getElementById('searchButton').addEventListener('click', function() {
    triggerSearch();
});

// Function to trigger the search
function triggerSearch() {
    const query = document.getElementById('searchInput').value;
    const searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(query);
    window.open(searchUrl, '_blank');
}

function isMouseOnSearchElements(event) {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchRect = searchInput.getBoundingClientRect();
    const buttonRect = searchButton.getBoundingClientRect();
    return event.clientX >= searchRect.left && event.clientX <= searchRect.right &&
           event.clientY >= searchRect.top && event.clientY <= searchRect.bottom ||
           event.clientX >= buttonRect.left && event.clientX <= buttonRect.right &&
           event.clientY >= buttonRect.top && event.clientY <= buttonRect.bottom;
}

const searchButton = document.getElementById('searchButton');
let isMouseNear = false;
let lastX = 0, lastY = 0;
let timeoutId;

document.addEventListener('mousemove', (event) => {
    const buttonRect = searchButton.getBoundingClientRect();
    const distance = Math.hypot(event.clientX - buttonRect.left, event.clientY - buttonRect.top);
    isMouseNear = distance < 80;

    if (isMouseNear) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            searchButton.style.transform = 'translate(0, 0)';
            lastX = 0;
            lastY = 0;
        }, 500); // 500 ms, bevor der Button zurückkehrt
    }
});

function randomButtonMovement() {
    if (isMouseNear) {
        const randomX = (Math.random() - 0.3) * 200;
        const randomY = (Math.random() - 0.3) * 200;
        lastX = Math.max(Math.min(lastX + randomX, window.innerWidth - searchButton.offsetWidth), 0);
        lastY = Math.max(Math.min(lastY + randomY, window.innerHeight - searchButton.offsetHeight), 0);
        searchButton.style.transform = `translate(${lastX}px, ${lastY}px)`;
    }
}
setInterval(randomButtonMovement, 50);
