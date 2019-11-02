let todos = [];
const $input = document.querySelector('#add-input');
const $addBtn = document.querySelector('#add-btn');
const $todos = document.querySelector('#todos');


const render = function () {
  let html = ''; // innerHtml은 문자열을 받으므로 text로 받는다.

  todos.forEach(todo => { // todos를 참조할 수 있다. 전역 변수이기 때문에
    html += `
      <li id="${todo.id}">
        <label class="check-label">
          <input type="checkbox" class="check-complete" ${todo.completed ? 'checked' : ''}>
          <span class="content">${todo.content}</span>
        </label>
        <button type="button" class="delete-button">X</button>
      </li>
    `;
  });


  $todos.innerHTML = html;
};

const getTodo = function () {
  // TODO: 서버로부터 todos 데이터를 취득
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false }
  ];

  render();
};

const addTodo = function () {
  const value = $input.value.trim();

  if (value === '') return alert('해야할 일을 입력해주세요.');

  const num = Math.max(0, ...todos.map(todo => todo.id)) + 1;

  todos = [...todos, { id:num, content: value, completed: false }];

  $input.value = '';
  $input.focus();
};

const addTodoEnter = function (e) {
  if (e.keyCode !== 13) return;

  addTodo();
  render();
};

const addTodoClick = function () {
  addTodo();
  render();
};

const toggleComplete = function (e) {
  const id = e.target.parentNode.parentNode.id;

  todos = todos.map(todo => todo.id === +id ? { ...todo, completed : !todo.completed } : todo);

  render();
};

const removeTodo = function (e) {
  if (!e.target.classList.contains('delete-button')) return;

  const id = e.target.parentNode.id;

  todos = todos.filter(todo => todo.id !== +id);

  render();
};


// Events
window.onload = getTodo;
$input.onkeyup = addTodoEnter;
$addBtn.onclick = addTodoClick;
$todos.onchange = toggleComplete;
$todos.onclick = removeTodo;