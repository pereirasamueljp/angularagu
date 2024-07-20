import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Task } from '../../models/task.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ApiService } from '../../core/api/services/api.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tasksInitialState } from '../../store/tasks/tasks.reducer';
import { cloneDeep } from 'lodash';
import { FilterPipe } from '../../common/pipes/filter.pipe';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FilterPipe,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatTooltipModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  loading = true;
  tasks$: Observable<any>;

  constructor(
    private apiService: ApiService,
    private store: Store<typeof tasksInitialState>
  ) {
    this.tasks$ = this.store.select('tasks')
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.apiService.get<Task[]>('task').subscribe((tasks: Task[]) => {
      this.store.dispatch({ type: '[TaskList Component] Update', playload: tasks })
      this.loading = false;
    });
  }

  filterInitialState(task: Task){
    return !!!task.inProgress && !!!task.done
  }

  filterInProgress(task: Task){
    return !!task.inProgress && !task.done
  }

  filterDone(task: Task){
    return !!task.done
  }

  handleTaskStatus(status: 'inProgress' | 'done', task: Task) {
    this.loading = true;
    let newTask = cloneDeep(task)
    switch (status) {
      case 'inProgress': newTask.inProgress = true; break;
      case 'done': newTask.done = true; break;
    }
    this.updateTask(newTask)
  }

  updateTask(task: Task) {
    this.apiService.update('task', task.id!, task).subscribe(()=> this.loading = false);
  }

  delete(task: Task) {
    this.loading = true;
    this.apiService.delete('task', task.id!).subscribe(() => {
      this.loading = false;
    });
  }
  
}
