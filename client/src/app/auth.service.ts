import { Injectable, OnInit } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  user: SocialUser;
  GoogleLoginProvider = GoogleLoginProvider;
  loggato:boolean;

  constructor(private authService: SocialAuthService) { }


  getAuthServiceState() : Observable<SocialUser>
  {
    return this.authService.authState;
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  getuser() {
    return this.user
  }


  refreshGoogleToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
}
