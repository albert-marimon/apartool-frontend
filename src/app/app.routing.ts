//REQUIRED IMPORTS
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//IMPORT COMPONENTS
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';

//ROUTES
const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'login', component: LoginComponent},
	{path: 'logout/:sure', component: LoginComponent},
	{path: 'registro', component: RegisterComponent},
	{path: '**', component: ErrorComponent}
];

//EXPORT CONFIG
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);