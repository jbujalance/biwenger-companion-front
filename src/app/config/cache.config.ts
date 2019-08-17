import { Injectable } from '@angular/core';
import { ICacheConfiguration, IUrlCacheConfiguration, ICacheEntry } from './cache-config';
import CacheJson from '../../assets/config/cache.json';

@Injectable({
  providedIn: 'root'
})
export class CacheConfiguration {

    private readonly configFilePath: string = "/assets/config/cache.json";
    private settings: ICacheConfiguration;

    constructor() {}

    load() {
        return new Promise<void>((resolve, reject) => {
            this.settings = CacheJson;
            console.log(`Loaded cache configuration from ${this.configFilePath}`);
            resolve();
        });
    }

    isAvailable(): boolean {
        return this.settings.available;
    }

    getConfiguration(url: string): IUrlCacheConfiguration {
        return this.settings.cachedUrls.find((conf: IUrlCacheConfiguration) => {
            return url.includes(conf.url);
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