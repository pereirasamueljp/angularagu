import { Component } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { CommonModule, NgForOf } from "@angular/common";
import { Task } from '../../api/models/task.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';

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
  tasks: Task[] = [
    {
      title: 'What is Lorem Ipsum?',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's`,
      data: 'xxxxxxxx',
    },
    {
      title: 'Where does it come from?',
      description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. `,
      data: 'xxxxxxxx',
    },
    {
      title: 'Where can I get some?',
      description: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.`,
      data: 'xxxxxxxx',
    },
    {
      title: 'Why do we use it?',
      description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. `,
      data: 'xxxxxxxx',
    },
    {
      title: 'Lorem Ipsum',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut viverra metus eu molestie aliquet. Nunc faucibus, enim a lacinia commodo, mi augue commodo purus, in auctor elit nibh sollicitudin arcu. `,
      data: 'xxxxxxxx',
    }
  ];
  



  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  handleTaskStatus(task: Task){
    console.log('Chegou!', task)
  }

  delete(task: Task){

  }
}
