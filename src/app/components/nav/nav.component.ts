import { AfterViewInit, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { UserLogService } from '../../core/services/user-log.service';
import { userInitialState } from '../../store/user/user.reducer';
import { Store } from '@ngrx/store';
import { ApiService } from '../../core/api/services/api.service';
import { User } from '../../models/user.model';
import { UserLogInfo } from '../../core/api/models/user-log-info.model';
import { Observable } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'
import { MatDividerModule } from '@angular/material/divider'
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  standalone: true,
  imports: [
    CommonModule, MatToolbarModule, 
    MatIconModule, MatButtonModule, 
    MatSidenavModule,MatListModule,
    MatDividerModule, RouterModule
  ],
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements AfterViewInit {
  showFiller = false;
  isExpanded = false;

  @Input()
  title: string = '';

  user$: Observable<any>;

  private userData: UserLogInfo

  @ViewChild('toolbar') private toolbar: any;

  constructor(
    private userService: UserLogService,
    private apiService: ApiService,
    private store: Store<typeof userInitialState>,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.user$ = this.store.select('user')
    this.userData = this.userService.getAllData();
    this.apiService.get<User>('users/self', undefined, undefined, { email: this.userData.email }).subscribe(user => {
      this.store.dispatch({ type: `[User] Add`, playload: user })
    });
  }

  ngAfterViewInit(): void {
    window.onload = () => {
      this.document.getElementById('container')!.style.top = this.toolbar._elementRef.nativeElement.offsetHeight.toString() + 'px'
    }
    window.addEventListener('resize', () => {
      let containerPrincipal = document.getElementById('container')
      containerPrincipal!.style.top = this.toolbar._elementRef.nativeElement.offsetHeight.toString() + 'px'
    }, true);
  }

  logout() {
    this.userService.logout();
    this.store.dispatch({ type: `[User] Reset`, playload: null })
  }
}
