document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const imageItems = document.querySelectorAll('.image-item');
    const imagePaths = [
        'images/image1.svg',
        'images/image2.svg',
        'images/image3.svg',
        'images/image4.svg',
        'images/image5.svg'
    ];
    let isMoving = false;
    let timeout;

    // Initialize positions
    function initializePositions() {
        imageItems.forEach(item => item.classList.add('active'));
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function updateImagePositions(mouseX, mouseY) {
        const shuffledPaths = shuffleArray([...imagePaths]);
        
        imageItems.forEach((item, index) => {
            const delay = index * 50;
            const scale = 1 - (index * 0.05);
            
            setTimeout(() => {
                item.querySelector('img').src = shuffledPaths[index];
                item.style.transform = `translate(
                    calc(${mouseX}px - 50%),
                    calc(${mouseY}px - 50%)
                ) scale(${scale})`;
            }, delay);
        });
    }

    // Handle mouse movement
    function handleMouseMove(e) {
        if (timeout) {
            clearTimeout(timeout);
        }

        const { clientX, clientY } = e;
        isMoving = true;

        // Show images if they were hidden
        imageItems.forEach(item => item.classList.add('active'));

        // Update positions with mouse coordinates
        updateImagePositions(clientX, clientY);

        // Set timeout for hiding images when mouse stops
        timeout = setTimeout(() => {
            isMoving = false;
            imageItems.forEach((item, index) => {
                setTimeout(() => {
                    const dropDistance = 300 + (index * 100); // Larger drop distance for more dramatic effect
                    item.style.transform = `translate(
                        calc(${clientX}px - 50%),
                        calc(${clientY + dropDistance}px - 50%)
                    ) scale(${1 - (index * 0.05)})`;
                    setTimeout(() => {
                        item.classList.remove('active');
                    }, 300);
                }, index * 200); // Sequential delay for countdown effect
            });
        }, 1000);
    }

    // Initialize
    initializePositions();

    // Event listeners
    container.addEventListener('mousemove', handleMouseMove);
});