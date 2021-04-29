import { Injectable } from '@angular/core';
import { SocialLoginModule, AuthServiceConfig,  GoogleLoginProvider} from 'angular5-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  getAuthServiceConfigs() {
    let config = new AuthServiceConfig([
      {
       id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('795159690542-0842gi1usvu91j52u9hl1a68k1d0ielk.apps.googleusercontent.com')
       }
   ]);

    return config;
  }
}
