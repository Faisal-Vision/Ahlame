import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(public translate: TranslateService) {}
  private secretKey =
    'ELTZAM-DI-EAD4FFC4B95A4A5586FBDBCC3A786FCE_83E84739-6376-4EAB-92AA-B58A09C27FCE';

  // Convert data to string
  private stringifyData(data: any): string {
    return typeof data === 'string' ? data : JSON.stringify(data);
  }
  get currentLang(): string {
    return this.translate.currentLang;
  }

  // Encrypt data
   encryptData(data: any): string {
    try {
      const stringData = this.stringifyData(data);
      return CryptoJS.AES.encrypt(stringData, this.secretKey).toString();
    } catch (e) {
      console.error('Error encrypting data', e);
      return '';
    }
  }

  // Decrypt data
   decryptData(data: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.secretKey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      if (!decryptedData) {
        throw new Error('Decryption failed');
      }
      return decryptedData;
    } catch (e) {
      console.error('Error decrypting data', e);
      return '';
    }
  }

  storeData(key: string, value: any) {
    const encryptedValue = this.encryptData(value);
    if (encryptedValue) {
      localStorage.setItem(key, encryptedValue);
    }
  }

  getData(key: string): any {
    const encryptedData = localStorage.getItem(key);
    if (encryptedData) {
      const decryptedData = this.decryptData(encryptedData);
      if (decryptedData) {
        try {
          return JSON.parse(decryptedData);
        } catch (e) {
          return decryptedData;
        }
      }
    }
    return null;
  }

  GetAllClaims(): any {
    const encryptedData = localStorage.getItem('claims');
    if (encryptedData) {
      const claims = this.decryptData(encryptedData);
      if (claims) {
        try {
          return JSON.parse(claims);
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  }

  CurrentUserId(): any {
    const encryptedData = localStorage.getItem('claims');
    if (encryptedData) {
      const claims = this.decryptData(encryptedData);
      if (claims) {
        try {
          return JSON.parse(claims).id;
        } catch (e) {
          return 0;
        }
      }
    }
    return null;
  }

  CurrentUserName(lang: string): any {
    const encryptedData = localStorage.getItem('claims');
    if (encryptedData) {
      const claims = this.decryptData(encryptedData);
      if (claims) {
        try {
          return lang == 'ar'
            ? JSON.parse(claims).nameAr
            : JSON.parse(claims).nameEn;
        } catch (e) {
          return '';
        }
      }
    }
    return null;
  }

  CurrentEntityId(): any {
    const encryptedData = localStorage.getItem('claims');
    if (encryptedData) {
      const claims = this.decryptData(encryptedData);
      if (claims) {
        try {
          return JSON.parse(claims).entityId;
        } catch (e) {
          return 0;
        }
      }
    }
    return null;
  }

  CurrentEntityApplicationId(): any {
    const encryptedData = localStorage.getItem('claims');
    if (encryptedData) {
      const claims = this.decryptData(encryptedData);
      if (claims) {
        try {
          return JSON.parse(claims).entityApplicationId;
        } catch (e) {
          return 0;
        }
      }
    }
    return null;
  }

    CurrentOriginalApplicationId(): any {
    const encryptedData = localStorage.getItem("claims");
    if (encryptedData) {
        const claims = this.decryptData(encryptedData);
      if (claims) {
        try {
          return JSON.parse(claims).originalApplicationId
        }
        catch (e) { return 0;}
      }
    }
    return null;
  }

  CurrentUserType(): any {
    const encryptedData = localStorage.getItem('claims');
    if (encryptedData) {
      const claims = this.decryptData(encryptedData);
      if (claims) {
        try {
          return JSON.parse(claims).userType;
        } catch (e) {
          return 0;
        }
      }
    }
    return null;
  }

  CurrentRoleId(): any {
    const encryptedData = localStorage.getItem('claims');
    if (encryptedData) {
      const claims = this.decryptData(encryptedData);
      if (claims) {
        try {
          return JSON.parse(claims).userType;
        } catch (e) {
          return 0;
        }
      }
    }
    return null;
  }
  // Get UserType as string for display
  CurrentUserTypeString(): string {
    const userType = this.CurrentUserType();
    switch (userType) {
      case 25:
        return 'SuperAdmin';
      case 26:
        return 'EntityAdmin';
      case 27:
        return 'User';
      default:
        return 'Unknown';
    }
  }

  // Get all localStorage data for debugging
  GetAllLocalStorageData(): any {
    const allData: any = {};

    // Get all localStorage keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        try {
          // Try to decrypt if it's encrypted
          const value = localStorage.getItem(key);
          if (value && this.isEncrypted(value)) {
            allData[key] = this.decryptData(value);
          } else {
            allData[key] = value;
          }
        } catch (e) {
          allData[key] = `Error reading: ${e}`;
        }
      }
    }

    return allData;
  }

  // Check if data is encrypted
  private isEncrypted(data: string): boolean {
    try {
      // Check if data looks like encrypted JSON
      if (data && typeof data === 'string' && data.length > 50) {
        // Try to decrypt - if it works, it's encrypted
        const decrypted = this.decryptData(data);
        return decrypted !== '';
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  // Get formatted claims for display
  GetFormattedClaims(): any {
    const claims = this.GetAllClaims();
    if (!claims) return null;

    return {
      ...claims,
      userTypeString: this.CurrentUserTypeString(),
      userTypeNumber: claims.userType,
      formattedData: {
        userId: claims.id,
        userName: this.CurrentUserName('ar'),
        userNameEn: this.CurrentUserName('en'),
        entityId: claims.entityId,
        entityAppId: claims.entityApplicationId,
        userType: this.CurrentUserTypeString()
      }
    };
  }





IsHavePermissionEnterPage(nextUrl : string): boolean {
  return true;
  if(nextUrl == "/system-admin/home")
    return true;
  const encryptedData = localStorage.getItem('claims');
  if (!encryptedData) return false;
  // const claims = this.decryptData(encryptedData);
  // if (!claims) return false;


}


  clearData(key: string) {
    localStorage.removeItem(key);
  }

  clearAllData() {
    localStorage.clear();
  }

   // Store user data specifically
  storeUser(user: any): void {
    const encryptedUser = this.encryptData(user);
    if (encryptedUser) {
      localStorage.setItem('user', encryptedUser);
    }
  }

  // Get user data specifically
  getUser(): any {
    const encryptedUser = localStorage.getItem('user');
    if (encryptedUser) {
      try {
        return this.decryptData(encryptedUser);
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  // Check if user has specific permission
  hasPermission(permission: string): boolean {
    const user = this.getUser();
    if (!user || !user.permissions) {
      return false;
    }
    return user.permissions.includes(permission);
  }



  // Get current user type with fallback
  getCurrentUserType(): string {
    const user = this.getUser();
    return user?.userType ? this.CurrentUserTypeString() : 'Guest';
  }

  // Store session data
  storeSessionData(key: string, value: any): void {
    const encryptedValue = this.encryptData(value);
    if (encryptedValue) {
      sessionStorage.setItem(key, encryptedValue);
    }
  }

  // Get session data
  getSessionData(key: string): any {
    const encryptedData = sessionStorage.getItem(key);
    if (encryptedData) {
      try {
        const decryptedData = this.decryptData(encryptedData);
        return typeof decryptedData === 'string' ? decryptedData : JSON.parse(decryptedData);
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  // Clear session data
  clearSessionData(key: string): void {
    sessionStorage.removeItem(key);
  }

  // Clear all session data
  clearAllSessionData(): void {
    sessionStorage.clear();
  }

  // Enhanced token management
  storeToken(token: string): void {
    const encryptedToken = this.encryptData(token);
    if (encryptedToken) {
      localStorage.setItem('ahlame_token', encryptedToken);
    }
  }

  // Get token
  getTokenFromStorage(): string | null {
    const encryptedToken = localStorage.getItem('ahlame_token');
    if (encryptedToken) {
      try {
        return this.decryptData(encryptedToken);
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  // Clear all authentication data
  clearAuthData(): void {
    localStorage.removeItem('ahlame_token');
    localStorage.removeItem('user');
    localStorage.removeItem('claims');
  }

  // Check if token is expired
  isTokenExpired(token?: string): boolean {
    const currentToken = token || this.getTokenFromStorage();
    if (!currentToken) {
      return true;
    }
    
    try {
      // Basic token validation - you can enhance this for JWT
      const tokenData = JSON.parse(atob(currentToken.split('.')[1]));
      if (tokenData && tokenData.exp) {
        const currentTime = Date.now() / 1000;
        return tokenData.exp < currentTime;
      }
    } catch (e) {
      console.error('Error validating token:', e);
      return true; // Assume expired if we can't validate
    }
    return false;
  }

  // Get user display name
  getUserDisplayName(): string {
    const user = this.getUser();
    if (!user) return '';
    
    const lang = this.currentLang || 'en';
    return lang === 'ar' ? (user.nameAr || user.username) : (user.nameEn || user.username);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    const token = this.getTokenFromStorage();
    const user = this.getUser();
    return !!(token && user);
  }

  // Store user preferences
  storeUserPreferences(preferences: any): void {
    const encryptedPrefs = this.encryptData(preferences);
    if (encryptedPrefs) {
      localStorage.setItem('user_preferences', encryptedPrefs);
    }
  }

  // Get user preferences
  getUserPreferences(): any {
    const encryptedPrefs = localStorage.getItem('user_preferences');
    if (encryptedPrefs) {
      try {
        return this.decryptData(encryptedPrefs);
      } catch (e) {
        return {};
      }
    }
    return {};
  }

  CurrentUserNationalId(): any {
    const encryptedData = localStorage.getItem('claims');

    if (encryptedData) {
      const claims = this.decryptData(encryptedData);
      if (claims) {
        try {
          return JSON.parse(claims).userNid;
        } catch (e) {
          return 0;
        }
      }
    }
    return null;
  }
}
