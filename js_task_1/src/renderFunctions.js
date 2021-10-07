import { archiveItem, deleteItem, editItem, unArchiveItem } from './itemHandlers';

let notes = [];
let archivedNotes = [];
let elementsCounter, archivedElementsCounter;

export function generateString(arr) {
  if (arr.length === 0) {
    return `<tr><td>You don't have any notes</td></tr>`;
  } else {
    let string = '';
    arr.map(({ text, time, id, category, dates }) => {
      let tools;
      if (arr === notes) {
        tools = `<button class="archive btn btn-secondary" data-id='${id}'>Archive</button>
      <button class="delete btn btn-danger" data-id='${id}'>X</button>`;
      } else {
        tools = `<button class="unarchive btn btn-secondary" data-id='${id}'>Unarchive</button>`;
      }
      string += `<tr>
      <td>${time}</td><td contenteditable class='text' id='${id}''>${text}</td><td>${category}</td><td>${dates}</td>
      <td>${tools}</td>
      </tr>`;
    });
    return string;
  }
}

export function updateList() {
  const list = document.querySelector('.list'),
    archivedList = document.querySelector('.archived-list');

  let notesListText = generateString(notes);
  list.innerHTML = notesListText;
  let archievedListText = generateString(archivedNotes);
  archivedList.innerHTML = archievedListText;
  bindAction('archive', archiveItem);
  bindAction('delete', deleteItem);
  bindAction('unarchive', unArchiveItem);
  document.querySelectorAll('.text').forEach((item) => {
    let id = +item.getAttribute('id');
    item.addEventListener('input', (e) => {
      let text = e.target.innerHTML;
      editItem(text, id);
    });
  });
  elementsCounter = notes.length;
  archivedElementsCounter = archivedNotes.length;
  fillCountTable();
}

export function fillCountTable() {
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

function bindAction(action, func) {
  document.querySelectorAll(`.${action}`).forEach((item) => {
    let id = +item.getAttribute('data-id');
    item.addEventListener('click', () => func(id));
  });
}

export { elementsCounter, archivedElementsCounter, notes, archivedNotes };
