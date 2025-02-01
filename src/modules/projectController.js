//===========================================================
// Imports
//===========================================================
import { Task } from './task';
import { taskController } from './taskController';
import { storage } from './storage';

export function projectController() {
	//===========================================================
	// Helper Functions
	//===========================================================
	// Project local storage
	const saveData = () => {
		localStorage.setItem('projects', JSON.stringify(projects));
	};

	const loadData = () => {
		const projectData = JSON.parse(localStorage.getItem('projects'));

		if (projectData) {
			projects.splice(0, projects.length, ...projectData);
			const projectList = document.querySelector('.project-list');
			projectList.textContent = '';
			Array.from(projectData).forEach((project) => {
				const projectItem = document.createElement('li');
				projectItem.classList.add('project-item');
				projectItem.textContent = project;
				projectList.appendChild(projectItem);
			});

			updateProjectDropdown();
		}
	};

	const addProjectEventListener = () => {
		const addProjectButton = document.getElementById('add-project');
		addProjectButton.addEventListener('click', () => {
			const projectInput = document.getElementById('new-project');
			if (projectInput.value && !projects.includes(projectInput.value)) {
				projects.push(projectInput.value);
				updateProjectList();
				updateProjectDropdown();
				projectInput.value = '';
				saveData();
				console.log(window.localStorage);
			}
		});
	};

	function updateProjectDropdown() {
		const projectDropdown = document.getElementById('project');
		projectDropdown.textContent = '';
		document.querySelectorAll('.project-item').forEach((project) => {
			const option = document.createElement('option');
			option.value = project.textContent;
			option.textContent = project.textContent;
			projectDropdown.appendChild(option);
		});
	}

	const updateProjectList = () => {
		const projectList = document.querySelector('.project-list');
		projectList.textContent = '';
		projects.forEach((project) => {
			const projectItem = document.createElement('li');
			projectItem.classList.add('project-item');
			projectItem.textContent = project;
			projectList.appendChild(projectItem);
		});
		saveData();
	};

	const setActiveProject = () => {
		const projectList = document.querySelector('.project-list');
		const currentProject = document.getElementById('project-name');
		projectList.addEventListener('click', (e) => {
			if (e.target.classList.contains('project-item')) {
				const selectedProject = e.target.textContent;
				currentProject.textContent = e.target.textContent;
				filterTasksByProject(selectedProject);
			}
		});
	};

	const filterTasksByProject = (project) => {
		let filteredTasks;
		if (project === 'All Tasks') {
			filteredTasks = Task.tasks;
		} else {
			filteredTasks = Task.tasks.filter((task) => task.project === project);
		}
		displayTasks(filteredTasks);
	};

	const displayTasks = (tasks) => {
		taskList.textContent = '';
		tasks.forEach((task, index) => taskController().renderTask(task, index));
	};

	//===========================================================
	// Init Variables
	//===========================================================
	const projects = ['All Tasks'];
	const taskList = document.querySelector('.task-list');
	const storageController = storage();
	//===========================================================
	// Main
	//===========================================================
	const projectEventListener = () => {
		addProjectEventListener();
		setActiveProject();
		loadData();
	};
	return {
		projectEventListener,
		filterTasksByProject,
		projects,
	};
}
