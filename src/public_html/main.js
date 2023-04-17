const showMenu = (toggleId, navbarId, bodyId) => {
    const toggle = document.getElementById(toggleId),
    navbar = document.getElementById(navbarId),
    bodyPadding = document.getElementById(bodyId)

    if (toggle && navbar) {
        toggle.addEventListener('click', () => {
            navbar.classList.toggle('showSidebar')
            bodyPadding.classList.toggle('expander')
        })
    }
}

showMenu('nav-toggle', 'navbar', 'admin_body')

const linkColor = document.querySelectorAll('.nav__link') 
function colorLink() {
    linkColor.forEach(l => l.classList.remove('active'))
    this.classList.add('active')
}
linkColor.forEach(l => l.addEventListener('click', colorLink))
