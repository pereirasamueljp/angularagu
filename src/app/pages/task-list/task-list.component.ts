import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Task } from '../../models/task.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WebSocketService } from '../../core/services/web-socket.service';
import { ApiService } from '../../core/api/services/api.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatTooltipModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  loading = false;
  tasks: Task[] = [];




  constructor(
    private apiService: ApiService,
    private webSocketService: WebSocketService
  ) {
    this.webSocketService.on('task-list', (tasks: Task[]) => {
      this.tasks = tasks;
    })
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.apiService.get<Task[]>('task').subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  handleTaskStatus(task: Task) {
    console.log('Chegou!', task)
  }

  delete(task: Task) {

  }
}
