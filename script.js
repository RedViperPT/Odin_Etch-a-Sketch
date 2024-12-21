// Add mouse state tracking
let isDrawing = false;

function createGrid(size = 16) {
    const container = document.querySelector('.container');
    container.innerHTML = ''; // Clear existing grid

    const squareSize = `${100 / size}%`;

    // Create grid squares and attach listeners 
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.width = squareSize;
        square.style.height = squareSize;
                square.addEventListener('mouseover', handleHover);
        
        container.appendChild(square);
    }
}

function handleHover(event) {
    if (isDrawing) {
        event.target.style.backgroundColor = 'black';
    }
}

// Add mouse state listeners to the container
const container = document.querySelector('.container');
container.addEventListener('mousedown', () => isDrawing = true);
container.addEventListener('mouseup', () => isDrawing = false);
container.addEventListener('mouseleave', () => isDrawing = false);

// Prevent drag selection while drawing
container.addEventListener('dragstart', (e) => e.preventDefault());

// Initialize grid when page loads
createGrid();

const resetButton = document.createElement('button');
resetButton.textContent = 'Clear';
resetButton.addEventListener('click', function() {
    let newSize = prompt('Enter the number of squares per side (max 100):');
    newSize = parseInt(newSize);
    if (newSize > 0 && newSize <= 100) {
        createGrid(newSize);
    } else {
        alert('Please enter a valid number between 1 and 100.');
    }
});

document.body.appendChild(resetButton);