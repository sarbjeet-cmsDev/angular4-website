import { Component } from '@angular/core';

@Component({
  selector: 'home-page-section-stats',
  template: `<section class="company-state theme-overlap" style="background:url(assets/img/tag-bg.jpg);">
				<div class="container">
					<div class="row">
						<div class="col-md-3">
							<div class="work-count">
								<span class="icon"><i class="fal fa-trophy"></i></span>
								<span class="counter">200</span> <span class="counter-incr">+</span>
								<p>Awards Winning</p>
							</div>
						</div>
						<div class="col-md-3">
							<div class="work-count">
								<span class="icon"><i class="fal fa-signal"></i></span>
								<span class="counter">307</span> <span class="counter-incr">+</span>
								<p>Done Projects</p>
							</div>
						</div>
						<div class="col-md-3">
							<div class="work-count">
								<span class="icon"><i class="fal fa-smile"></i></span>
								<span class="counter">700</span> <span class="counter-incr">+</span>
								<p>Happy Clients</p>
							</div>
						</div>
						<div class="col-md-3">
							<div class="work-count">
								<span class="icon"><i class="fal fa-coffee"></i></span>
								<span class="counter">770</span> <span class="counter-incr">+</span>
								<p>Cups Of Cofee</p>
							</div>
						</div>
					</div>
				</div>
			</section>`,
})
export class HomePageStatsSection {

}
