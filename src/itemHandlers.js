import {
  updateList,
  elementsCounter,
  archivedElementsCounter,
  notes,
  archivedNotes,
} from './renderFunctions';

export function archiveItem(id) {
  let elem = JSON.parse(JSON.stringify(notes[id]));
  addItem(elem, 'arch');
  deleteItem(id, 'note');
}

export function unArchiveItem(id) {
  let elem = JSON.parse(JSON.stringify(archivedNotes[id]));
  addItem(elem, 'note');
  deleteItem(id, 'arch');
}

export function deleteItem(id, arr = 'note') {
  if (arr == 'note') {
    let newArr = [...notes.slice(0, id), ...notes.slice(id + 1)];
    newArr.forEach((item, index) => {
      if (index >= id) item.id--;
    });
    notes = newArr;
  } else {
    let newArr = [...archivedNotes.slice(0, id), ...archivedNotes.slice(id + 1)];
    newArr.forEach((item, index) => {
      if (index >= id) item.id--;
    });
    archivedNotes = newArr;
  }

  updateList();
}

export function submitCreateForm(e) {
  e.preventDefault();
  let data = e.target.elements;
  if (data[0].value === '') return;
  let elem = {};
  elem.text = data[0].value;
  elem.time = new Date().toLocaleTimeString();
  elem.category = data[1][data[1].options.selectedIndex].label;
  let datePattern = /\d+\/\d+\/\d+/;
  elem.dates = datePattern.exec(data[0].value) || '-';
  e.target.elements[0].value = '';
  addItem(elem, 'note');
}

export function addItem(element, arr = 'note') {
  let { text, time, category, dates } = element;
  if (arr === 'note') {
    notes.push({
      text,
      time,
      category,
      dates,
      id: elementsCounter,
    });
  } else {
    archivedNotes.push({
      text,
      time,
      category,
      dates,
      id: archivedElementsCounter,
    });
  }

  updateList();
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
