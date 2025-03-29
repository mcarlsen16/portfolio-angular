import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Project {
  name: string;
  link: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  projects: Project[] = [
    { name: 'Zoo App', link: 'https://mcarlsen16.github.io/zoo-app/' }
  ];

  contact = {
    name: '',
    email: '',
    message: ''
  };

  devMode = false;
  showTooltip = false;

  modalVisible = false;
  isEditing = false;
  editingIndex: number | null = null;

  modalProject: Project = { name: '', link: '' };

  notificationVisible = false;
  notificationMessage = '';
  notificationIsError = false; // <-- NEW

  toggleDevMode() {
    this.devMode = !this.devMode;
  }

  openProjectModal(index?: number) {
    this.modalVisible = true;
    this.isEditing = index !== undefined;
    this.editingIndex = index ?? null;
    this.modalProject = index !== undefined
      ? { ...this.projects[index] }
      : { name: '', link: '' };
  }

  closeProjectModal() {
    this.modalVisible = false;
    this.modalProject = { name: '', link: '' };
    this.editingIndex = null;
    this.isEditing = false;
  }

  confirmAddProject() {
    if (!this.modalProject.name || !this.modalProject.link) {
      this.showNotification('Error: Please enter both a project name and link.', true);
      return;
    }

    if (this.isEditing && this.editingIndex !== null) {
      this.projects[this.editingIndex] = { ...this.modalProject };
      this.showNotification('Project updated!');
    } else {
      this.projects.push({ ...this.modalProject });
      this.showNotification('Project added!');
    }

    this.closeProjectModal();
  }

  editProject(index: number) {
    this.openProjectModal(index);
  }

  deleteProject(index: number) {
    this.projects.splice(index, 1);
  }

  handleFormSubmit(event: Event) {
    event.preventDefault();
    this.contact = { name: '', email: '', message: '' };
    this.showNotification('Message sent!');
  }

  showNotification(message: string, isError: boolean = false) {
    this.notificationMessage = message;
    this.notificationIsError = isError;
    this.notificationVisible = true;

    setTimeout(() => {
      this.notificationVisible = false;
      this.notificationMessage = '';
      this.notificationIsError = false;
    }, 3000);
  }
}
