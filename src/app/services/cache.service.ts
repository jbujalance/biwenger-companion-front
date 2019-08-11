import { Injectable } from '@angular/core';
import { ICacheEntry } from '../config/cache-config';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { CacheConfiguration } from '../config/cache.config';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private cache: Map<string, ICacheEntry>;

  constructor(private cacheConfig: CacheConfiguration) {
    this.cache = new Map();
  }

  get(request: HttpRequest<any>): HttpResponse<any> | undefined {
    this._removeExpired();
    if (!this.cache.has(request.urlWithParams)) {
      return undefined;
    }
    return this.cache.get(request.urlWithParams).response;
  }

  put(request: HttpRequest<any>, response: HttpResponse<any>): void {
    if (this.cacheConfig.needsCaching(request.urlWithParams)) {
      let entry: ICacheEntry = {
        url: request.urlWithParams,
        response: response,
        date: new Date()
      }
      this.cache.set(request.urlWithParams, entry);
    }
  }

  _removeExpired(): void {
    this.cache.forEach((cacheEntry: ICacheEntry, url: string, map: Map<string, ICacheEntry>) => {
      if (this.cacheConfig.isExpired(cacheEntry)) {
        map.delete(url);
      }
    });
  }
}
