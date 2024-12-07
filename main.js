import TaskManager from "./TaskManager.js"
import TaskApp from "./TaskApp"

document.addEventListener("DOMContentLoaded", () => {
    const taskManager = new TaskManager();
    new TaskApp(taskManager, "#task-app");
  });  