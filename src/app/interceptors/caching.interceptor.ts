import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CacheService } from '../services/cache.service';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CachingInterceptor implements HttpInterceptor {

    constructor(private cacheService: CacheService) { }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cachedResponse: HttpResponse<any> = this.cacheService.get(req);
        if (cachedResponse) {
            console.log(`Return cached response for ${req.urlWithParams}`);
            return of(cachedResponse);
        }
        return this.sendRequest(req, next);
    }

    sendRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.cacheService.put(req, event);
                }
            })
        );
    }
    
}