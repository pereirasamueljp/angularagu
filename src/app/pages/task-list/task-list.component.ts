import { Component } from '@angular/core';
import { AsyncPipe, CommonModule } from "@angular/common";
import { Task } from '../../models/task.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WebSocketService } from '../../core/services/web-socket.service';
import { ApiService } from '../../core/api/services/api.service';
import { Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tasksInitialState } from '../../store/tasks/tasks.reducer';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatTooltipModule,
    StoreModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  loading = true;
  tasks$: Observable<any>;
  tasks: Task[] = [];

  constructor(
    private apiService: ApiService,
    private webSocketService: WebSocketService,
    private store: Store<typeof tasksInitialState>
  ) {
    this.tasks$ = this.store.select('tasks')
    this.webSocketService.on('task-list', (tasks: Task[]) => {
      this.loading = true;
      this.tasks = tasks;
      this.loading = false;
    })
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.apiService.get<Task[]>('task').subscribe((tasks: Task[]) => {
      this.store.dispatch({ type: '[TaskList Component] Update', playload: tasks })
      this.tasks = tasks;
      this.loading = false;
    });
  }

  handleTaskStatus(status: 'inProgress'| 'done',task: Task) {
  
  }

  delete(task: Task) {
    this.loading = true;
    this.apiService.delete('task',task.id!).subscribe(() => {
      this.store.dispatch({ type: '[TaskList Component] Remove', playload: task })
      this.loading = false;
    });
  }
}
