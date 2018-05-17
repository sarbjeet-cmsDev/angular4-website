import { Component } from '@angular/core';

@Component({
  selector: 'footer-section',
  template: `
  		<footer>
			<div class="container footer pt-5 pb-5">
				<div class="row">
					<div class="col-md-5">
						<a [routerLink]="['/']"><img src="assets/img/logo-white.png" width="300px"></a>
						<p>
							<b>RezerNow</b> is the online destination for beauty & wellness professionals and clients. Professionals can showcase their work, connect with new and existing clients, and build their business. Clients can discover new services and providers, book appointments online, and get inspired.
						</p>
					</div>
					<div class="col-md-2 offset-md-1">
						<h5>Links</h5>
						<ul>
							<li><a [routerLink]="['/about']">About us</a></li>
							<li><a [routerLink]="['/contact']">Contact us</a></li>
							<li><a [routerLink]="['/privacy_policy']">Privacy Policy</a></li>
							<li><a [routerLink]="['/support']">help</a></li>
						</ul>
					</div>
					<div class="col-md-4">
						<h5>Get In touch</h5>
						<ul>
							<li><a href="#">7744 North Park Place San Francisco, CA 714258</a></li>
							<li><a href="#">777-444-2222</a></li>
							<li><a href="mailto:support@rezervnow.com">support@rezervnow.com</a></li>
						</ul>

						<form class="form-inline mt-3">
							<div class="form-group">
								<input type="password" class="form-control" placeholder="Your Email Address..">
							</div>
							<div class="form-group">
								<button type="submit" class="btn btn-primary">Subscribe</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div class="container">
				<div class="row">
					<div class="copyright col pt-3 pb-3 text-center">
						Copyright@ 2018 RezervNow Inc.
					</div>
				</div>
			</div>
		</footer>`,
})
export class FooterSection {

}
