document.addEventListener("scroll", function () {
    let navbar = document.querySelector(".navbar");
    navbar.classList.toggle("scrolled", window.scrollY > navbar.offsetHeight);
});

document.addEventListener("DOMContentLoaded", function () {
    let sidebar = document.getElementById("collapsableSidebar");
    let content = document.querySelector(".content");

    sidebar.addEventListener("hidden.bs.collapse", function () {
        document.body.classList.add("collapsed-sidebar");
    });

    sidebar.addEventListener("shown.bs.collapse", function () {
        document.body.classList.remove("collapsed-sidebar");
    });
});


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

    // Mouse movement event to rotate the image on both X and Y axes when the mouse is over it
    element.addEventListener('mousemove', function (event) {
        const mouseX = event.clientX;  // Get horizontal position
        const mouseY = event.clientY;  // Get vertical position

        // Normalize values to range from -1 to 1 (to control the rotation)
        const rotateX = (mouseY / window.innerHeight - 0.5) * 60;  // Vertical mouse movement affects X-axis rotation
        const rotateY = (mouseX / window.innerWidth - 0.5) * -60;  // Horizontal mouse movement affects Y-axis rotation

        // Apply 3D rotation using both X and Y axes
        element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Optionally, reset rotation when the mouse leaves the image
    element.addEventListener('mouseleave', function () {
        element.style.transform = `rotateX(0deg) rotateY(0deg)`;  // Reset rotation on mouse leave
    });
});


