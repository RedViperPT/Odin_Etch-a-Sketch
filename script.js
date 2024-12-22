let isDrawing = false;
let isRainbowMode = false;
const container = document.querySelector('.container');

let currentGridSize = 16; // Track the current grid size

function createGrid(size = 16) {
    currentGridSize = size; // Update the current grid size
    container.innerHTML = ''; // Clear existing grid

    const squareSize = `${100 / size}%`;

    // Create grid squares
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.width = squareSize;
        square.style.height = squareSize;
        container.appendChild(square);
    }
}

// Handle drawing state and color change
function handleDrawing(event) {
    if (event.type === 'mousedown') {
        isDrawing = true;
    } else if (event.type === 'mouseup' || event.type === 'mouseleave') {
        isDrawing = false;
    }

    if (isDrawing && event.target.classList.contains('grid-square')) {
        if (isRainbowMode) {
            const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            event.target.style.backgroundColor = randomColor;
        } else {
            event.target.style.backgroundColor = 'black';
        }
    }
}

// Add event listeners for drawing
container.addEventListener('mousedown', handleDrawing);
container.addEventListener('mouseup', handleDrawing);
container.addEventListener('mouseleave', handleDrawing);
container.addEventListener('mouseover', handleDrawing);

// Prevent drag selection while drawing
container.addEventListener('dragstart', (e) => e.preventDefault());

// Initialize grid when page loads
createGrid();

const setSizeButton = document.createElement('button');
setSizeButton.textContent = 'Set Size';
setSizeButton.addEventListener('click', function () {
    let newSize = prompt('Enter the number of squares per side (max 100):');
    newSize = parseInt(newSize);
    if (newSize > 0 && newSize <= 100) {
        createGrid(newSize);
    } else {
        alert('Please enter a valid number between 1 and 100.');
    }
});

const resetButton = document.createElement('button');
resetButton.textContent = 'Clear';
resetButton.addEventListener('click', function () {
    createGrid(currentGridSize); 
});

const rainbowButton = document.createElement('button');
rainbowButton.textContent = 'Rainbow Mode: OFF';
rainbowButton.addEventListener('click', function () {
    isRainbowMode = !isRainbowMode; 
    rainbowButton.textContent = isRainbowMode ? 'Rainbow Mode: ON' : 'Rainbow Mode: OFF';
});

document.querySelector('.controls').appendChild(setSizeButton);
document.querySelector('.controls').appendChild(resetButton);
document.querySelector('.controls').appendChild(rainbowButton);
