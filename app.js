let id = 0;
let toDos = [];

function onReady() {
   const addToDoForm = document.getElementById('addToDoForm');

   function createNewToDo() {
    const newToDoText = document.getElementById('newToDoText');
      if (!newToDoText.value) { return; }
      toDos.push({
      title: newToDoText.value,
      complete: false,
      id: ++id,
    });
      newToDoText.value = '';

      renderTheUI();
  }

  addToDoForm.addEventListener('submit', event => {
    event.preventDefault();
    createNewToDo();
  });

  function renderTheUI() {
    const toDoList = document.getElementById('toDoList');

      toDoList.textContent = '';

      toDos.forEach(function(toDo) {
      const newLi = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = "checkbox";

      const deleteButton = document.createElement ('button');
      deleteButton.textContent = "Delete";

      deleteButton.addEventListener('click', event => {
      toDos = toDos.filter(function(item){
        return item.id !== toDo.id;
      })
        renderTheUI();
      });

      newLi.textContent = toDo.title;

      toDoList.appendChild(newLi);
      newLi.appendChild(checkbox);
      newLi.appendChild(deleteButton);

    });
}
}

window.onload = function() {
  onReady();
};
