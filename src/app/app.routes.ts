import { ModuleWithProviders }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home/home';
import { ContactPage } from './contact/contact';
import { SearchPage } from './search/search';
import { ProfilePage } from './profile/profile';


import { UserProfilePage } from './user/profile';
import { UserBookingPage } from './user/booking';
import { UserBookingDetailPage } from './user/bookingdetail';
import { UserReviewPage } from './user/reviews';
import { UserFavouritePage } from './user/favourite';



import { SignUpPage } from './signup/signup';
import { LoginPage } from './login/login';
import { ForgetPasswordPage } from './login/forgetpassword';
import { NotFoundPage } from './common/notfound';

import { AuthGuard } from './providers/guard';

import { AuthResolver } from './resolvers/auth';

//StatiC PAGES
import { AboutPage } from './pages/about';
import { PrivacyPage } from './pages/privacy';
import { HelpPage } from './pages/help';
import { BusinessPage } from './pages/business';
import { UnsubscribePage } from './pages/unsubscribe';

// Route Configuration
export const routes: Routes = [
	{ path: 'home', component: HomePage,pathMatch: 'prefix' },
	{ path: 'about', component: AboutPage,pathMatch: 'prefix' },
	{ path: 'privacy_policy', component: PrivacyPage,pathMatch: 'prefix' },
	{ path: 'support', component: HelpPage,pathMatch: 'prefix' },
	{ path: 'contact', component: ContactPage },
	{ path: 'unsubscribe/:token', component: UnsubscribePage },
	{ path: 'business', component: BusinessPage },
	{ path: 'search', component: SearchPage },
	{ path: 'search/category/:category', component: SearchPage },
	{ path: 'login', component: LoginPage},
	{ path: 'forgetpassword', component: ForgetPasswordPage},
	{ path: 'signup', component: SignUpPage},
	{ path: 'business/:business', component: ProfilePage},
	{ path: 'account', component: UserProfilePage, canActivate:[AuthGuard] },
	{ path: 'booking', component: UserBookingPage, canActivate:[AuthGuard] },
	{ path: 'booking/:id', component: UserBookingDetailPage, canActivate:[AuthGuard] },
	{ path: 'reviews', component: UserReviewPage, canActivate:[AuthGuard] },
	{ path: 'favourite', component: UserFavouritePage, canActivate:[AuthGuard] },
	{ path: '', component: HomePage},
	{ path: '404', component: NotFoundPage},
	{ path: '**', redirectTo: '404'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);




//{
	
	// path: ':country',
	// children : [
	// 	{ path: 'home', component: HomePage },
	// 	{ path: 'contact', component: ContactPage },
	// 	{ path: 'search', component: SearchPage },
	// 	{ path: 'search/category/:category', component: SearchPage },
	// 	{ path: 'login', component: LoginPage },
	// 	{ path: 'forgetpassword', component: ForgetPasswordPage },
	// 	{ path: 'signup', component: SignUpPage },
	// 	{ path: 'business/:business', component: ProfilePage},
	// 	{ path: 'account', component: UserProfilePage, canActivate:[AuthGuard] },
	// 	{ path: 'booking', component: UserBookingPage, canActivate:[AuthGuard] },
	// 	{ path: 'booking/:id', component: UserBookingDetailPage, canActivate:[AuthGuard] },
	// 	{ path: 'reviews', component: UserReviewPage, canActivate:[AuthGuard] },
	// 	{ path: 'favourite', component: UserFavouritePage, canActivate:[AuthGuard] },
	// 	{ path: '404', component: NotFoundPage},
	// 		{ path: '**', redirectTo: '404'},
	// ], 
	// pathMatch: 'prefix'
//},
// { 
// 	path: '', 
// 	pathMatch: 'full',
// 	component: HomePage
// },