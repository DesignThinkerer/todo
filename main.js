import Task from "./Task"
import TaskManager from "./TaskManager"
import TaskApp from "./TaskApp"

document.addEventListener("DOMContentLoaded", () => {
    const taskManager = new TaskManager();
    new TaskApp(taskManager, "#task-app");
  });  