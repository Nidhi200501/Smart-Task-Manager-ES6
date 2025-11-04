export default class Task {
  constructor(title, completed = false) {
    this.title = title;
    this.completed = completed;
    this.createdAt = new Date().toLocaleString();
  }

  toggle() {
    this.completed = !this.completed;
  }
}

export const fakeSaveToServer = (data = []) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Saved ${data.length} tasks to server`), 500);
  });
};