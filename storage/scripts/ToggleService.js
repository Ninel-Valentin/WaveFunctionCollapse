var borderSwitch = document.querySelector('div#borderSwitch');
function ToggleBorder() {
    let grid = document.querySelector('section#grid');
    let newBorderStatus = grid.getAttribute('data-border') != 'true';
    grid.setAttribute('data-border', newBorderStatus);
    borderSwitch.setAttribute('data-border', newBorderStatus);
}

borderSwitch.addEventListener('click', (e) => {
    ToggleBorder();
});