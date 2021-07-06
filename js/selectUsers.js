"use strict";

setTimeout(selectUsers, 500);

function selectUsers() {
	const userCards = document.getElementsByClassName("userListItem");
	for (const el of userCards) {
		el.addEventListener("click", backlight);
		// el.addEventListener("click", createNameList);
	}

	const selectedUsers = document.createElement("ul");
	selectedUsers.classList.add("fullNameContainer");
	document.getElementById("root").prepend(selectedUsers);

	function backlight(e) {
		const fullNameItem = document.createElement("li");
		if (this.hasAttribute("style")) {
			this.removeAttribute("style");
			fullNameItem.remove();
		} else {
			this.style.boxShadow = "0px 0px 25px red";
			fullNameItem.innerText = this.querySelector(".fullName").innerText;
			selectedUsers.append(fullNameItem);
		}
	}
}
