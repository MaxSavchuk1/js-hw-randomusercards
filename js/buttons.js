const renderButtons = (options, loadUsers) => {
  const [btnFirst, btnPrev, btnNext] = document.querySelectorAll('button');
  btnPrev.addEventListener('click', btnPrevHandler);
  btnNext.addEventListener('click', btnNextHandler);
  btnFirst.addEventListener('click', btnFirstHandler);

  function currentPage () {
    document.querySelector('span').innerText = options.page;
    loadUsers(options);
  }

  function btnFirstHandler (e) {
    if (options.page > 1) {
      options.page = 1;
      currentPage();
    }
  }

  function btnPrevHandler (e) {
    if (options.page > 1) {
      options.page--;
      currentPage();
    }
  }

  function btnNextHandler (e) {
    options.page++;
    currentPage();
  }
};
export default renderButtons;
