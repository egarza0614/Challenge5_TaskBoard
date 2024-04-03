// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

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
