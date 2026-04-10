import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCYw1VusLFl0WT14CjZpxD8PZxtjSZxM3A",
  authDomain: "equipobasketedu.firebaseapp.com",
  projectId: "equipobasketedu",
  storageBucket: "equipobasketedu.firebasestorage.app",
  messagingSenderId: "155949175729",
  appId: "1:155949175729:web:3cfd793bc4f2f4d6906390"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ]
};
