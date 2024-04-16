// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Function to generate a unique task id
function generateTaskId() {
  return nextId++; // Increment nextId and return it
}

// Function to check for tasks nearing the deadline within 2 days or overdue
function getDueColorClass(dueDate) {
  const today = dayjs();
  const dueDateObj = dayjs(dueDate);
  const daysRemaining = dueDateObj.diff(today, 'days');
  
  if (daysRemaining < 0) {
    return 'bg-danger'; // Red for overdue
  } else if (daysRemaining <= 3 && daysRemaining >= 0) {
    return 'bg-warning'; // Yellow for nearing deadline
  } else {
    return ''; // No color class for tasks further out
  }
}

// Function to create a task card
function createTaskCard(task) {
  let dueColorClass = getDueColorClass(task.dueDate);  // Call getDueColorClass to get the class
  // Check if task is in "done" lane
  if (task.status === "done") {
    dueColorClass = ""; // Remove any color class for done tasks
  }
  const cardTemplate = `
  <div class="card mb-2 task-card ${dueColorClass}" data-task-id="${task.id}" card-with-due-date">
    <div class="card-body">
      <h5 class="card-title">${task.title}</h5>
      <p class="card-text">${task.description || ""}</p>
      <p class="card-text"><small class="text-muted">Due: ${dayjs(task.dueDate).format("YYYY-MM-DD")}</small></p>
      <button type="button" class="btn btn-sm btn-danger float-end delete-task">Delete</button>
    </div>
  </div>`;
  return cardTemplate;
}

// Function to render the task list and make cards draggable
function renderTaskList() {
  // Clear existing cards
  $("#todo-cards").empty(); 
  $("#in-progress-cards").empty();
  $("#done-cards").empty();

  taskList.forEach((task) => {
    const card = createTaskCard(task);
    const lane = task.status === "to-do" ? "#todo-cards" : task.status === "in-progress" ? "#in-progress-cards" : "#done-cards";
    $(lane).append(card);
  });

  // Make cards draggable
  $(".task-card").draggable({
    containment: ".swim-lanes",
    revert: true,
  });
}

// Function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault(); // Prevent form submission

  const title = $("#taskName").val();
  const description = $("#taskDescription").val() || "";
  const dueDate = $("#dueDate").val();
  const formattedDate = dayjs(dueDate, "MM-DD-YYYY", true).format("YYYY-MM-DD"); // Attempt to parse with MM-DD-YYYY
  
  if (!title) {
    alert("Please enter a task title!");
    return;
  }

  const newTask = {
    id: generateTaskId(),
    title,
    description,
    dueDate: formattedDate,
    status: "to-do", // Default status
  };

  taskList.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  localStorage.setItem("nextId", JSON.stringify(nextId));

  renderTaskList(); // Update task list

  $("#taskForm").trigger("reset"); // Reset form
}

// Function to handle deleting a task
function handleDeleteTask(event) {
  const taskId = $(event.currentTarget).closest(".task-card").data("taskId");

  const taskIndex = taskList.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    taskList.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(taskList));

    renderTaskList(); // Update task list

    // Remove the card element from DOM
    $(event.currentTarget).closest(".task-card").remove();
  }
}

// Function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const taskId = ui.draggable.data("taskId");
  let newStatus = $(event.target).closest(".lane").attr("id"); // Get lane id

  // Map lane id to task status
  if (newStatus === "todo-cards") {
    newStatus = "to-do";
  } else if (newStatus === "in-progress-cards") {
    newStatus = "in-progress";
  } else if (newStatus === "done-cards") {
    newStatus = "done";
  }

  const task = taskList.find((task) => task.id === taskId);
  if (task) {
    task.status = newStatus;
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }

  renderTaskList();
}
// When the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  // Render the initial task list
  renderTaskList();

  // Add event listeners
  $("#taskForm").submit(handleAddTask);
  $(".task-card").on("click", ".delete-task", handleDeleteTask);
  $(".lane").droppable({
    accept: ".task-card",
    drop: handleDrop,
  });
  // Make the due date field a date picker
  $("#dueDate").datepicker();
});
