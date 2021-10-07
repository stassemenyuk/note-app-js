import { updateList } from './renderFunctions';
import { addItem, handleVisibility } from './itemHandlers';

const form = document.querySelector('.form'),
  createBtn = document.querySelector('.create'),
  closeBtn = document.querySelector('.close-form'),
  getArchiveBtn = document.querySelector('.get-archived'),
  archiveBlock = document.querySelector('.archive-block');

updateList();

form.addEventListener('submit', addItem);

handleVisibility(createBtn, form);
handleVisibility(getArchiveBtn, archiveBlock);

closeBtn.addEventListener('click', () => {
  form.classList.add('hide');
});
