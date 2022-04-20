// show and hide menu
const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-btn');
const sidebar = document.querySelector('.admin__left');

menuBtn.addEventListener('click', () => {
    sidebar.style.display = 'block';
})
closeBtn.addEventListener('click', () => {
    sidebar.style.display = 'none';
})

// change theme
const themeBtn = document.querySelector('.theme-btn');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('darkMode');
    themeBtn.querySelector('span:first-child').classList.toggle('active');
    themeBtn.querySelector('span:last-child').classList.toggle('active');
})

window.onload = () => {
    let logInState, fullName
    const cookieSet = document.cookie.split('; ')
    for (let i = 0; i < cookieSet.length; i++) {
        const cookieVal = cookieSet[i].split('=')
        if (cookieVal[0] === 'logged') {
            logInState = cookieVal[1] === 'true'
        } else if (cookieVal[0] === 'fullName') {
            fullName = cookieVal[1].replace(/%20/g, ' ')
        }
    }

    if (logInState) {
        const infoRegion = document.querySelector('.profile-area .profile')

        // Missing avatar
        // infoRegion.querySelector('.profile-photo img').src = ``
        infoRegion.querySelector('h4').innerText = `${fullName}`
    }
}