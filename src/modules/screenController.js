import { taskController } from './taskController';
import { projectController } from './projectController';

export function screenController() {
	/* const projects = [];

	const defaultProject = document.getElementById('default-project');
	const projectName = document.getElementById('project-name');
	const projectItem = document.querySelectorAll('.project-item');

	projectName.textContent = defaultProject.textContent;

	for (let i = 0; i < projectItem.length; i++) {
		projects.push(projectItem[i]);
		projectItem[i].addEventListener('click', function () {
			projectName.textContent = projectItem[i].textContent;
		});
	}

	defaultProject.addEventListener('click', function () {
		projectName.textContent = this.textContent;
	});

	const makeTask = () => {
		const task1 = new Task(
			'Task1',
			'Description',
			'tomorrow',
			'low',
			projectName.textContent
		);

		console.log(task1);
		console.log(Task.tasks);
	}; */

	const controllerTask = taskController();
	const controllerProject = projectController();

	controllerTask.taskInteractEventListener();
	controllerProject.projectEventListener();
}
