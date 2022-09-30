// ODEV PAGINATION KISIMLARINI ICERMEMEKTEDIR
renderHeader();

const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
const root = document.querySelector('#root');
const editModal = document.querySelector('#editModal');
let todos = [];
let todo;
let current_page = 1;
let title_counter = 0;
let id_counter = 0;
let status_counter = 0;
let userID_counter = 0;

const renderTodos = (page = 1) => {
  root.innerHTML = '';
  // todoları listele
  const table = document.createElement('table');
  table.setAttribute('class', 'table table-hover');

  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th scope="col">id</th>
      <th scope="col">Başlık</th>
      <th scope="col">Kullanıcı Id</th>
      <th scope="col">Durum</th>
      <th scope="col"></th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  const renderItem = (item) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.title}</td>
      <td>${item.userId}</td>
      <td>${item.completed ? 'Tamamlandı' : 'Yapılacak'}</td>
      <td>
        <button class="btn btn-xs btn-danger remove" data-id=${
          item.id
        }>Sil</button>
        <button class="btn btn-xs btn-warning edit" data-id=${
          item.id
        }>Düzenle</button>
      </td>
    `;
    tbody.appendChild(tr);
  };

  todos.slice(0, 15).forEach((item) => {
    renderItem(item);
  });

  table.appendChild(tbody);
  root.append(table);

  document.querySelectorAll('.remove').forEach((button) => {
    button.addEventListener('click', (e) => {
      const id = Number(e.currentTarget.getAttribute('data-id'));
      if (confirm('kaydı silmek istediğinize emin misiniz?')) {
        todos = todos.filter((x) => x.id !== id);
        renderTodos(current_page);
      }
    });
  });

  document.querySelectorAll('.edit').forEach((button) => {
    button.addEventListener('click', (e) => {
      const id = Number(e.currentTarget.getAttribute('data-id'));
      todo = todos.find((todo) => todo.id == id);
      editModal.querySelector('#title').value = todo.title;
      editModal.querySelector('#completed').checked = todo.completed;
      editModal.style.display = 'block';
      editModal.classList.add('show');
    });
  });

  thead.addEventListener('click', function (event) {
    const target = event.target;

    if (target.innerHTML === 'id') {
      id_counter++;

      if (id_counter % 2 === 0) {
        todos.sort((a, b) => {
          const x = a.id;
          const y = b.id;
          if (x < y) {
            return 1;
          }
          if (x > y) {
            return -1;
          }

          return 0;
        });
        renderTodos(current_page);
      }
      if (id_counter % 2 !== 0) {
        todos.sort((a, b) => {
          const x = a.id;
          const y = b.id;
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }

          return 0;
        });
        renderTodos(current_page);
      }
    }

    if (target.innerHTML === 'Başlık') {
      title_counter++;

      if (title_counter % 2 === 0) {
        todos.sort((a, b) => {
          const x = a.title.toUpperCase();
          const y = b.title.toUpperCase();
          if (x < y) {
            return 1;
          }
          if (x > y) {
            return -1;
          }

          return 0;
        });

        renderTodos(current_page);
      }
      if (title_counter % 2 !== 0) {
        todos.sort((a, b) => {
          const x = a.title.toUpperCase();
          const y = b.title.toUpperCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }

          return 0;
        });

        renderTodos(current_page);
      }
    }

    if (target.innerHTML === 'Durum') {
      status_counter++;

      if (status_counter % 2 === 0) {
        todos.sort((a, b) => {
          const x = a.completed;
          const y = b.completed;
          if (x < y) {
            return 1;
          }
          if (x > y) {
            return -1;
          }
          return 0;
        });
        renderTodos(current_page);
      }

      if (status_counter % 2 !== 0) {
        todos.sort((a, b) => {
          const x = a.completed;
          const y = b.completed;
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
        renderTodos(current_page);
      }
    }

    if (target.innerHTML === 'Kullanıcı Id') {
      userID_counter++;

      if (userID_counter % 2 === 0) {
        todos.sort((a, b) => {
          const x = a.userId;
          const y = b.userId;
          if (x < y) {
            return 1;
          }
          if (x > y) {
            return -1;
          }
          return 0;
        });
        renderTodos(current_page);
      }

      if (userID_counter % 2 !== 0) {
        todos.sort((a, b) => {
          const x = a.userId;
          const y = b.userId;
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
        renderTodos(current_page);
      }
    }
  });
};

editModal.querySelector('#save').addEventListener('click', () => {
  todo.title = editModal.querySelector('#title').value;
  todo.completed = editModal.querySelector('#completed').checked;
  const index = todos.findIndex((t) => t.id == todo.id);
  todos[index] = todo;
  renderTodos();
  editModal.style.display = 'none';
  editModal.classList.remove('show');
});

editModal.querySelectorAll('.close').forEach((button) => {
  button.addEventListener('click', () => {
    editModal.style.display = 'none';
    editModal.classList.remove('show');
  });
});

fetch(todosUrl)
  .then((resp) => resp.json())
  .then((data = []) => {
    todos = data;
    renderTodos();
  })
  .catch((error) => {
    errorLogger(error);
  });


// ODEV PAGINATION KISIMLARINI ICERMEMEKTEDIR
