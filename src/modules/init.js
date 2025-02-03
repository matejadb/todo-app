import { taskController } from './taskController';
import { projectController } from './projectController';

export function init() {
	taskController().taskInteractEventListener();
	projectController().projectEventListener();
}
