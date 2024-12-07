import Task from "./Task.js"
import TaskManager from "./TaskManager.js"
import TaskApp from "./TaskApp.js"

document.addEventListener("DOMContentLoaded", () => {
    const taskManager = new TaskManager();
    new TaskApp(taskManager, "#task-app");
  });  