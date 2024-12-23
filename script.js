let isDrawing = false;
let isRainbowMode = false;
let isDarkeningMode = false;
const container = document.querySelector('.container');
let currentGridSize = 16; // Track the current grid size

// Function to create the grid
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
        square.dataset.interactions = '0'; // Track number of times interacted to create darkening
        container.appendChild(square);
    }
}

// Function to set the color of the square based on mode
function setSquareColor(square) {
    if (isDarkeningMode) {
        const currentInteractions = parseInt(square.dataset.interactions) || 0;
        if (currentInteractions < 10) {
            const newInteractions = currentInteractions + 1;
            const opacity = newInteractions * 0.1;
            square.style.backgroundColor = 'black';
            square.style.opacity = opacity;
            square.dataset.interactions = newInteractions;
        }
    } else if (isRainbowMode) {
        const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        square.style.backgroundColor = randomColor;
        square.style.opacity = 1;
    } else {
        square.style.backgroundColor = 'black';
        square.style.opacity = 1;
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
        setSquareColor(event.target); // Call the color-setting function
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

// Button setup for setSize
const setSizeButton = document.createElement('button');
setSizeButton.textContent = 'Set Size';

setSizeButton.addEventListener('click', function () {
    let newSize;
    while (true) {
        newSize = prompt('Enter the number of squares per side (1-100)', currentGridSize);
        if (newSize === null) return; // User cancelled prompt
        newSize = parseInt(newSize);
        if (!isNaN(newSize) && newSize > 0 && newSize <= 100) {
            break; // Valid input, exit loop
        }
        alert('Please enter a valid number between 1 and 100.'); // Notify user of invalid input
    }
    createGrid(newSize); // Create the grid
});

// Button setup for reset
const resetButton = document.createElement('button');
resetButton.textContent = 'Clear';
resetButton.addEventListener('click', function () {
    createGrid(currentGridSize); // Clears the grid
});


// Button setup for rainbow mode
const rainbowButton = document.createElement('button');
rainbowButton.textContent = 'Rainbow Mode: OFF';
rainbowButton.addEventListener('click', function () {
    isRainbowMode = !isRainbowMode; 
    rainbowButton.textContent = isRainbowMode ? 'Rainbow Mode: ON' : 'Rainbow Mode: OFF';
    if(isRainbowMode){
        isDarkeningMode = false; //Ensure one mode is always on
        darkeningButton.textContent = 'Darkening Mode: OFF';
    }
});


// Button setup for darkening mode
const darkeningButton = document.createElement('button');
darkeningButton.textContent = 'Darkening Mode: OFF';
darkeningButton.addEventListener('click', function () {
    isDarkeningMode = !isDarkeningMode;
    isRainbowMode = false; // Turn off rainbow mode when darkening mode is enabled
    rainbowButton.textContent = 'Rainbow Mode: OFF';
    darkeningButton.textContent = isDarkeningMode ? 'Darkening Mode: ON' : 'Darkening Mode: OFF';
});

// Attach buttons to DOM
document.querySelector('.controls').appendChild(setSizeButton);
document.querySelector('.controls').appendChild(resetButton);
document.querySelector('.controls').appendChild(rainbowButton);
document.querySelector('.controls').appendChild(darkeningButton);