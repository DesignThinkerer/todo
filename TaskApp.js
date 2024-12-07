export default class TaskApp {
    constructor(taskManager, containerSelector) {
      this.taskManager = taskManager;
      this.container = document.querySelector(containerSelector);
      this.errorMessage = this.container.querySelector("#error-message");
  
      this.container.querySelector("#add-task-button").addEventListener("click", () => this.handleAddTask());
      this.container.querySelector("#new-task-input").addEventListener("keydown", (event) => {
        if (event.key === "Enter") this.handleAddTask();
      });
    }
  
    handleAddTask() {
      const input = this.container.querySelector("#new-task-input");
      const taskTitle = input.value.trim();
  
      if (taskTitle) {
        const task = this.taskManager.addTask(taskTitle);
        if (task) {
          this.renderTasks();
          input.value = "";
          input.focus();
          this.hideErrorMessage();
        }
      } else {
        this.showErrorMessage("Veuillez entrer une tâche valide !");
      }
    }
  
    handleRemoveTask(taskId) {
      this.taskManager.removeTask(taskId);
      this.renderTasks();
    }
  
    handleToggleTaskCompletion(taskId) {
      this.taskManager.toggleTaskCompletion(taskId);
      this.renderTasks();
    }
  
    handleKeyboardNavigation(event, taskId) {
      const tasks = Array.from(this.container.querySelectorAll(".task-item"));
      const currentIndex = tasks.findIndex(task => task.getAttribute("data-id") === taskId);
      let nextIndex;
  
      switch (event.key) {
        case "ArrowUp":
          nextIndex = currentIndex - 1;
          break;
        case "ArrowDown":
          nextIndex = currentIndex + 1;
          break;
        case "Enter":
          tasks[currentIndex].querySelector("input[type='checkbox']").click();
          event.preventDefault();
          return;
        case "Delete":
        case "Backspace":
          tasks[currentIndex].querySelector(".delete-task").click();
          return;
        default:
          return;
      }
  
      if (nextIndex >= 0 && nextIndex < tasks.length) {
        tasks[nextIndex].focus();
        event.preventDefault();
      }
    }
  
    showErrorMessage(message) {
      this.errorMessage.textContent = message;
      this.errorMessage.classList.remove("hidden");
    }
  
    hideErrorMessage() {
      this.errorMessage.classList.add("hidden");
    }
  
    renderTasks() {
      const taskList = this.container.querySelector("#task-list");
      taskList.innerHTML = "";
  
      this.taskManager.tasks.forEach(task => {
        const taskElement = document.createElement("li");
        taskElement.className = `task-item flex justify-between items-center bg-gray-100 p-2 rounded shadow-sm mb-2`;
        taskElement.setAttribute("data-id", task.id);
        taskElement.setAttribute("tabindex", "0");
  
        taskElement.innerHTML = `
          <label class="flex items-center gap-2">
            <input type="checkbox" class="h-5 w-5 text-blue-600" ${task.isCompleted ? "checked" : ""}>
            <span class="text-gray-800 ${task.isCompleted ? "line-through text-gray-500" : ""}">
              ${task.title}
            </span>
          </label>
          <button class="delete-task text-red-500 hover:text-red-700 flex items-center gap-1">
            <span class="material-icons">delete</span> Supprimer
          </button>
        `;
  
        taskElement.querySelector(".delete-task").addEventListener("click", () => this.handleRemoveTask(task.id));
        taskElement.querySelector("input[type='checkbox']").addEventListener("change", () => this.handleToggleTaskCompletion(task.id));
        
        taskElement.addEventListener("keydown", (event) => this.handleKeyboardNavigation(event, task.id));
  
        taskList.appendChild(taskElement);
      });
    }
  }
  