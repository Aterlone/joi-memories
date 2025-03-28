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