import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../models/toast.model';




@Injectable({ providedIn: 'root' })
export class ToastService {
    private readonly toastList$ = new BehaviorSubject<Toast | null>(null);;

    public getQueue(){
        return this.toastList$;
    }

    public showMessage(toast: Toast) {
        this.toastList$.next(toast)
    }


}