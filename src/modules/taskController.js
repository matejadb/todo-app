import { Task } from './task';

export function taskController() {
	const taskDialog = document.getElementById('add-task');
	const taskList = document.querySelector('.task-list');

	const showAddTaskWindow = () => {
		const showButton = document.querySelector('.task-window');
		const closeButton = document.querySelector('.close');

		showButton.addEventListener('click', function () {
			taskDialog.showModal();
		});

		closeButton.addEventListener('click', function () {
			taskDialog.close();
		});

		makeTask();
	};

	const makeTask = () => {
		const confirmButton = document.querySelector('.submit-task');
		const taskForm = document.getElementById('task-form');

		confirmButton.addEventListener('click', function (e) {
			e.preventDefault();

			const newTask = new Task(
				document.getElementById('title').value,
				document.getElementById('description').value,
				document.getElementById('due-date').value,
				document.querySelector('input[name="priority"]:checked').value
			);
			Task.tasks.push(newTask);

			const taskItem = document.createElement('li');
			taskItem.classList.add('task-item');
			taskItem.dataset.index = Task.tasks.length - 1;

			const title = document.createElement('h1');
			title.classList.add('prevent-select');
			title.textContent = document.getElementById('title').value;
			taskItem.appendChild(title);

			const dueDate = document.createElement('p');
			dueDate.textContent = document.getElementById('due-date').value;
			dueDate.classList.add('prevent-select');
			taskItem.appendChild(dueDate);

			taskList.appendChild(taskItem);

			taskForm.reset();
			taskDialog.close();
		});
	};

	const openTask = () => {
		taskList.addEventListener('click', function (e) {
			const taskToOpen = e.target.closest('.task-item');
			const taskIndex = taskToOpen.dataset.index;
			let task = Task.tasks[taskIndex];

			console.log(task.title, task.description, task.dueDate, task.priority);
		});
	};

	return {
		showAddTaskWindow,
		openTask,
	};
}
