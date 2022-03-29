
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let clonedRequest = req;
    if (localStorage.getItem('token')) {
      let token: any = localStorage.getItem('token');
      clonedRequest = req.clone({
        headers: new HttpHeaders({
          Authorization: token,
          'Content-Type': 'application/json'
        })
      });
    }

    return next.handle(clonedRequest).pipe(
      catchError(this.manejaError)
    );
  }

  manejaError(error: HttpErrorResponse) {
    if (error.status === 500) { //Al expirar token, error 500
      localStorage.clear();
    }
    return throwError('Error Http atrapado por interceptor');
  }

}
