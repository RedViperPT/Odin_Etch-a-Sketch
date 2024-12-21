function createGrid(size = 16) {
    const container = document.querySelector('.container');
    container.innerHTML = ''; // Clear existing grid

    // Calculate square size based on container width
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

// Initialize grid when page loads
createGrid();
