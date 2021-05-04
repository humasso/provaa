import { Injectable, OnInit } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  user: SocialUser;
  GoogleLoginProvider = GoogleLoginProvider;
  loggato:boolean;

  constructor(private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe(user => {
    this.user = user;
    this.loggato = (user != null);
    console.log(user)
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  getuser() {
    if (this.loggato != false)
    return this.user
  }
  /*
  refreshGoogleToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
  */
}
