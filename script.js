// Constants and initial variables
const container = document.querySelector('.container');
const controls = document.querySelector('.controls');
let currentGridSize = 16;
let isDrawing = false;
let isRainbowMode = false;
let isDarkeningMode = false;

// Create grid squares
function createGrid(size = 16) {
    currentGridSize = size;
    const squareSize = `${100 / size}%`;
    container.innerHTML = '';

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.width = squareSize;
        square.style.height = squareSize;
        square.dataset.interactions = '0';
        container.appendChild(square);
    }
}

// Set color based on mode
function setSquareColor(square) {
    if (isDarkeningMode) {
        let interactions = parseInt(square.dataset.interactions) || 0;
        if (interactions < 10) {
            interactions++;
            square.style.backgroundColor = 'black';
            square.style.opacity = interactions * 0.1;
            square.dataset.interactions = interactions;
        }
    } else if (isRainbowMode) {
        const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
        square.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        square.style.opacity = 1;
    } else {
        square.style.backgroundColor = 'black';
        square.style.opacity = 1;
    }
}

// Handle drawing logic
function handleDrawing(event) {
    if (!event.target.classList.contains('grid-square')) return;

    if (isDrawing) {
        setSquareColor(event.target);
    }
}

// Event listeners for drawing
container.addEventListener('mousedown', () => isDrawing = true);
container.addEventListener('mouseup', () => isDrawing = false);
container.addEventListener('mouseleave', () => isDrawing = false);
container.addEventListener('mouseover', handleDrawing);

// Prevent drag selection
container.addEventListener('dragstart', (e) => e.preventDefault());

// Button for setting grid size
const setSizeButton = document.createElement('button');
setSizeButton.textContent = 'Set Size';
setSizeButton.addEventListener('click', () => {
    let newSize;
    while (true) {
        newSize = prompt('Enter the number of squares per side (1-100)', currentGridSize);
        if (newSize === null) return;
        newSize = parseInt(newSize);
        if (isNaN(newSize) || newSize < 1 || newSize > 100) {
            alert('Please enter a valid number between 1 and 100.');
        } else {
            break;
        }
    }
    createGrid(newSize);
});
controls.appendChild(setSizeButton);

// Button for resetting the grid
const resetButton = document.createElement('button');
resetButton.textContent = 'Clear';
resetButton.addEventListener('click', () => createGrid(currentGridSize));
controls.appendChild(resetButton);

// Button for rainbow mode
const rainbowButton = document.createElement('button');
rainbowButton.textContent = 'Rainbow Mode: OFF';
rainbowButton.addEventListener('click', () => {
    isRainbowMode = !isRainbowMode;
    isRainbowMode ? isDarkeningMode = false : null;
    rainbowButton.textContent = isRainbowMode ? 'Rainbow Mode: ON' : 'Rainbow Mode: OFF';
    darkeningButton.textContent = isDarkeningMode ? 'Darkening Mode: ON' : 'Darkening Mode: OFF';
});
controls.appendChild(rainbowButton);

// Button for darkening mode
const darkeningButton = document.createElement('button');
darkeningButton.textContent = 'Darkening Mode: OFF';
darkeningButton.addEventListener('click', () => {
    isDarkeningMode = !isDarkeningMode;
    isDarkeningMode ? isRainbowMode = false : null;
    darkeningButton.textContent = isDarkeningMode ? 'Darkening Mode: ON' : 'Darkening Mode: OFF';
    rainbowButton.textContent = isRainbowMode ? 'Rainbow Mode: ON' : 'Rainbow Mode: OFF';
});
controls.appendChild(darkeningButton);

// Initialize grid
createGrid();