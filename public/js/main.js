
// Handle window resize
function handleResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}
window.addEventListener('resize', handleResize);



document.addEventListener('DOMContentLoaded', () => {
    const element = document.querySelector('.container .element');

    if (!element) {
        console.error('Element not found!');
        return;
    }

    // Mouse movement event to rotate the image
    window.addEventListener('mousemove', function (event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const rotateX = (mouseY / window.innerHeight - 0.5) * 50;
        const rotateY = (mouseX / window.innerWidth - 0.5) * 50;
        element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});


