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
}
