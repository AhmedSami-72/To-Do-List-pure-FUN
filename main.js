// Load notes when page loads
window.onload = loadNotes;

// Add Note
function addNote() {
  const noteInput = document.getElementById('note-input');
  const noteText = noteInput.value.trim();

  if (noteText === "") {
    alert("Note cannot be empty!");
    return;
  }

  let notes = getNotesFromStorage();
  notes.push(noteText);
  saveNotesToStorage(notes);

  noteInput.value = "";
  loadNotes(); // Update displayed notes
}

// Edit Note
function editNote(index) {
  const newNote = prompt("Edit your note:", getNotesFromStorage()[index]);
  if (newNote !== null) {
    let notes = getNotesFromStorage();
    notes[index] = newNote;
    saveNotesToStorage(notes);
    loadNotes();
  }
}

// Delete Note
function deleteNote(index) {
  let notes = getNotesFromStorage();
  notes.splice(index, 1); // Remove 1 element at index
  saveNotesToStorage(notes);
  loadNotes();
}

// Get Notes from localStorage
function getNotesFromStorage() {
  return JSON.parse(localStorage.getItem('notes')) || [];
}

// Save Notes to localStorage
function saveNotesToStorage(notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Display Notes
function loadNotes() {
  const notesList = document.getElementById('notes-list');
  notesList.innerHTML = ""; // Clear current list

  const notes = getNotesFromStorage();

  notes.forEach((note, index) => {
    const li = document.createElement('li');
    li.textContent = note;

    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => editNote(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteNote(index);

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    notesList.appendChild(li);
  });
}
