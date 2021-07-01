"use strict";

const options = {
  results: 10,
  seed: "abc",
  page: 1,
};

loadUsers(options);

///****кнопки****/
const [btnFirst, btnPrev, btnNext] = document.querySelectorAll("button");
btnPrev.addEventListener("click", btnPrevHandler);
btnNext.addEventListener("click", btnNextHandler);
btnFirst.addEventListener("click", btnFirstHandler);

function currentPage() {
  document.querySelector("span").innerText = options.page;
  loadUsers(options);
}

function btnFirstHandler(e) {
  if (options.page > 1) {
    options.page = 1;
    currentPage();
  }
}

function btnPrevHandler(e) {
  if (options.page > 1) {
    options.page--;
    currentPage();
  }
}

function btnNextHandler(e) {
  options.page++;
  currentPage();
}
///****конец кнопок****/

function loadUsers({ results, seed, page }) {
  fetch(
    `https://randomuser.me/api/?results=${results}&seed=${seed}&page=${page}`
  )
    .then((response) => response.json())
    .then(({ results }) => renderUsers(results));
}

function renderUsers(users) {
  const userList = document.querySelector(".userList");
  if (userList) {
    userList.remove();
  }

  const newUserList = document.createElement("ul");
  newUserList.classList.add("userList");
  document.getElementById("root").prepend(newUserList);

  const liUserCollection = users.map((user) => createUserListItem(user));
  newUserList.append(...liUserCollection);
}

function createUserListItem({
  gender,
  name: { first: firstName, last: lastName },
  location: { city, state },
  email,
  phone,
  dob: { age: userAge },
  picture: { large: userImageSrc },
}) {
  const userListItem = document.createElement("li");
  userListItem.classList.add("userListItem");

  userListItem.append(createUserImage(userImageSrc));
  userListItem.append(createUserFullName(firstName, lastName));
  userListItem.append(
    createUserInfo(userAge, city, state, email, phone, gender)
  );
  userListItem.append(styleDependOfGender(gender));

  return userListItem;
}

function createUserImage(userImageSrc) {
  const img = new Image();
  img.classList.add("userProfileImage");
  img.src = userImageSrc;
  img.alt = "user profile image";
  return img;
}

function createUserFullName(firstName, lastName) {
  const div = document.createElement("div");
  div.classList.add("userInformation");
  div.style.fontSize = "2em";
  div.innerText = `${firstName} ${lastName}`;
  return div;
}

function createUserInfo(userAge, city, state, email, phone) {
  const div = document.createElement("div");
  div.classList.add("userInformation");
  div.innerText = `${userAge} years old
                    living in ${city}, ${state}

                    ${email}
                    \u260F  ${phone}`;
  return div;
}

function styleDependOfGender(gender) {
  const imgBg = new Image();
  imgBg.alt = "bgimage";
  imgBg.classList.add("bgListImage");
  if (gender === "male") {
    imgBg.src = "./img/сosmos.jpg";
  } else {
    imgBg.src = "./img/flowers.jpg";
  }
  return imgBg;
}

// Скоро будет... * Сдалать возможным выбирать несколько карточек, список полных имен выбранных юзеров приводить в строку сверху. Выбранные карточки подсвечивать.

