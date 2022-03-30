const text = [
    'Lorem Ipsum is simply dummy text of the printing and ty' ,
   ' when an unknown printer took a galley of type and scrambled it to make a type ',
   'specimen book. It has survived not only five centuries, but also the leap into electronic',
   ' typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release ',
   'of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing',
    'software like Aldus PageMaker including versions of Lorem Ipsum.',
   'specimen book. It has survived not only five centuries, but also the leap into electronic',
   ' typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release ',
   'of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing',
    'software like Aldus PageMaker including versions of Lorem Ipsum.'
]
const form = document.getElementById('form')
const range = document.getElementById('range')
const numberRange = document.getElementById('number-range')
const paragraphs = document.getElementById('paragraphs')

const handleRange = (event) =>{
    const value = event.target.value

    numberRange.textContent = value
}

const handleSubmit = (event) =>{
    event.preventDefault()

    const stringToNumber = Number(numberRange.textContent)

    const sliceParagraph = text.slice(0, stringToNumber)

    const result = sliceParagraph.map((item) =>{
        return `<p class="container-loram-text-result">${item}</p>`
    }).join('')

    paragraphs.innerHTML = result
}

form.addEventListener('submit',handleSubmit)

range.addEventListener('input',handleRange)