// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
// Get HTML elements using JSON
const createTaskBtn = $('#create-btn');
const addTaskPrompt = $(".task-prompt");
const addTaskBtn = $("#add-btn");
const taskTitle = $("#title");
const taskDesc = $("#desc");
const taskDate = $("#date");
const toDoContainer = $("#todo-cards");
const inProgContainer = $("#in-progress-cards");
const doneContainer = $("#done-cards");
const swimLanes = $(".lane");
const dragTasks = $(".ui-draggable");
// Variables
let uniqueID = 0;
let toDoArr = [];
let inProgressArr = [];
let doneArr = [];

// Todo: create a function to generate a unique task id
function generateTaskId() {
    uniqueID++;

    return uniqueID;
}

// Todo: create a function to create a task card
function createTaskCard() {
    $(addTaskPrompt).dialog("open");
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList(container, array) {
    container.text('');
    for (i = 0; i < array.length; i++) {
        renderCard(container, array[i]);
    }
}

function renderCard(container, task) {
    // Create HTML elements 
    const cardContainer = $('<div></div>');
    const cardID = $('</p>');
    const cardTitle = $('</p>');
    const cardDesc = $('</p>');
    const cardDate = $('</p>');
    // Create delete button
    const deleteBtn = $('<input/>', {
        type: "button",
        id: "delete-btn",
        value: "Delete Task"
    });
    // Add text and class
    cardContainer.addClass('card');
    cardContainer.text(task.id);
    cardTitle.text(task.title);
    cardDesc.text(task.desc);
    cardDate.text(task.date);
    // Make card draggable
    cardContainer.draggable({
        opacity: 0.7,
        zIndex: 100,
        // This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
        helper: function (event) {
            // Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
            const original = $(event.target).hasClass('ui-draggable')
                ? $(event.target)
                : $(event.target).closest('.ui-draggable');
            // Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
            return original.clone().css({
                width: original.outerWidth(),
            });
        }
    })
    // Append text & button
    container.append(cardContainer);
    cardContainer.append(cardID);
    cardContainer.append(cardTitle);
    cardContainer.append(cardDesc);
    cardContainer.append(cardDate);
    cardContainer.append(deleteBtn);
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    $(addTaskPrompt).dialog("close");

    console.log(taskTitle.val(), taskDate.val(), taskDesc.val())
    const title = taskTitle.val();
    const desc = taskDesc.val();
    const date = taskDate.val();
    const id = generateTaskId();
    const status = "to-do";

    const taskObject = {
        id,
        title,
        desc,
        date,
        status
    }

    toDoArr.push(taskObject);

    renderTaskList(toDoContainer, toDoArr);
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event, array, id) {
    event.preventDefault();
    console.log("delete");

    const target = event.target;
    const parent = target.parentNode;
    parent.remove();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // Dialog parameters are set and is hidden by default
    $(addTaskPrompt).dialog({
        // Prompt is closed on init
        autoOpen: false,
        // UI is not interactable when dialog is open
        modal: true,
        resizable: false,
        position: { my: "center center", at: "center center", of: ".header-elements" }
    });

    // Event on "Create Task" button
    createTaskBtn.on('click', createTaskCard);

    // Event on "Add Task" button
    addTaskBtn.on('click', handleAddTask);

    swimLanes.droppable({
        accept: '.draggable',
        drop: handleDrop(),
    });

    // swimLanes.each( function (lane) {
    //     lane.on("dragover", (event) => {
    //         event.preventDefault();
    //         console.log("heard");
    //     });
    // });
    
});

// Event listener for "Delete" button
$(document).on("click", "#delete-btn", handleDeleteTask);
