import { taskController } from './taskController';
import { projectController } from './projectController';

export function screenController() {
	const controllerTask = taskController();
	const controllerProject = projectController();

	controllerTask.taskInteractEventListener();
	controllerProject.projectEventListener();
}
