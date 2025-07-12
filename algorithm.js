// Global List
let tasks = [];
let filt = true;

// Function to add a task
function addTask() {
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date-input');

    // Validate inputs
    if (taskInput.value === '' || dueDateInput.value === '') {
        alert('Please fill in both task and due date.');
    } else {
        // Create a new task object
        const newTask = {
            id: Date.now(), // Unique ID based on current timestamp
            task: taskInput.value,
            dueDate: dueDateInput.value,
            completed: false
        };

        // Add the new task to the tasks array
        tasks.push(newTask);

        // Clear the input fields
        taskInput.value = '';
        dueDateInput.value = '';

        // Log the new task (for demonstration purposes)
        displayTasks();
    }
}

function displayTasks() {
    const taskList = document.getElementById('task-list'); 
    taskList.innerHTML = ''; // Clear the current list
    if (tasks.length > 0) {
        tasks.forEach(element => {
            const taskItem = `
            <tr>
                    <td class="task-0 bg-gray-200 border p-[4px] w-[1000px] whitespace-normal break-words">${element.task}</td>
                    <td class="duedate-0 bg-gray-200 border p-[4px] text-center">${element.dueDate}</td>
                    <td class="status-0 bg-gray-200 border p-[4px]">
                        <button class="bg-green-500 text-white p-[4px] rounded" onclick="toggleTaskCompletion(${element.id})">
                            ${element.completed ? 'Undo' : 'Complete'}
                        </button>
                    </td>
                    <td class="actions-0 bg-gray-200 border p-[4px]">
                        <button class="bg-red-500 text-white p-[4px] rounded" onclick="deleteTask(${element.id})">Delete</button>
                    </td>
            </tr>
            `;
            taskList.innerHTML += taskItem;
        });
    } else {
        taskList.innerHTML = `
        <tr>
            <td colspan="4" class="empty-0 border p-[4px] text-center bg-gray-200">
                Task is Empty!
            </td>
        </tr>
    `;
    }
}

// Function to delete a specific task
function deleteTask(id) {
    // Find the index of the task to delete
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        // Remove the task from the tasks array
        tasks.splice(taskIndex, 1);
        displayTasks(); // Refresh the displayed task list
    }
}

// Function to delete all task
function deleteAllTasks() {
    tasks = []; // Clear the tasks array
    displayTasks(); // Refresh the displayed task list
}

function toggleTaskCompletion(id) {
    // Find the task by ID
    const task = tasks.find(task => task.id === id);
    if (task) {
        // Toggle the completed status
        task.completed = !task.completed;
        displayTasks(); // Refresh the displayed task list
    }
}

// Function to filter task
function filterTasks() {
    if(filt) {
        tasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate)); //waktu terdekat
    } else {
        tasks.sort((a, b) => b.dueDate.localeCompare(a.dueDate)); //waktu terlama
    }
    filt = !filt;
    displayTasks();

}