const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (event) => {
    event.preventDefault()
    if (event.code.toLowerCase() == 'space') {
        setRandomColors();
    }
})

document.addEventListener('click', event => {
    const type = event.target.dataset.type

    if (type == 'lock') {
        event.target.classList.toggle('fa-lock-open')
        event.target.classList.toggle('fa-lock')
    }

    else if (type == 'copy') copyToClick(event.target.textContent)
})

function generateRandomColor() {
    const hexCodes = '0123456789abcdef';
    let color = '';
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color;
}

function copyToClick(text) {
    return navigator.clipboard.writeText(text)
}

function setRandomColors(isInitial) {
    const colorsArr = isInitial ? getColorsHash() : []
    
    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const textColors = col.querySelector('.color-text');
        const lockButton = col.querySelector('.lock-img')

        if (isLocked) {
            colorsArr.push(textColors.textContent)
            return
        }

        const randomColor = isInitial 
            ? colorsArr[index]
                ? colorsArr[index]
                : generateRandomColor()
            : generateRandomColor();

        if (!isInitial) {
            colorsArr.push(randomColor)
        }
        col.style.background = randomColor;
        textColors.textContent = randomColor;

        setTextColor(textColors, randomColor);
        setTextColor(lockButton, randomColor);
    })

    updateColorsHash(colorsArr)
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateColorsHash(colors = []) {
    document.location.hash = colors.map(col => {
        return col.toString().substring(1)
    })
        .join('-')
}

function getColorsHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map(color => '#' + color)
    }
    return []
}

setRandomColors(true);