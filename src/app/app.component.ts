import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { Toast } from './common/models/toast.model';
import { ToastService } from './common/services/toast.service';
import { ToastComponent } from './common/toast/toast.component';
import { NavComponent } from './components/nav/nav.component';
import { UserLogService } from './core/services/user-log.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent, MatDialogModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'Tasks';
  toastList: Toast[] = [];
  toastQueue$ = this.toastService.getQueue();
  toastRunning = false;
  pageloaded = false;

  constructor( 
    public toastService: ToastService,
    private dialog: MatDialog,
    public userService: UserLogService
  ){

  }


  ngOnInit(): void {
    this.toastQueue$.subscribe(toast=>{
      if(toast){
        this.toastController(toast)
      }
    })
  }

  ngAfterViewInit(): void {
    this.pageloaded = true;
  }

  async toastController(toast: Toast) {
    this.addToastToQueue(toast);
    if (!this.toastRunning) {
      for (let toastInQueue of this.toastList) {
        await this.showToast(toastInQueue)
      }
      this.toastList = []
      this.toastRunning = false;
    }
  }

  addToastToQueue(toast: Toast) {
    this.toastList.push(toast)
  }

  showToast(toast: Toast) {
    return new Promise<void>(resolve => {
      this.toastRunning = true;
      let dialogoConfig = new MatDialogConfig();
      dialogoConfig.data = toast;
      dialogoConfig.width = '0px';
      dialogoConfig.position = {
        right: '1.5%',
        bottom: '5%',
      }
      dialogoConfig.height = '0px'
      this.toastRunning = true;
      setTimeout(() => {

        resolve()
      }, 3000)
      dialogoConfig.panelClass = "dialogoAlerta"
      dialogoConfig.hasBackdrop = false;
      this.dialog.open(ToastComponent, dialogoConfig);
    })
  }


  
  
}
