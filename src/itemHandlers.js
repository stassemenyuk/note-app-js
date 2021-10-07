import {
  updateList,
  elementsCounter,
  archivedElementsCounter,
  notes,
  archivedNotes,
} from './renderFunctions';

export function archiveItem(id) {
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

export function unArchiveItem(id) {
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

export function deleteItem(id) {
  let newArr = [...notes.slice(0, id), ...notes.slice(id + 1)];
  newArr.forEach((item, index) => {
    if (index >= id) item.id--;
  });
  notes = newArr;
  updateList();
}

export function addItem(e) {
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

export function editItem(text, id) {
  notes.forEach((item) => {
    if (item.id === id) {
      let newItem = JSON.parse(JSON.stringify(item));
      newItem.text = text;
      let datePattern = /\d+\/\d+\/\d+/;
      let dates = datePattern.exec(text) || '-';
      newItem.dates = dates;
      let newArr = [...notes.slice(0, id), newItem, ...notes.slice(id + 1)];
      notes = newArr;
    }
  });
  archivedNotes.forEach((item) => {
    if (item.id === id) {
      let newItem = JSON.parse(JSON.stringify(item));
      newItem.text = text;
      let datePattern = /\d+\/\d+\/\d+/;
      let dates = datePattern.exec(text) || '-';
      newItem.dates = dates;
      let newArr = [...archivedNotes.slice(0, id), newItem, ...archivedNotes.slice(id + 1)];
      archivedNotes = newArr;
    }
  });
}

export function handleVisibility(btn, element) {
  btn.addEventListener('click', () => {
    element.classList.toggle('hide');
  });
}
