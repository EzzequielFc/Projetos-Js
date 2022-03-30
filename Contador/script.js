function counter(){

    const number = document.querySelector('.number')
    const decrease = document.querySelector('.decrease')
    const increase = document.querySelector('.increase')
    const reset = document.querySelector('.reset')

    let counter = 0

    increase.addEventListener('click',function(){
        counter++
        number.innerHTML = counter
    })

    decrease.addEventListener('click',function(){
        counter--
        number.innerHTML = counter
    })

    reset.addEventListener('click',function(){
        counter = 0
        number.innerHTML = counter
    })

}

counter()