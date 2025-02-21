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

	updateTask(newTitle, newDescription, newDueDate, newPriority, newProject) {
		this.title = newTitle;
		this.description = newDescription;
		this.dueDate = newDueDate;
		this.priority = newPriority;
		this.project = newProject;
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
