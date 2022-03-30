const countdown = () => {
    // o get time, transforma a data em milisecondos
    // primeira const pegando a data futura
    const countDate = new Date('May 17, 2022 00:00:00').getTime()
    // pegando a data presente
    const now = new Date().getTime()
    // pegamos a diferença entre as datas
    const gap = countDate - now

    // How the fuck does time work?
    const second = 1000
    const minute = second * 60
    const hour = minute * 60
    const day = hour * 24

    //Calculete the shit
    const textDay = Math.floor(gap / day)
    const textHour = Math.floor((gap % day) / hour)
    const textMinute = Math.floor((gap % hour) / minute)
    const textSecond = Math.floor((gap % minute) / second)

    // Update to HTML
    document.querySelector('.day').innerText = textDay
    document.querySelector('.hour').innerText = textHour
    document.querySelector('.minute').innerText = textMinute
    document.querySelector('.second').innerText = textSecond


}
setInterval(countdown,1000)
