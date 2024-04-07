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
// variables
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

function renderCard(container, array) {
    const cardContainer = $('<div></div>');
    const cardID = $('</p>');
    const cardTitle = $('</p>');
    const cardDesc = $('</p>');
    const cardDate = $('</p>');
    
    cardContainer.addClass('card');
    cardTitle.addClass('card-title');
    cardContainer.text(array.id);
    cardTitle.text(array.title);
    cardDesc.text(array.desc);
    cardDate.text(array.date);

    cardContainer.draggable({
        opacity: 0.7,
        zIndex: 100,
        // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
        helper: function (e) {
            // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
            const original = $(e.target).hasClass('ui-draggable')
                ? $(e.target)
                : $(e.target).closest('.ui-draggable');
            // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
            return original.clone().css({
                width: original.outerWidth(),
            });
        }
    })

    container.append(cardContainer);
    cardContainer.append(cardID);
    cardContainer.append(cardTitle);
    cardContainer.append(cardDesc);
    cardContainer.append(cardDate);
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    console.log(taskTitle.val(), taskDate.val(), taskDesc.val())
    const title = taskTitle.val();
    const desc = taskDesc.val();
    const date = taskDate.val();
    const id = generateTaskId();

    const taskObject = {
        id,
        title,
        desc,
        date,
    }

    toDoArr.push(taskObject);

    renderTaskList(toDoContainer, toDoArr);
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

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

    // Event on "Add Task" button
    createTaskBtn.on('click', function () {
        createTaskCard();
    });

    addTaskBtn.on('click', handleAddTask);
});
