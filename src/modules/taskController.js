import { Task } from './task';

export function taskController() {
	const taskDialog = document.getElementById('add-task');

	const showAddTaskWindow = () => {
		const showButton = document.querySelector('.task-window');
		const closeButton = document.querySelector('.close');

		showButton.addEventListener('click', function () {
			taskDialog.showModal();
		});

		closeButton.addEventListener('click', function () {
			taskDialog.close();
		});
	};

	const makeTask = () => {
		const confirmButton = document.querySelector('.submit-task');
		const taskList = document.querySelector('.task-list');
		const taskForm = document.getElementById('task-form');

		confirmButton.addEventListener('click', function (e) {
			e.preventDefault();

			const taskItem = document.createElement('li');
			taskItem.classList.add('task-item');

			const title = document.createElement('h1');
			title.textContent = document.getElementById('title').value;
			taskItem.appendChild(title);

			const description = document.createElement('p');
			description.textContent = document.getElementById('description').value;
			taskItem.appendChild(description);

			taskList.appendChild(taskItem);

			const newTask = new Task(
				document.getElementById('title').value,
				document.getElementById('description').value,
				document.getElementById('due-date').value,
				document.querySelector('input[name="priority"]:checked').value
			);

			Task.tasks.push(newTask);
			taskForm.reset();
			taskDialog.close();
		});
	};

	return {
		showAddTaskWindow,
		makeTask,
	};
}
