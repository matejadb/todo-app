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
		const modal = document.getElementById('information');
		const close = document.querySelector('.close-modal');
		const taskContent = document.querySelector('.task-content');
		taskList.addEventListener('click', function (e) {
			const taskToOpen = e.target.closest('.task-item');
			if (taskToOpen) {
				const taskIndex = taskToOpen.dataset.index;
				let task = Task.tasks[taskIndex];

				const title = document.createElement('h1');
				title.textContent = task.title;
				taskContent.appendChild(title);

				const description = document.createElement('p');
				description.textContent = task.description;
				taskContent.appendChild(description);

				const dueDate = document.createElement('p');
				dueDate.textContent = task.dueDate;
				taskContent.appendChild(dueDate);

				const priority = document.createElement('p');
				priority.textContent = task.priority;
				taskContent.appendChild(priority);

				modal.style.display = 'block';

				close.addEventListener('click', function () {
					modal.style.display = 'none';
					taskContent.textContent = '';
				});

				window.addEventListener('click', function (e) {
					if (e.target === modal) {
						modal.style.display = 'none';
						taskContent.textContent = '';
					}
				});
			}
		});
	};

	return {
		showAddTaskWindow,
		openTask,
	};
}
