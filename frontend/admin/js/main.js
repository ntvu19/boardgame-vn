const chart =  document.querySelector("#myChart").getContext('2d');
// creat new chart
new Chart (chart, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', ' Aug', 'Sep',  'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label:'Doanh thu',
                data: [50, 100, 200, 70, 80, 150, 60,40,20,10],
                borderColor: 'blue',
                borderWidth: 2
            }
        ]
    },
})

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