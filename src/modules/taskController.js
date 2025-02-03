//===========================================================
// Imports
//===========================================================
import { Task } from './task';
import { format } from 'date-fns';

import { projectController } from './projectController';

import checkIcon from '../icons/check.svg';
import trashIcon from '../icons/trash.svg';

export function taskController() {
	//===========================================================
	// Helper Functions
	//===========================================================
	// Task Local Storage
	const saveData = () => {
		localStorage.setItem('tasks', JSON.stringify(Task.tasks));
	};

	const loadData = () => {
		const taskData = JSON.parse(localStorage.getItem('tasks'));
		if (taskData) {
			Task.tasks.splice(0, Task.tasks.length, ...taskData.map(Task.fromJSON));
			Task.tasks.forEach((task, index) => {
				renderTask(task, index);
			});
		}
	};

	// Dialog Setup
	const addTaskEventListener = () => {
		document
			.querySelector('.submit-task')
			.addEventListener('click', submitTaskInfo);
	};

	const taskSetupDialog = () => {
		const showButton = document.querySelector('.task-window');
		const closeButton = document.querySelector('.close');

		showButton.addEventListener('click', () => taskDialog.showModal());

		closeButton.addEventListener('click', () => taskDialog.close());

		addTaskEventListener();
	};

	// Task Maker
	const renderTask = (task, index) => {
		const taskItem = document.createElement('li');
		taskItem.classList.add('task-item');
		taskItem.dataset.index = index;

		if (task.isCompleted) {
			taskItem.classList.add('completed');
		}

		const infoDiv = document.createElement('div');

		const title = document.createElement('h1');
		title.classList.add('prevent-select');
		title.textContent = task.title;

		const dueDate = document.createElement('p');
		dueDate.textContent = format(Date.parse(task.dueDate), 'dd.MM.yyyy');
		dueDate.classList.add('prevent-select');

		switch (task.priority) {
			case 'Low':
				taskItem.classList.add('low');
				break;
			case 'Medium':
				taskItem.classList.add('medium');
				break;
			case 'High':
				taskItem.classList.add('high');
				break;
		}

		infoDiv.append(title, dueDate);

		const iconDiv = document.createElement('div');
		iconDiv.classList.add('icons');

		const check = document.createElement('img');
		check.classList.add('check-icon');
		check.src = checkIcon;

		const trash = document.createElement('img');
		trash.classList.add('trash-icon');
		trash.src = trashIcon;

		iconDiv.append(check, trash);

		taskItem.append(infoDiv, iconDiv);

		taskList.appendChild(taskItem);
	};

	function submitTaskInfo(e) {
		e.preventDefault();

		const taskForm = document.getElementById('task-form');
		const titleInput = document.getElementById('title');
		const descriptionInput = document.getElementById('description');
		const dueDateInput = document.getElementById('due-date');
		const priorityInput = document.querySelector(
			'input[name="priority"]:checked'
		);
		const projectInput = document.getElementById('project');

		if (!titleInput.value || !dueDateInput.value) return;

		const priority = priorityInput ? priorityInput.value : 'Low';

		const newTask = new Task(
			titleInput.value,
			descriptionInput.value,
			dueDateInput.value,
			priority,
			projectInput.value
		);
		Task.tasks.push(newTask);

		taskSort();

		const currentProject = document.getElementById('project-name').textContent;
		projectController().filterTasksByProject(currentProject);

		saveData();
		taskForm.reset();
		taskDialog.close();
	}

	const showInfoCard = () => {
		const modal = document.getElementById('information');
		const close = document.querySelector('.close-modal');

		modal.style.display = 'block';

		close.addEventListener('click', function () {
			modal.style.display = 'none';
			taskContent.textContent = '';
		});

		window.addEventListener(
			'click',
			function (e) {
				if (e.target === modal) {
					modal.style.display = 'none';
					taskContent.textContent = '';
				}
			},
			{ once: true }
		);
	};

	function printTaskInfo(e) {
		if (
			e.target.classList.contains('task-item') ||
			e.target.classList.contains('prevent-select')
		) {
			const taskToOpen = e.target.closest('.task-item');

			if (!taskToOpen) return;

			const taskIndex = taskToOpen.dataset.index;
			let task = Task.tasks[taskIndex];

			const title = document.createElement('h1');
			title.textContent = `${task.title}`;

			const description = document.createElement('p');
			description.textContent = `Description: ${task.description}`;

			const dueDate = document.createElement('p');

			dueDate.textContent = `Due: ${format(
				Date.parse(task.dueDate),
				'dd.MM.yyyy'
			)}`;

			const priority = document.createElement('p');
			priority.textContent = `Priority: ${task.priority}`;

			taskContent.append(title, description, dueDate, priority);

			showInfoCard();
		}
	}

	const openTask = () => {
		taskList.addEventListener('click', printTaskInfo);
	};

	// Task Completion
	function markComplete(e) {
		if (e.target.classList.contains('check-icon')) {
			const completedTask = e.target.closest('.task-item');
			const taskIndex = completedTask.dataset.index;
			Task.tasks[taskIndex].markComplete();
			completedTask.classList.toggle('completed');
		}
		saveData();
	}

	const completeTask = () => {
		taskList.addEventListener('click', markComplete);
	};

	// Task Deletion
	function markDelete(e) {
		if (e.target.classList.contains('trash-icon')) {
			const deletedTask = e.target.closest('.task-item');
			const taskIndex = deletedTask.dataset.index;

			Task.tasks.splice(taskIndex, 1);
			taskList.removeChild(deletedTask);

			Array.from(document.querySelectorAll('.task-item')).forEach(
				(task, index) => {
					task.dataset.index = index;
				}
			);
		}
		saveData();
	}

	const deleteTask = () => {
		taskList.addEventListener('click', markDelete);
	};

	// Sort Tasks
	const taskSort = () => {
		const priorityMap = {
			Low: 1,
			Medium: 2,
			High: 3,
		};

		Task.tasks.sort((a, b) => {
			return priorityMap[b.priority] - priorityMap[a.priority];
		});

		taskList.textContent = '';
		Task.tasks.forEach((task, index) => renderTask(task, index));
	};

	//===========================================================
	// Init Variables
	//===========================================================
	const taskDialog = document.getElementById('add-task');
	const taskList = document.querySelector('.task-list');
	const taskContent = document.querySelector('.task-content');

	//===========================================================
	// Main
	//===========================================================

	const taskInteractEventListener = () => {
		taskSetupDialog();
		openTask();
		completeTask();
		deleteTask();
		loadData();
	};

	return {
		taskInteractEventListener,
		renderTask,
	};
}
