const noteInput = document.getElementById("noteInput");
const saveNoteBtn = document.getElementById("saveNoteBtn");
const notesContainer = document.getElementById("notesContainer");

// Get notes from Local Storage
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Save notes to Local Storage
function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Display notes
function renderNotes() {
    notesContainer.innerHTML = "";

    notes.forEach((note, index) => {
        const noteCard = document.createElement("div");
        noteCard.classList.add("note-card");

        noteCard.innerHTML = `
            <p>${note}</p>
            <button onclick="deleteNote(${index})">
                🗑️ Delete
            </button>
        `;

        notesContainer.appendChild(noteCard);
    });
}

// Add a new note
function addNote() {
    const noteText = noteInput.value.trim();

    if (noteText === "") {
        alert("Please write a note first!");
        return;
    }

    notes.unshift(noteText);

    saveNotes();
    renderNotes();

    noteInput.value = "";
}

// Delete a note
function deleteNote(index) {
    notes.splice(index, 1);

    saveNotes();
    renderNotes();
}

// Save button event
saveNoteBtn.addEventListener("click", addNote);

// Load notes when page opens
renderNotes();
