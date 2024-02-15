// Начальное состояние
let todos = [];

// Функция отрисовки списка задач с учетом фильтрации
function renderTodoList(filteredTodos) {
  const todoListElement = document.getElementById('todoList');
  todoListElement.innerHTML = '';

  filteredTodos.forEach(todo => {
      const todoItem = document.createElement('li');

      const todoTitle = document.createElement('h3');
      todoTitle.textContent = todo.title;
      todoItem.appendChild(todoTitle);

      const todoText = document.createElement('p');
      todoText.textContent = todo.text;
      todoItem.appendChild(todoText);

      if (todo.completed) {
          todoItem.style.textDecoration = 'line-through';
      }

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Удалить';
      deleteButton.addEventListener('click', () => deleteTodoItem(todo.id));

      const toggleButton = document.createElement('button');
      toggleButton.textContent = 'Выполнена';
      toggleButton.addEventListener('click', () => toggleTodoItem(todo.id));

      todoItem.appendChild(deleteButton);
      todoItem.appendChild(toggleButton);

      todoListElement.appendChild(todoItem);
  });
}

// Функция добавления новой задачи
function addTodoItem(title, text) {
  const newTodo = {
      id: todos.length + 1,
      title: title, // Используем переданный заголовок
      text: text,  // Используем переданный текст
      completed: false
  };
  todos.push(newTodo);
  renderTodoList(todos); // Передаем отфильтрованные задачи
}

// Функция удаления задачи
function deleteTodoItem(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodoList();
}

// Функция отметки задачи как выполненной
function toggleTodoItem(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    renderTodoList(todos);
}

// Обработчик события для добавления новой задачи
document.getElementById('addTodoForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const title = document.getElementById('todoTitle').value; // Получаем значение из поля ввода заголовка
  const text = document.getElementById('todoText').value; // Получаем значение из поля ввода содержимого задачи
  addTodoItem(title, text); // Передаем и заголовок и текст в функцию добавления задачи
});

// Инициализация начального состояния
renderTodoList(todos);

// Функция фильтрации: все задачи
function filterAll() {
  renderTodoList(todos);
}

// Функция фильтрации: только активные задачи
function filterActive() {
  const activeTodos = todos.filter(todo => !todo.completed);
  renderTodoList(activeTodos);
}

// Функция фильтрации: только выполненные задачи
function filterCompleted() {
  const completedTodos = todos.filter(todo => todo.completed);
  renderTodoList(completedTodos);
}
