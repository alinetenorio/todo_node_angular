import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

interface Task {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000'; // Replace with your API

  tasks: any[] = [];

  constructor(private http: HttpClient) {}

  async getTasks() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });

    try {
      const data = await firstValueFrom(
        this.http.get<any[]>(`${this.apiUrl}/task`, { headers })
      );

      this.tasks = data;
      return data;
    } catch (err) {
      console.error('Error fetching tasks:', err);
      return [];
    }
  }

  toggleTask(task: any) {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({ Authorization: token });

    this.http
      .put<any>(
        `${this.apiUrl}/task/${task.id}`,
        { done: task.done },
        { headers }
      )
      .subscribe({
        next: () => {
          task.done = task.done;
        },
        error: (err) => console.error('Error updating task:', err),
      });
  }

  createTask(task: Task): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({ Authorization: token });

    return this.http.post<any>(`${this.apiUrl}/task`, task, { headers });
  }
}
