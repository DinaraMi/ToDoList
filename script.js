// Начальное состояние списка задач
let todos = [];

// Функция отрисовки списка задач с учетом фильтрации
function renderTodoList(filteredTodos) {
    // Получаем элемент списка задач
    const todoListElement = document.getElementById('todoList');
    // Очищаем список перед отрисовкой новых задач
    todoListElement.innerHTML = '';

    // Перебираем отфильтрованные задачи для отображения
    filteredTodos.forEach(todo => {
        // Создаем элемент для каждой задачи
        const todoItem = document.createElement('li');

        // Создаем заголовок для задачи
        const todoTitle = document.createElement('h2');
        todoTitle.textContent = todo.title;
        todoItem.appendChild(todoTitle);

        // Создаем текст для задачи
        const todoText = document.createElement('p');
        todoText.textContent = todo.text;
        todoItem.appendChild(todoText);

        // Если задача выполнена, добавляем стиль зачеркивания
        if (todo.completed) {
            todoItem.style.textDecoration = 'line-through';
        }

        // Создаем обертку для кнопок
        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('button-wrapper');

        // Создаем кнопку удаления задачи
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.classList.add('delete-button');
        // Добавляем обработчик события для удаления задачи
        deleteButton.addEventListener('click', () => deleteTodoItem(todo.id));

        // Создаем кнопку для отметки задачи как выполненной
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Выполнена';
        toggleButton.classList.add('complete-button');
        // Добавляем обработчик события для отметки задачи как выполненной
        toggleButton.addEventListener('click', () => toggleTodoItem(todo.id));

        // Добавляем кнопки в обертку
        buttonWrapper.appendChild(deleteButton);
        buttonWrapper.appendChild(toggleButton);

        // Добавляем обертку с кнопками к элементу задачи
        todoItem.appendChild(buttonWrapper);

        // Добавляем элемент задачи в список
        todoListElement.appendChild(todoItem);
    });
}

// Функция добавления новой задачи
function addTodoItem(title, text) {
    // Создаем новую задачу
    const newTodo = {
        id: todos.length + 1,
        title: title, // Используем переданный заголовок
        text: text,   // Используем переданный текст
        completed: false
    };
    // Добавляем задачу в список
    todos.push(newTodo);
    // Обновляем отображение списка задач
    renderTodoList(todos);
}

// Функция удаления задачи
function deleteTodoItem(id) {
    // Фильтруем список задач, оставляя только те, чей ID не совпадает с ID задачи для удаления
    todos = todos.filter(todo => todo.id !== id);
    // Обновляем отображение списка задач
    renderTodoList(todos);
}

// Функция отметки задачи как выполненной
function toggleTodoItem(id) {
    // Проходим по списку задач и меняем статус выполнения у задачи с указанным ID
    todos = todos.map(todo => {
        if (todo.id === id) {
            // Копируем текущую задачу и изменяем ее статус выполнения
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    // Обновляем отображение списка задач
    renderTodoList(todos);
}

// Обработчик события для добавления новой задачи
document.getElementById('addTodoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Получаем значения из полей ввода для заголовка и текста задачи
    const titleInput = document.getElementById('todoTitle');
    const textInput = document.getElementById('todoText');
    const title = titleInput.value;
    const text = textInput.value;
    // Добавляем новую задачу с полученными значениями
    addTodoItem(title, text);
    // Очищаем поля ввода после добавления задачи
    titleInput.value = '';
    textInput.value = '';
});

// Инициализация начального состояния: отображение всех задач
renderTodoList(todos);

// Функция фильтрации: отображение всех задач
function filterAll() {
    renderTodoList(todos);
}

// Функция фильтрации: отображение только активных задач
function filterActive() {
    const activeTodos = todos.filter(todo => !todo.completed);
    renderTodoList(activeTodos);
}

// Функция фильтрации: отображение только выполненных задач
function filterCompleted() {
    const completedTodos = todos.filter(todo => todo.completed);
    renderTodoList(completedTodos);
}
