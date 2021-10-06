// variables and start point

const list = document.querySelector('.list'),
  form = document.querySelector('.form'),
  createBtn = document.querySelector('.create'),
  closeBtn = document.querySelector('.close-form'),
  getArchiveBtn = document.querySelector('.get-archived'),
  archiveBlock = document.querySelector('.archive'),
  archivedList = document.querySelector('.archived-list');
let elementsCounter = 0,
  archivedElementsCounter = 0;

let notes = [];
let archivedNotes = [];

updateList();

//event listeners

form.addEventListener('submit', addItem);

createBtn.addEventListener('click', () => {
  form.classList.toggle('hide');
});

closeBtn.addEventListener('click', () => {
  form.classList.add('hide');
});

getArchiveBtn.addEventListener('click', () => {
  archiveBlock.classList.toggle('hide');
});

//renderFunctions

function generateString(arr) {
  if (arr.length === 0) {
    return `<tr><td>You don't have any notes</td></tr>`;
  } else {
    let string = '';
    arr.map(({ text, time, id, category, dates }) => {
      let tools;
      if (arr === notes) {
        tools = `<button class="archive btn btn-secondary" onClick="archiveItem(${id})">Archive</button>
      <button class="delete btn btn-danger" onClick="deleteItem(${id})">X</button>`;
      } else {
        tools = `<button class="archive btn btn-secondary" onClick="unArchiveItem(${id})">Unarchive</button>`;
      }
      string += `<tr>
      <td>${time}</td><td >${text}</td><td>${category}</td><td>${dates}</td>
      <td>${tools}</td>
      </tr>`;
    });
    return string;
  }
}

function updateList() {
  let notesListText = generateString(notes);
  list.innerHTML = notesListText;
  let archievedListText = generateString(archivedNotes);
  archivedList.innerHTML = archievedListText;
  elementsCounter = notes.length;
  archivedElementsCounter = archivedNotes.length;
  countNotes();
  console.log('Notes:');
  console.log(notes);
  console.log('ArchievedNotes');
  console.log(archivedNotes);
}

function countNotes() {
  let tasksAct = 0,
    tasksArch = 0,
    rndAct = 0,
    rndArch = 0,
    ideaAct = 0,
    ideaArch = 0;
  notes.forEach((item) => {
    switch (item.category) {
      case 'Task':
        tasksAct++;
        break;
      case 'Random thought':
        rndAct++;
        break;
      case 'Idea':
        ideaAct++;
    }
  });
  archivedNotes.forEach((item) => {
    switch (item.category) {
      case 'Task':
        tasksArch++;
        break;
      case 'Random thought':
        rndArch++;
        break;
      case 'Idea':
        ideaArch++;
    }
  });

  const tasksActBlock = document.querySelector('.tasks-active'),
    tasksArchBlock = document.querySelector('.tasks-archived'),
    rndActBlock = document.querySelector('.thoughts-active'),
    rndArchBlock = document.querySelector('.thoughts-archived'),
    ideaActBlock = document.querySelector('.ideas-active'),
    ideaArchBlock = document.querySelector('.ideas-archived');
  tasksActBlock.innerHTML = tasksAct;
  tasksArchBlock.innerHTML = tasksArch;
  rndActBlock.innerHTML = rndAct;
  rndArchBlock.innerHTML = rndArch;
  ideaActBlock.innerHTML = ideaAct;
  ideaArchBlock.innerHTML = ideaArch;
}

//item handlers

function archiveItem(id) {
  let elem = JSON.parse(JSON.stringify(notes[id]));
  let newNotesArr = [...notes.slice(0, id), ...notes.slice(id + 1)];
  newNotesArr.forEach((item, index) => {
    if (index >= id) item.id--;
  });
  notes = newNotesArr;
  elem.id = archivedElementsCounter;
  let newArchievedArr = [...archivedNotes, elem];
  archivedNotes = newArchievedArr;
  updateList();
}

function unArchiveItem(id) {
  let elem = JSON.parse(JSON.stringify(archivedNotes[id]));
  let newArchivedArr = [...archivedNotes.slice(0, id), ...archivedNotes.slice(id + 1)];
  newArchivedArr.forEach((item, index) => {
    if (index >= id) item.id--;
  });
  archivedNotes = newArchivedArr;
  elem.id = elementsCounter;
  let newNotesArr = [...notes, elem];
  notes = newNotesArr;
  updateList();
}

function deleteItem(id) {
  let newArr = [...notes.slice(0, id), ...notes.slice(id + 1)];
  newArr.forEach((item, index) => {
    if (index >= id) item.id--;
  });
  notes = newArr;
  updateList();
}

function addItem(e) {
  e.preventDefault();
  let data = e.target.elements;
  if (data[0].value === '') return;
  let time = new Date().toLocaleTimeString();
  let datePattern = /\d+\/\d+\/\d+/;
  let dates = datePattern.exec(data[0].value) || '-';
  notes.push({
    text: data[0].value,
    time,
    category: data[1][data[1].options.selectedIndex].label,
    dates,
    id: elementsCounter,
  });
  updateList();
  e.target.elements[0].value = '';
}
