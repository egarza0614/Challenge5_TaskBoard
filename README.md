# Challenge5_TaskBoard | Eloy Garza

## Description
A simple task board application that allows a team to manage project tasks.

The link to my deployed github portfolio is: https://egarza0614.github.io/Challenge5_TaskBoard

## Usage
WHEN I open the task board
THEN the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed)

WHEN I view the task board for the project
THEN each task is color coded to indicate whether it is nearing the deadline (yellow) or is overdue (red)

WHEN I click on the button to define a new task
THEN I can enter the title, description and deadline date for the new task into a modal dialog

WHEN I click the save button for that task
THEN the properties for that task are saved in localStorage

WHEN I drag a task to a different progress column
THEN the task's progress state is updated accordingly and will stay in the new column after refreshing

WHEN I click the delete button for a task
THEN the task is removed from the task board and will not be added back after refreshing

WHEN I refresh the page
THEN the saved tasks persist

## Technologies Used
    - HTML
    - CSS
    - JavaScript
    - localStorage API
    - Day.js

## Mock-Up

The following image shows the web application's appearance:

![portfolio mockup](./assets/images/mockup_TaskBoard.png)

## License

[MIT © Eloy Garza](../LICENSE)
