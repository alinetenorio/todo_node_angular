import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { AuthService } from '../services';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  tasks: any[] = [];
  newTask: any = { description: '', priority: 'MEDIUM', done: false }; // New task data

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    console.log('taskcompnent');
    await this.fetchTasks();
  }

  async fetchTasks() {
    this.tasks = await this.taskService.getTasks();
  }

  toggleTaskDone(task: any): void {
    const updatedTask = { ...task, done: !task.done };

    this.taskService.toggleTask(updatedTask);

    task.done = updatedTask.done;
  }

  completedTasks(done: boolean) {
    return this.tasks.filter((task) => task.done == done);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onCreateTask(form: NgForm) {
    if (!this.newTask.description.trim()) {
      return;
    }

    this.taskService.createTask(this.newTask).subscribe((newTask) => {
      this.tasks.push(newTask);
      this.newTask = { description: '', priority: 'MEDIUM', done: false };
      form.resetForm(this.newTask);
    });
  }

  translate(priority: string) {
    if (priority == 'LOW') return 'Baixa';
    else if (priority == 'MEDIUM') return 'Média';
    else if (priority == 'HIGH') return 'Alta';
    return '-';
  }
}
