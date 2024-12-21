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
        
        // Add event listener directly during creation
        square.addEventListener('mouseenter', handleHover);
        
        container.appendChild(square);
    }
}

// Separate the hover handling logic
function handleHover(event) {
    event.target.style.backgroundColor = 'black';
}

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