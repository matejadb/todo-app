import { format } from 'date-fns';
export class Task {
	static tasks = [];

	constructor(
		title,
		description,
		dueDate,
		priority,
		project = 'All Tasks',
		isCompleted = false
	) {
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.project = project;
		this.isCompleted = isCompleted;
	}

	markComplete() {
		this.isCompleted = !this.isCompleted;
	}

	static fromJSON(data) {
		return new Task(
			data.title,
			data.description,
			data.dueDate,
			data.priority,
			data.project,
			data.isCompleted !== undefined ? data.isCompleted : false
		);
	}
}
