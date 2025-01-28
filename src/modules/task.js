export class Task {
	constructor(title, description, dueDate, priority, isCompleted = false) {
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.isCompleted = isCompleted;
	}

	completeTask() {
		this.isCompleted = !this.isCompleted;
	}
}
