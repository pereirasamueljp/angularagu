// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Task } from '../models/task.model';
// import { environment } from '../../environments/environment';
// import { ApiConfiguration } from '../core/api/api-configuration';

// @Injectable({
//   providedIn: 'root'
// })
// export class TaskService {
//   apiTask = 'task';

//   constructor(private http: HttpClient) {}

//   getTasks(): Observable<Task[]> {
//     return this.http.get<Task[]>(`${environment.apiUrl}/${this.apiTask}`);
//   }

//   addTask(newTask: Task): Observable<Task> {
//     return this.http.post<Task>(`${environment.apiUrl}/${this.apiTask}`,{newTask});
//   }

//   deleteTask(task: Task){
//     return this.http.delete<Task>(`${environment.apiUrl}/${this.apiTask}`,);
//   }
// }
