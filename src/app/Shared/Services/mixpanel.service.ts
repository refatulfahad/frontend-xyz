import { Injectable } from '@angular/core';
import mixpanel from 'mixpanel-browser';

@Injectable({
  providedIn: 'root'
})
export class MixpanelService {

  constructor() {
    //daa76dd6afd4babe15f321a4e77a3ded  -me
    //874f28d8800d06ca29cf542aa0b618ad  -Al-Amin bhai
    mixpanel.init('874f28d8800d06ca29cf542aa0b618ad', {
      api_host: "http://localhost:3001",
      debug: true,
      track_pageview: true,
      persistence: 'localStorage',
    });
   }

   // Method to track events
  trackEvent(event: string, properties?: any) {
    mixpanel.track(event, properties);
  }

  // Method to identify users
  identifyUser(userId: string, name:string) {
    mixpanel.identify(userId);
    mixpanel.people.set({
      '$name': name,
      '$email': userId
    });
  }
}
