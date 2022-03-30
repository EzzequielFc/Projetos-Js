
function changeColor() {

    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"]

    const btn = document.querySelector('.btn-color')
    const p = document.querySelector('.color')
    
    btn.addEventListener('click', function () {
        let hexColor = "#"
        const sizeHex = hex.length
        for(let i = 0; i < 6; i++){
            const random = Math.floor(Math.random() * sizeHex)
            hexColor += hex[random]
        }
        p.innerHTML = hexColor
        document.body.style.background = hexColor
    })

}


changeColor()