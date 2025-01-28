export class Task {
	static tasks = [];

	constructor(title, description, dueDate, priority, isCompleted = false) {
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.isCompleted = isCompleted;
	}
}
