export function screenController() {
	const defaultProject = document.getElementById('default-project');
	const projectName = document.getElementById('project-name');
	const projectItem = document.querySelectorAll('.project-item');

	projectName.textContent = defaultProject.textContent;

	for (let i = 0; i < projectItem.length; i++) {
		projectItem[i].addEventListener('click', function () {
			projectName.textContent = projectItem[i].textContent;
		});
	}

	defaultProject.addEventListener('click', function () {
		projectName.textContent = defaultProject.textContent;
	});
}
