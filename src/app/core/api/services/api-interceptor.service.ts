import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { get, set } from 'lodash';
import { throwError, throwError as _throw } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Toast } from '../../../common/models/toast.model';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../common/services/toast.service';
import { UserLogService } from '../../services/user-log.service';


export const apiInterceptor: HttpInterceptorFn = (req, next) => {
    let userLogService = inject(UserLogService)
    let toastService = inject(ToastService)
    let router = inject(Router)
    if ((req.url.startsWith(environment.apiUrl)) && userLogService.logged()) {
        req = req.clone({
            setHeaders: {
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${userLogService.getToken()}`
            }
        });
    }
    return next(req).pipe(catchError((erroHttps: any) => {
        if (erroHttps instanceof HttpErrorResponse) {
            {
                let errorToast: Toast = {
                    type: (erroHttps.error.error || erroHttps.error) ? 'error' : 'info',
                    message: get(erroHttps, 'error.error.message') || get(erroHttps, 'error.message') || get(erroHttps, 'message') || get(erroHttps, 'statusTxt'),
                    status: erroHttps.error.statusCode || erroHttps.error.status || erroHttps.status,
                }
                let toast: Toast = errorToast;
                if (erroHttps.error instanceof Error) {
                    toast.message = `Connection error: ${errorToast.message}`
                    toastService.showMessage(toast);
                } else {
                    if (typeof erroHttps.error === 'string') {
                        try {
                            erroHttps = JSON.parse(erroHttps.error);
                        } catch (e) { }
                    }
                    if (erroHttps.status === 401) {
                        toastService.showMessage(toast);
                        router.navigate(['/login']);
                        userLogService.logout();
                    } else if (erroHttps.status === 403) {
                        toastService.showMessage(toast);
                    } else {
                        setTimeout(() => {
                            if (get(erroHttps, 'cancelledToast')) {
                                return;
                            }
                            toast.message = `Service error: ${errorToast.message}`
                            toastService.showMessage(toast);
                        }, 100);
                        set(erroHttps, 'error.error.cancelToast', () => {
                            set(erroHttps, 'cancelledToast', true);
                        });
                    }
                }
                return _throw(erroHttps);
            }
        } else {
            // Handle non-HTTP errors
            console.error('An error occurred:', erroHttps);
        }

        return throwError(() => erroHttps);
    }));
};
