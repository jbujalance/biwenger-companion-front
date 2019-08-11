import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICacheConfiguration, IUrlCacheConfiguration, ICacheEntry } from './cache-config';
import { settings } from 'cluster';

@Injectable({
  providedIn: 'root'
})
export class CacheConfiguration {

    private readonly configFilePath: string = "assets/config/cache.json";
    private static settings: ICacheConfiguration;

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

    isAvailable(): boolean {
        return CacheConfiguration.settings.available;
    }

    getConfiguration(url: string): IUrlCacheConfiguration {
        return CacheConfiguration.settings.cachedUrls.find((conf: IUrlCacheConfiguration) => {
            url.includes(conf.url);
        });
    }

    isConfigured(url: string): boolean {
        let matchingConfiguration: IUrlCacheConfiguration = this.getConfiguration(url);
        return !!matchingConfiguration;
    }

    needsCaching(url: string): boolean {
        return this.isAvailable() && this.isConfigured(url);
    }

    isExpired(cacheEntry: ICacheEntry): boolean {
        if (!this.isConfigured(cacheEntry.url)) {
            return false;
        }
        let cacheConf: IUrlCacheConfiguration = this.getConfiguration(cacheEntry.url);
        return new Date().getSeconds() - cacheEntry.date.getSeconds() > cacheConf.expiration;
    }

}