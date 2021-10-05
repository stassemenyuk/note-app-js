const list = document.querySelector('.list'),
  form = document.querySelector('.form'),
  createBtn = document.querySelector('.create'),
  closeBtn = document.querySelector('.close-form');
let elementsCounter = 0;

let notes = [];

function deleteItem(id) {
  let newArr = [...notes.slice(0, id), ...notes.slice(id + 1)];
  newArr.forEach((item, index) => {
    if (index >= id) item.id--;
  });
  notes = newArr;
  updateList();
}

function generateString() {
  if (notes.length === 0) {
    return `<tr><td>You don't have any notes</td></tr>`;
  } else {
    let string = '';
    notes.map(({ text, time, id, category, dates }) => {
      string += `<tr><td>${time}</td><td contenteditable>${text}</td><td>${category}</td><td>${dates}</td>
      <td>
      <button class="archive btn btn-secondary" onClick="archiveItem(${id})">Archive</button>
      <button class="delete btn btn-danger" onClick="deleteItem(${id})">X</button>
      </td></tr>`;
    });
    return string;
  }
}

function updateList() {
  let listText = generateString();
  list.innerHTML = listText;
  elementsCounter = notes.length;
  countNotes();
}

function countNotes() {
  let tasksAct = 0,
    tasksArch = 0,
    rndAct = 0,
    rndArch = 0,
    ideaAct = 0,
    ideaArch = 0;
  notes.forEach((item) => {
    if (item.active) {
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
    } else {
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

updateList();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let time = new Date().toLocaleTimeString();
  let data = e.target.elements;
  let datePattern = /\d+\/\d+\/\d+/;
  let dates = datePattern.exec(data[0].value) || '-';
  notes.push({
    text: data[0].value,
    time,
    category: data[1][data[1].options.selectedIndex].label,
    dates,
    id: elementsCounter,
    active: true,
  });
  updateList();
  e.target.elements[0].value = '';
});

createBtn.addEventListener('click', () => {
  form.classList.remove('hide');
});

closeBtn.addEventListener('click', () => {
  form.classList.add('hide');
});
