function onReady() {
  let storageThings = localStorage.getItem('toDoStorage');
  let id = 0;
  let toDos = [];
  if (storageThings != null) {
    toDos = JSON.parse(storageThings);
    for (var i = 0; i < toDos.length ; i++) {
      if (toDos[i].id > id) {
        id = toDos[i].id;
      }
    }
  }

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
    let toDoList = document.getElementById('toDoList');

      toDoList.textContent = '';

      toDos.forEach(function(toDo) {
      const newLi = document.createElement('li');
      let checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.checked = toDo.complete;

      checkbox.addEventListener('change', function() {
        if(this.checked) {
          toDo.complete = true;
        } else {
          toDo.complete = false;
        }
        localStorage.setItem('toDoStorage', JSON.stringify(toDos));
      })

      let deleteButton = document.createElement ('button');
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
