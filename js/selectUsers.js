'use strict';

function selectUsers () {
  const userCards = document.getElementsByClassName('userListItem');
  for (const el of userCards) {
    el.addEventListener('click', backlight);
  }
  if (!!document.querySelector('.fullNameContainer')) {
    document.querySelector('.fullNameContainer').remove();
  } // для удаления списка со страницы при смене страницы

  const selectedUsers = document.createElement('ul');

  if (selectedUsers.hasChildNodes()) {
    selectedUsers.remove();
  }

  selectedUsers.classList.add('fullNameContainer');
  document.getElementById('root').prepend(selectedUsers);

  function backlight (e) {
    const namesList = selectedUsers.children;
    const fullNameItem = document.createElement('li');
    if (this.hasAttribute('style')) {
      this.removeAttribute('style');
      for (const i of namesList) {
        if (i.innerText === this.querySelector('.fullName').innerText) {
          i.remove();
        }
      }
    } else {
      this.style.boxShadow = '0px 0px 25px red';
      fullNameItem.innerText = this.querySelector('.fullName').innerText;
      selectedUsers.append(fullNameItem);
    }
  }
}

export default selectUsers;
