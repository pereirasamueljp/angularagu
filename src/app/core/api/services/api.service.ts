import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { buildParams } from '../../../utils/build-params';
import { ApiConfiguration } from '../services/api-configuration.service';
import { environment } from '../../../../environments/environment';



@Injectable({ providedIn: 'root' })

export class ApiService {
    private readonly URL: string = '';
    private readonly API: string = '';
    constructor(
        private httpClient: HttpClient,
        private apiConfiguration: ApiConfiguration
    ) {
        this.URL = this.apiConfiguration.rootUrl
        this.API = this.apiConfiguration.rootApi
    }

    public delete(entity: string, id: number) {
        return this.httpClient.delete(this.URL + (this.API ? '/' + this.API + '/' : '/') + entity + `/${id}`)
    }

    public save<T>(entity: string, entityObject: T) {
        return this.httpClient.post<T>(this.URL + (this.API ? '/' + this.API + '/' : '/') + entity, entityObject)
    }

    public update<T>(entity: string, id: number, entityObject: T) {
        return this.httpClient.put<T>(this.URL + (this.API ? '/' + this.API + '/' : '/') + entity + `/${id}`, entityObject)
    }

    public get<T>(entity: string, id?: number, attributes?: string[], filters?: Object) {
       
        let params = {}
        if (attributes) params = { ...params, attributes };
        if (filters) params = { ...params, filters };
        
        return this.httpClient.get<T>(this.URL + (this.API ? '/' + this.API + '/' : '/') + entity + (id ? `/${id}` : '') + buildParams(params))
    }
}