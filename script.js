const addNotes = document.getElementById('add')
const clearNotes = document.getElementById('clear')

const notes = JSON.parse(localStorage.getItem('notes'))

if(notes){
    notes.forEach(note => createNote(note) )
}

addNotes.addEventListener('click', () => createNote())
clearNotes.addEventListener('click', ()=> {
    localStorage.clear()
    window.location.reload()
})

function createNote( text = '') {
    const note = document.createElement('div')
    note.classList.add('note')
    note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delet"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    const deletEl = note.querySelector('.delet')
    const editEl = note.querySelector('.edit')
    const mainEl = note.querySelector('.main')
    const textArea = note.querySelector('textarea')

    textArea.value = text
    mainEl.innerHTML = marked(text)

    deletEl.addEventListener('click', ()=> {
        note.remove()
        updateLS()
    })

    editEl.addEventListener('click', () => {
        mainEl.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })

    textArea.addEventListener('input', (e)=> {
        const { value } = e.target
        mainEl.innerHTML = marked(value)
        updateLS()
    })

    document.body.appendChild(note)
}

function updateLS(){
    const notesText = document.querySelectorAll('textarea')
    const notes = []
    notesText.forEach(note => notes.push(note.value))
    localStorage.setItem('notes',JSON.stringify(notes))
}