import Task, { fakeSaveToServer } from './task.js';

class TaskManager {
  constructor() {
    this.tasks = [];
    this.listEl = document.getElementById('taskList');
    this.inputEl = document.getElementById('taskInput');
    this.addBtn = document.getElementById('addBtn');

    this.addBtn.addEventListener('click', () => this.addTask());
  }

  addTask = (title = this.inputEl.value.trim()) => {
    if (!title) return;

    const newTask = new Task(title);
    this.tasks = [...this.tasks, newTask]; 

    this.renderTasks();
    this.inputEl.value = '';
    this.saveTasks();
  };

  toggleTask = (index) => {
    const [task] = [this.tasks[index]]; 
    task.toggle();
    this.renderTasks();
    this.saveTasks();
  };

  deleteTask = (index) => {
    this.tasks = this.tasks.filter((_, i) => i !== index);
    this.renderTasks();
    this.saveTasks();
  };

  async saveTasks() {
    const msg = await fakeSaveToServer(this.tasks);
    console.log(msg);
  }

  renderTasks() {
    this.listEl.innerHTML = this.tasks
      .map(
        ({ title, completed, createdAt }, i) => `
        <li class="${completed ? 'done' : ''}">
          <span>${title} <small>(${createdAt})</small></span>
          <div>
            <button onclick="app.toggleTask(${i})">✔</button>
            <button class="delete" onclick="app.deleteTask(${i})">✖</button>
          </div>
        </li>`
      )
      .join('');
  }
}

let app = new TaskManager();
window.app = app;