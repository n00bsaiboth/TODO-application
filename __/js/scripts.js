"use strict";

// note array to store all of the note objects.

let notes = [];

// firstly we check if the notes have content, at this point it would not have any content. You can see this function definition on the helper functions section.

seeIfNotesHaveContent();

// functions for adding a new note

function addNewNote() {
  let noteHeader = document.getElementById("newNoteHeader").value;
  let noteText = document.getElementById("newNoteText").value;

  let noteImportance = document.getElementById("newNoteImportance").value;
  let noteSubject = document.getElementById("newNoteSubject").value;

  let noteDay = document.getElementById("newNoteDay").value;
  let noteMonth = document.getElementById("newNoteMonth").value;
  let noteYear = document.getElementById("newNoteYear").value;

  let noteDate = noteMonth + "/" + noteDay + "/" + noteYear;

  let dateToday = getDateOfToday();

  let noteID = Math.floor(Math.random() * 100) + 1;

  if(noteText === "") {
    alert("You must write a note");
  } else {
    let newNote = {
      id: noteID,
      header: noteHeader,
      text: noteText,
      today: dateToday,
      date: noteDate,
      importance: noteImportance,
      noteStatus: false
    }

    addASingleNote(newNote);
  }
}

function addASingleNote(note) {
  let newEntry = document.getElementById("seeAllNotes");
  let entry = document.createElement("article");
  let noteContent = note;

  let id = notes.length;

  let countTheDaysForDeadline = compareDates(note.today, note.date);

  entry.setAttribute("class", "jumbotron");
  entry.setAttribute("id", "note-" + id);

  entry.innerHTML = "<h3>" + note.header + "</h3> " +
                    "<p>" + note.text + "</p> " +
                    "<p> Importance: " + note.importance + "</p> " +
                    "<p> Date of today is: " + note.today + " Deadline: " + note.date + "</p>" +
                    "<p><button onclick=\"modifySingleNote(" + id + ")\"class=\"btn btn-primary\" id=\"modify-btn-" + id + "\">Modify</button> " +
                    "<button onclick=\"changeSingleNoteStatus(" + id + ")\" class=\"btn btn-primary\" id=\"changeStatus-btn-" + id + "\">Mark as Done</button> " +
                    "<button onclick=\"removeSingleNote(" + id + ")\" class=\"btn btn-primary\">Remove</button></p>" +
                    "<div id=\"modify-note-" + id + "\"></div>" ;

  newEntry.appendChild(entry);

  alert(note.header + " " + note.text + " " + note.date + " " + note.importance);

  notes.push(note);

  seeIfNotesHaveContent();

  console.log(notes);
}

// functions for modifying a single note

function modifySingleNote(id) {
  let note_id = id;
  let openEditor = document.getElementById("modify-note-" + id);
  let editor = document.createElement("div");

  let modifyButton = document.getElementById("modify-btn-" + id);

  modifyButton.remove();

  console.log(note_id);

  let note = notes[id];

  editor.innerHTML = "<h1>Edit note</h1>" +
                     "<div class=\"form-group\">" +
                     "<label for=\"newNoteHeader\">New Header</label>" +
                     "<input type=\"text\" class=\"form-control\" id=\"newNoteHeader\" placeholder=" + note.header + "></input>" +
                     "</div>" +
                     "<div class=\"form-group\">" +
                     "<label for=\"newNoteText\">New Text</label>" +
                     "<input type=\"text\" class=\"form-control\" id=\"newNoteText\" placeholder=" + note.text + "></input>" +
                     "</div>" +
                     "<button onclick=\"modifyNote(" + note_id + ")\" class=\"btn btn-primary\">Update</button>";

  openEditor.appendChild(editor);
}

function modifyNote(id) {
  let newUpdatedHeader = document.getElementById("newNoteHeader").value;
  let newUpdatedText = document.getElementById("newNoteText").value;

  let newUpdatedElement = document.getElementById("note-" + id);
  let closeEditor = document.getElementById("modify-note-" + id);

  let note = notes[id];

  note.header = newUpdatedHeader;
  note.text = newUpdatedText;

  closeEditor.remove();

  newUpdatedElement.innerHTML = "<h3>" + note.header + "</h3> " +
                    "<p>" + note.text + "</p> " +
                    "<p> Importance: " + note.importance + "</p> " +
                    "<p> Date of today is: " + note.today + " Deadline: " + note.date + "</p>" +
                    "<p><button onclick=\"modifySingleNote(" + id + ")\"class=\"btn btn-primary\" id=\"modify-btn-" + id + "\">Modify</button> " +
                    "<button onclick=\"changeSingleNoteStatus(" + id + ")\" class=\"btn btn-primary\" id=\"changeStatus-btn-" + id + "\">Mark as Done</button> " +
                    "<button onclick=\"removeSingleNote(" + id + ")\" class=\"btn btn-primary\">Remove</button></p>" +
                    "<div id=\"modify-note-" + id + "\"></div>" ;


  seeIfNotesHaveContent();

  console.log(notes);
}

// function for changing the status to true, so the note or task has been completed.

function changeSingleNoteStatus(id) {
  let note = notes[id];
  let changeElement = document.getElementById("note-" + id);

  notes[id].noteStatus = true;

  changeElement.setAttribute("class", "changeElement");

  let modifyButton = document.getElementById("modify-btn-" + id);
  let changeStatusButton = document.getElementById("changeStatus-btn-" + id);

  modifyButton.remove();
  changeStatusButton.remove();

  seeIfNotesHaveContent();

  console.log(notes);
}

// functions for removing a single note

function removeSingleNote(id) {
  let removeElement = document.getElementById("note-" + id);

  removeElement.remove();
  notes.splice(id, 1);

  seeIfNotesHaveContent();

  console.log(notes);
}

/* helper functions
********************/

// see if notes array has content

function seeIfNotesHaveContent() {
  let seeAllNotesHeader = document.getElementById("seeAllNotesHeader");

  notes.length == 0 ? seeAllNotesHeader.innerText = "TODO application has no note entries" : seeAllNotesHeader.innerText = "See all notes";
}

// days

function getDateOfToday() {
  let date = new Date();

  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  let dateOfToday = month + "/" + day + "/" + year;

  return dateOfToday;
}

function compareDates(today, deadline) {
  let message = "";

  today = new Date(today);
  deadline = new Date(deadline);

  console.log("today is, " + today);
  console.log("deadline is, " + deadline);

  return message;
}
