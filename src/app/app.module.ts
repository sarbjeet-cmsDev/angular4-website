import { MbscModule } from '@mobiscroll/angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomePage } from './home/home';
import { HomePageFeaturesSection } from './home/section/features';
import { HomePageStaticBlockSection } from './home/section/staticblock';
import { HomePageStatsSection } from './home/section/stats';
import { HomePageCategorySection } from './home/section/cats';
import { HomePageReviewSection } from './home/section/review';
import { HomePageSearchSection } from './home/section/search';
import { HomePageAppSection } from './home/section/app';
import { FooterSection } from './common/footer';
import { HeaderSection } from './common/header';
import { SearchPage } from './search/search';
import { ProfilePage } from './profile/profile';
import { BusinessReviews } from './profile/profile-review';
import { BusinessWork } from './profile/profile-work';
import { BookingCalender } from './profile/booking-calender';


import { UserProfilePage } from './user/profile';
import { UserBookingPage } from './user/booking';
import { UserBookingDetailPage } from './user/bookingdetail';
import { UserReviewPage } from './user/reviews';
import { UserFavouritePage } from './user/favourite';
import { UserMenu } from './user/menu';

import { SignUpWidget } from './signup/widget';
import { LoginPage } from './login/login';
import { LoginWidget } from './login/widget';
import { ForgetPasswordPage } from './login/forgetpassword';
import { Loader } from './loader/index';
import { routing } from './app.routes';


import { DataService } from './providers/data';
import { AuthGuard } from './providers/guard';
import { AuthResolver } from './resolvers/auth';
import { RegionService } from './providers/region';
import { UtilService } from './providers/util';
import { ImageService } from './providers/image';

//PAGES
import { AboutPage } from './pages/about';
import { ContactPage } from './contact/contact';
import { NotFoundPage } from './common/notfound';
import { SignUpPage } from './signup/signup';
import { PrivacyPage } from './pages/privacy';
import { HelpPage } from './pages/help';
import { BusinessPage } from './pages/business';
import { UnsubscribePage } from './pages/unsubscribe';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    HomePageFeaturesSection,
    HomePageStaticBlockSection,
    HomePageStatsSection,
    HomePageCategorySection,
    HomePageReviewSection,
    HomePageSearchSection,
    HomePageAppSection,
    FooterSection,
    HeaderSection,
    ContactPage,
    UnsubscribePage,
    AboutPage,
    PrivacyPage,
    HelpPage,
    BusinessPage,
    SearchPage,
    ProfilePage,
    BusinessReviews,
    BusinessWork,
    BookingCalender,
    UserProfilePage,
    UserBookingPage,
    UserBookingDetailPage,
    UserReviewPage,
    UserFavouritePage,
    UserMenu,
    SignUpPage,
    SignUpWidget,
    LoginPage,
    LoginWidget,
    ForgetPasswordPage,
    NotFoundPage,
    Loader
    
  ],
  imports: [ 
    MbscModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    RegionService,
    UtilService,
    DataService,
    ImageService,
    AuthGuard,
    AuthResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
