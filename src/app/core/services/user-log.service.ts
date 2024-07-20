import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { UserLogInfo } from '../api/models/user-log-info.model';
import { WebSocketService } from '../../core/services/web-socket.service';

@Injectable({ providedIn: 'root' })
export class UserLogService {

    constructor(
        private readonly _socket: WebSocketService
    ) { }

    private static token: any = null;
    private static user: UserLogInfo | null = null;
    private static isLoaded = false;

    public static observer: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    public loadToken() {
        const token: any = localStorage.getItem('token');
        if (token) {
            try {
                UserLogService.token = token;
                let tk: any = UserLogService.token
                let user = jwtDecode(tk) as any
                this.setUser(user)
            } catch (e) {
                UserLogService.token = null;
            }
        } else {
            UserLogService.token = null;
        }
        UserLogService.isLoaded = true;
        this.conectSocket();
    }

    conectSocket() {
        if (UserLogService.token) {
            this._socket.autenticate(UserLogService.token.token);
        }
    }

    logged() {
        return !!UserLogService.token;
    }

    getToken() {
        if (!UserLogService.isLoaded) {
            this.loadToken();
        }
        return UserLogService.token;
    }

    setToken(token: any) {
        UserLogService.token = token;
        localStorage.setItem('token', UserLogService.token);
        this.conectSocket();
    }

    setUser(user: UserLogInfo | null) {
        UserLogService.user = user;
        UserLogService.observer.next(user);
        user ? localStorage.setItem('email', UserLogService.user?.email!) : localStorage.setItem('email', '');
    }

    updateUser(data: any) {
        UserLogService.user = data;
        UserLogService.observer.next(UserLogService.user);
    }

    getAllData(): UserLogInfo {
        return UserLogService.user!;
    }

    getUser(): UserLogInfo {
        return this.getAllData();
    }

    logout() {
        this.setUser(null);
        this.setToken('');
    }
}
