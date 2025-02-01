import { Task } from './task';
import { projectController } from './projectController';

export function storage() {
	const saveData = () => {
		localStorage.setItem('tasks', JSON.stringify(Task.tasks));
		localStorage.setItem(
			'projects',
			JSON.stringify(projectController().projects)
		);
		console.log(projectController().projects);
	};

	return {
		saveData,
	};
}
