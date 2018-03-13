import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GameComponent } from './pages/game/game.component';

const appRoutes: Routes = [
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'game',
		component: GameComponent
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: '/home'
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {}
