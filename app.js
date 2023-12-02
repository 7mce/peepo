
// Funktionen für den Maus-Trail und das Zeichnen
let trailElements = [];
const maxTrail = 50; // Maximale Anzahl an Trail-Elementen
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
    if (isDrawing) {
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
        "https://media.tenor.com/YijNqMHT6KsAAAAi/smadging-smadge.gif",
        "https://media.tenor.com/YijNqMHT6KsAAAAi/smadging-smadge.gif",
        "https://media.tenor.com/NT_qloZ4io8AAAAi/thinkge-thinking-pepe.gif",
        "https://media.tenor.com/SeUqQ_noBbAAAAAi/peepo-juice.gif",
        "https://media.tenor.com/QsuY7AMzaWAAAAAi/peepo-dj.gif",
        "https://media.tenor.com/CSiyQp9eLbsAAAAi/pepe-wine.gif",
        "https://media.tenor.com/Wy6p1fCuqIoAAAAi/peepo-clown-clown.gi",
        "https://media.tenor.com/flGNpobJuuoAAAAi/happy-clap.gif",
        "https://media.tenor.com/_kGSWq3wq4IAAAAi/sad-pepe.gif",
        "https://media.tenor.com/a4W7UfoAg3oAAAAi/pepe-the-frog9648r-dance.gif",
        "https://media.tenor.com/6w1aupPULL4AAAAi/pepe.gif",
        "https://media.tenor.com/SQ587Dz0REsAAAAi/free-the-homie.gif",
        "https://media.tenor.com/Lf2JYGN_5L8AAAAj/pepe.gif",
        "https://media.tenor.com/MG-aoPKcaLYAAAAj/dj-party.gif",
        "https://media.tenor.com/40DD5ETWkJgAAAAj/nerdge-nerd.gif",
        "https://media.tenor.com/fbWjCUUdJO4AAAAj/dank-danklove.gif",
        "https://media.tenor.com/OSWzzKQ_ox4AAAAj/salami-pepo.gif",
        "https://media.tenor.com/J1QjkX0SYG8AAAAj/blankies-peepo.gif",
        "https://media.tenor.com/BWzK7cmNVWgAAAAj/pepo-g-peepo.gif",
        "https://media.tenor.com/BWzK7cmNVWgAAAAj/pepo-g-peepo.gif"
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
