import { Task } from './task';
import { taskController } from './taskController';
import { projects, projectController } from './projectController';
import trashIcon from '../icons/trash.svg';

export function saveData() {
	localStorage.setItem('tasks', JSON.stringify(Task.tasks));

	localStorage.setItem('projects', JSON.stringify(projects));
}

export function loadData() {
	const taskData = JSON.parse(localStorage.getItem('tasks'));
	if (taskData) {
		Task.tasks.splice(0, Task.tasks.length, ...taskData.map(Task.fromJSON));
		Task.tasks.forEach((task, index) => {
			taskController().renderTask(task, index);
		});
	}

	const projectData = JSON.parse(localStorage.getItem('projects'));

	if (projectData) {
		projects.splice(0, projects.length, ...projectData);

		const projectList = document.querySelector('.project-list');

		projectList.textContent = '';
		Array.from(projectData).forEach((project) => {
			const projectItem = document.createElement('li');

			projectItem.classList.add('project-item');
			projectItem.textContent = project;

			if (project !== 'All Tasks') {
				const trash = document.createElement('img');
				trash.src = trashIcon;
				trash.classList.add('trash-icon');
				trash.classList.add('hidden');
				projectItem.appendChild(trash);
			}

			projectList.appendChild(projectItem);
		});

		projectController().updateProjectDropdown();
	}

	const allTasksProject = document.querySelector('.project-item');
	if (allTasksProject) {
		allTasksProject.classList.add('active');
		document.getElementById('project-name').textContent = 'All Tasks';
		projectController().filterTasksByProject('All Tasks');
	}
}
