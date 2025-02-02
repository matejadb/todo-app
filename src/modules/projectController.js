//===========================================================
// Imports
//===========================================================
import { Task } from './task';
import { taskController } from './taskController';

import trashIcon from '../icons/trash.svg';
export function projectController() {
	//===========================================================
	// Helper Functions
	//===========================================================
	// Project Local Storage
	const saveData = () => {
		localStorage.setItem('projects', JSON.stringify(projects));
	};

	const loadData = () => {
		const projectData = JSON.parse(localStorage.getItem('projects'));

		if (projectData) {
			projects.splice(0, projects.length, ...projectData);

			projectList.textContent = '';
			Array.from(projectData).forEach((project) => {
				const projectItem = document.createElement('li');

				projectItem.classList.add('project-item');
				projectItem.textContent = project;

				if (project !== 'All Tasks') {
					const trash = document.createElement('img');
					trash.src = trashIcon;
					trash.classList.add('trash-icon');
					trash.classList.add('hidden');
					projectItem.appendChild(trash);
				}

				projectList.appendChild(projectItem);
			});

			updateProjectDropdown();
		}
	};

	// Project Maker
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
		projectList.textContent = '';
		projects.forEach((project) => {
			const projectItem = document.createElement('li');
			projectItem.classList.add('project-item');
			projectItem.textContent = project;

			if (project !== 'All Tasks') {
				const trash = document.createElement('img');
				trash.src = trashIcon;
				trash.classList.add('trash-icon');
				trash.classList.add('hidden');

				projectItem.appendChild(trash);
			}

			projectList.appendChild(projectItem);
		});
		saveData();
	};

	const setActiveProject = () => {
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

	const showDeleteButton = () => {
		const projectList = document.querySelector('.project-list');

		projectList.addEventListener('mouseover', function (e) {
			const projectItem = e.target.closest('.project-item');
			if (projectItem) {
				const deleteButton = projectItem.querySelector('.trash-icon');
				if (deleteButton) deleteButton.classList.remove('hidden');
			}
		});
		projectList.addEventListener('mouseout', function (e) {
			const projectItem = e.target.closest('.project-item');
			if (projectItem) {
				const deleteButton = projectItem.querySelector('.trash-icon');
				if (deleteButton) deleteButton.classList.add('hidden');
			}
		});
		deleteProject();
	};

	const deleteProject = () => {
		projectList.addEventListener('click', function (e) {
			if (e.target.classList.contains('trash-icon')) {
				const deletedTask = e.target.closest('.project-item');

				projects.splice(projects.indexOf(deletedTask.textContent), 1);
				projectList.removeChild(deletedTask);

				saveData();
			}
		});
	};

	//===========================================================
	// Init Variables
	//===========================================================
	const projects = ['All Tasks'];
	const taskList = document.querySelector('.task-list');
	const projectList = document.querySelector('.project-list');

	//===========================================================
	// Main
	//===========================================================
	const projectEventListener = () => {
		addProjectEventListener();
		setActiveProject();
		loadData();
		showDeleteButton();
	};
	return {
		projectEventListener,
		filterTasksByProject,
		projects,
	};
}
