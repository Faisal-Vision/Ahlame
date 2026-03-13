import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../Http/http.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private readonly TOKEN_KEY = 'ahlame_token';
  private readonly USER_KEY = 'ahlame_user';

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  // async login(credentials: { username: string; password: string }): Promise<any> {
  //   try {
  //     const result = await this.http.post(
  //       'https://localhost:44343/api/Account/Login',
  //       {
  //         email: credentials.username.trim(),
  //         password: credentials.password
  //       }
  //     ).toPromise();

  //     if (result && (result as any).success) {
  //       const token = (result as any).returnObject?.token;
  //       const user = (result as any).returnObject?.user;
  //       if (token) this.localStorageService.storeData(this.TOKEN_KEY, token);
  //       if (user) this.localStorageService.storeData(this.USER_KEY, user);
  //     }

  //     return result;
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     throw error;
  //   }
  // }

  async login(credentials: { username: string; password: string }): Promise<any> {
  try {
    const result = await this.httpService.post<any>(
      'Account/Login',  // ← فقط المسار، بدون URL ثابت
      {
        email: credentials.username.trim(),
        password: credentials.password
      }
    );

    if (result && result.success) {
      const token = result.returnObject?.token;
      const user = result.returnObject?.user;
      if (token) this.localStorageService.storeData(this.TOKEN_KEY, token);
      if (user) this.localStorageService.storeData(this.USER_KEY, user);
    }

    return result;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/auth/login');
  }

  IsLogin(): boolean {
    const storedValue = localStorage.getItem('token');
    if (storedValue !== null) {
      return true;
    } else {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
  }

} // ← قوس إغلاق الكلاس