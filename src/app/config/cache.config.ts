import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICacheConfiguration } from './cache-config';

@Injectable({
  providedIn: 'root'
})
export class CacheConfiguration {

    private readonly configFilePath: string = "assets/config/cache.json";
    static settings: ICacheConfiguration;

    constructor(private http: HttpClient) {}

    load() {
        return new Promise<void>((resolve, reject) => {
            this.http.get(this.configFilePath).toPromise().then((response : ICacheConfiguration) => {
               CacheConfiguration.settings = <ICacheConfiguration>response;
               console.log(`Loaded cache configuration from ${this.configFilePath}`);
               resolve();
            }).catch((response: any) => {
               reject(`Could not load file '${this.configFilePath}': ${JSON.stringify(response)}`);
            });
        });
    }
}