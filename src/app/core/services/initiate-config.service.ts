import { Inject, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { get } from 'lodash'
import { UserLogService } from './user-log.service';

@Injectable({providedIn: 'root',})
export class InitiateConfig {

    constructor() { }

    protected static config: any = null;
    public static observer: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    protected static setConfig(config: any) {
        InitiateConfig.config = config;
    }

    public static getConfig(key: string | null = null): any {
        if (key) {
            return get(InitiateConfig.config, key, null);
        }
        return InitiateConfig.config;
    }

    public static initApp(
        userLogService: UserLogService,
        router: Router,
    ): () => Promise<any> {
        return async (): Promise<any> => {
            userLogService.loadToken();
    
            try {
                if (!userLogService.logged()) {
                    return;
                }
            } catch (err) {
                if ((err as any).statusCode === 401) {
                    userLogService.setToken(null);
                    router.navigate(['/login']);
                }
                return;
            }
        };
    }
}
