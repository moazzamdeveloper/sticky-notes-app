const addBtn = document.getElementById('add-note');
const notesContainer = document.getElementById('notes-container');

const colors = ['#feff9c', '#ff7eb9', '#7afcff', '#ff65a3', '#fff740', '#c4f0c2'];

let notes = JSON.parse(localStorage.getItem('stickyNotes')) || [];

function saveNotes() {
  localStorage.setItem('stickyNotes', JSON.stringify(notes));
}

function createNoteElement(note) {
  const div = document.createElement('div');
  div.className = 'note';
  div.style.background = note.color;
  div.innerHTML = `
    <button class="delete-btn" title="Delete">🗑️</button>
    <textarea placeholder="Write something...">${note.content}</textarea>
    <div class="date">${note.date}</div>
  `;

  const textarea = div.querySelector('textarea');
  const deleteBtn = div.querySelector('.delete-btn');

  textarea.addEventListener('input', () => {
    note.content = textarea.value;
    saveNotes();
  });

  deleteBtn.addEventListener('click', () => {
    notes = notes.filter(n => n.id !== note.id);
    saveNotes();
    renderNotes();
  });

  return div;
}

function renderNotes() {
  notesContainer.innerHTML = '';
  notes.forEach(note => {
    notesContainer.appendChild(createNoteElement(note));
  });
}

addBtn.addEventListener('click', () => {
  const newNote = {
    id: Date.now(),
    content: '',
    color: colors[Math.floor(Math.random() * colors.length)],
    date: new Date().toLocaleDateString()
  };
  notes.unshift(newNote);
  saveNotes();
  renderNotes();
});

renderNotes();