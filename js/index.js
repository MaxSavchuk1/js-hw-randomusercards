'use strict';

import renderButtons from './buttons.js';
import selectUsers from './selectUsers.js';

const options = {
  results: 10,
  seed: 'abc',
  page: 1,
};

loadUsers(options);
renderButtons(options, loadUsers);

function loadUsers ({ results, seed, page }) {
  fetch(
    `https://randomuser.me/api/?results=${results}&seed=${seed}&page=${page}`
  )
    .then(response => response.json())
    .then(({ results }) => renderUsers(results));
}

function renderUsers (users) {
  const userList = document.querySelector('.userList');
  if (userList) {
    userList.remove();
  }

  const newUserList = document.createElement('ul');
  newUserList.classList.add('userList');
  document.getElementById('root').prepend(newUserList);

  const liUserCollection = users.map(user => createUserListItem(user));
  newUserList.append(...liUserCollection);
  selectUsers();
}

function createUserListItem ({
  gender,
  name: { first: firstName, last: lastName },
  location: { city, state },
  email,
  phone,
  dob: { age: userAge },
  picture: { large: userImageSrc },
}) {
  const userListItem = document.createElement('li');
  userListItem.classList.add('userListItem');

  userListItem.append(createUserImage(userImageSrc));
  userListItem.append(createUserFullName(firstName, lastName));
  userListItem.append(
    createUserInfo(userAge, city, state, email, phone, gender)
  );
  userListItem.append(styleDependOfGender(gender));

  return userListItem;
}

function createUserImage (userImageSrc) {
  const img = new Image();
  img.classList.add('userProfileImage');
  img.src = userImageSrc;
  img.alt = 'user profile image';
  return img;
}

function createUserFullName (firstName, lastName) {
  const div = document.createElement('div');
  div.classList.add('fullName');
  div.innerText = `${firstName} ${lastName}`;
  return div;
}

function createUserInfo (userAge, city, state, email, phone) {
  const div = document.createElement('div');
  div.classList.add('userInformation');
  div.innerText = `${userAge} years old
                    living in ${city}, ${state}

                    ${email}
                    \u260F  ${phone}`;
  return div;
}

function styleDependOfGender (gender) {
  const imgBg = new Image();
  imgBg.alt = 'bgimage';
  imgBg.classList.add('bgListImage');
  if (gender === 'male') {
    imgBg.src = './img/сosmos.jpg';
  } else {
    imgBg.src = './img/flowers.jpg';
  }
  return imgBg;
}
