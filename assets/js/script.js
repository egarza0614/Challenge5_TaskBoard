// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return nextId++;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  // Create an HTML element (e.g., a div) for the task card
  const taskCard = document.createElement("div");
  taskCard.classList.add("task-card");
  taskCard.dataset.taskId = task.id; // Set a unique identifier for the task

  // Add task details (name, description, due date, etc.) to the taskCard
  // Example:
  taskCard.innerHTML = `
    <h3>${task.name}</h3>
    <p>${task.description}</p>
    <p>Due Date: ${task.dueDate}</p>
    <!-- Add other relevant task information here -->
  `;

  // Return the created task card
  return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const todoLane = document.getElementById("todo-cards");
    const inProgressLane = document.getElementById("in-progress-cards");
  
    // Clear existing cards
    todoLane.innerHTML = "";
    inProgressLane.innerHTML = "";
  
    // Render each task in the appropriate lane
    taskList.forEach((task) => {
      const taskCard = createTaskCard(task);
      if (task.status === "todo") {
        todoLane.appendChild(taskCard);
      } else if (task.status === "in-progress") {
        inProgressLane.appendChild(taskCard);
      }
    });
  
    // Make task cards draggable (use a library like jQuery UI)
    // Example:
    $(".task-card").draggable({
      // Set draggable options
      // ...
    });
  }

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
    const taskName = document.getElementById("taskName").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const dueDate = document.getElementById("dueDate").value;
  
    // Create a new task object
    const newTask = {
      id: generateTaskId(),
      name: taskName,
      description: taskDescription,
      dueDate: dueDate,
      status: "todo", // Initial status (you can change this as needed)
    };
  
    // Add the new task to the taskList
    taskList.push(newTask);
  
    // Save taskList and nextId to localStorage
    localStorage.setItem("tasks", JSON.stringify(taskList));
    localStorage.setItem("nextId", nextId);
  
    // Update the UI
    renderTaskList();
  
    // Close the modal (if you have one)
    $("#taskModal").modal("hide");
  }
  

// Todo: create a function to handle deleting a task
function handleDeleteTask(event, task_index) {
    // Access the task list (replace with your actual task storage logic)
    const tasks = todoList.tasks;
  
    // Check for invalid index
    if (task_index < 0 || task_index >= tasks.length) {
      console.error("Invalid task index");
      // Handle the error here, e.g., display an error message
      return;
    }
  
    // Remove the task from the list
    tasks.splice(task_index, 1);
  
    // Update the UI (replace with your UI framework's methods)
    todoList.render();
  }
  

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
