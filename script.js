const list = document.querySelector('.list'),
  form = document.querySelector('.form');
let elementsCounter = 0;

let notes = [];

function deleteItem(id) {
  console.log(id);
  let newArr = [...notes.slice(0, id), ...notes.slice(id + 1)];
  console.log(newArr);
  newArr.forEach((item, index) => {
    if (index >= id) item.id--;
  });
  notes = newArr;
  updateList();
}

function generateString() {
  if (notes.length === 0) {
    return `<tr><td>You don't have any tasks</td></tr>`;
  } else {
    let string = '';
    notes.map(({ name, time, id, category }) => {
      string += `<tr><td>${time}</td><td>${name}</td><td>${category}</td><td>Dates</td><td><button class="delete btn btn-danger" onClick="deleteItem(${id})">X</button></td>  </tr>`;
    });
    return string;
  }
}

function updateList() {
  let listText = generateString();
  list.innerHTML = listText;
  elementsCounter = notes.length;
  console.log(notes);
}

updateList();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let time = new Date().toLocaleTimeString().slice(0, -3);
  let data = e.target.elements;
  notes.push({
    name: data[0].value,
    time,
    category: data[1][data[1].options.selectedIndex].label,
    id: elementsCounter,
  });
  updateList();
});
