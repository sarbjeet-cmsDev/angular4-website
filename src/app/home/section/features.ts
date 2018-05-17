import { Component } from '@angular/core';

@Component({
  selector: 'home-page-section-feature',
  template: `<section class="features">
				<div class="container">
					<div class="row justify-content-center">
						<div class="col-md-10 text-center">
							<div class="heading">

								<h2>Plan Which in <span>Your Mind</span></h2>
								<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
							</div>
						</div>
					</div>
					<div class="row justify-content-center">
						<div class="col-md-4">
							<div class="feature-box">
								<span><i class="fas fa-map"></i></span>
								<h4>Find Interesting Place</h4>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
							</div>
						</div>
						<div class="col-md-4">
							<div class="feature-box">
								<span><i class="fas fa-envelope"></i></span>
								<h4>Contact a Few Owners</h4>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
							</div>
						</div>
						<div class="col-md-4">
							<div class="feature-box">
								<span><i class="fal fa-user"></i></span>
								<h4>Make a Reservation</h4>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
							</div>
						</div>
					</div>
				</div>
			</section>`,
})
export class HomePageFeaturesSection {

}
