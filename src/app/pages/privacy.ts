import { Component } from '@angular/core';

import { DataService } from '../providers/data';

@Component({
  selector: 'app-root',
  template: `
  		<header-section></header-section>
  		<main>
  			<div class="container">
	  			<div class="row">
		  			<div class="col mt-3 text-justify">
		  				<h1>Privacy Policy</h1>

		  				<p>
						    This privacy policy (this “Policy”) explains how personal information is collected, used, and disclosed by RezervNow with its designated agents, employees and subsidiaries (“RezervNow” or “we”). This Policy applies to consumer users (individually referred to as “you”) of RezervNow’s websites, applications, and other online services (collectively, our “Sites”). Other third parties, such as small and medium businesses (“SMBs”) at which you make reservations through our Sites, issuers of Merchant Gift Cards you purchase through our Sites, and social networks that you use in connection with our Sites, may also collect, use, and share information about you. This Policy does not cover such third parties or their services. For information about third-party privacy practices, please consult with them directly.
						</p>
						<p>
						    We collect information about you in various ways when you use our Sites. We use this information to, among other things, provide the functionality and improve the quality of our Sites and personalize your experience. For example, we may collect your name, email address, postal address, phone number (including your mobile phone number), billing information, survey responses, demographics, current and prior appointments details, favorite SMBs, special SMB requests, passwords, contact information of people you add to, or notify of, your appointments through our Sites, names and email addresses of recipients of RezervNow Gift Cards (as this term is defined in the RezervNow Terms of Use) and Merchant Gift Cards, and other information you provide on our Sites. If you use our mobile application, either to book an appointment or to pay, we may also collect your mobile device ID, your precise location data, and the SMB search locations you select. For certain services on our Sites, credit or debit card account information may be required, as further described in the section called “Payment Card Information” below. We may also obtain information from other sources, such as third-party websites, applications, and services (each, a “Third-Party Platform”), through which you connect with our Sites and combine that with information we collect on our Sites.
						</p>
						<p>
						    When you visit our Sites, some information is automatically collected. For example, when you visit our Sites, we may automatically collect your location, computer operating system, Internet Protocol (IP) address, access times, browser type and language, and the website you visited before our Sites. We also collect information about your usage and activity on our Sites using certain technologies, such as:
						</p>
						<ol>
						    <li>
						        <b>Cookies:</b> We may automatically collect information using “cookies” and similar technology. Cookies are small data files that may have unique identifiers and reside, among other places, on your computer or mobile device, in emails we send to you, and on our web pages. Among other things, cookies help us improve our Sites and your experience. We use cookies to see which areas and features of our Sites are popular and to count visits to our Sites. We may access information contained in cookies placed on your device by a Third-Party Platform as permitted by the terms of your agreement and privacy settings with such Third-Party Platform. We may share this information with the Third-Party Platform for its use as permitted by the terms of your agreement and privacy settings with such Third-Party Platform.
						    </li>
						    <li><b>Web Beacons:</b> We may collect information using web beacons. Web beacons are electronic images that may be used on our Sites or in our emails. We use web beacons to deliver cookies, count visits, understand usage and campaign effectiveness, and tell whether you open an email and act upon it.</li>
						    <li><b>Do Not Track Signals</b> We currently do not employ technology that recognizes “do-not-track” signals from your browser. We may engage third parties, such as marketing or analytics partners, who may collect information about your online activities over time and across different websites when you use our Sites.</li>
						</ol>
						<p>
						    We use personal information collected through our Sites for the purposes described in this Policy or disclosed to you on our Sites or otherwise in connection with our services. For example, we may use your information to:
						</p>
						<ol>
						    <li>Make and change your appointments made through our Sites;
						    </li>
						    <li>Offer you, or provide you with, products and services, such as RezervNow Gift Cards and Merchant Gift Cards and the option to pay your bill at a SMB through our Sites;</li>
						    <li>Email RezervNow Gift Cards and Merchant Gift Cards to designated recipients;</li>
						    <li>Operate and improve our Sites, products, and services;</li>
						    <li>Understand you and your preferences to enhance, personalize, and customize your experience and enjoyment using our Sites, products, and services, such as understanding your appointment history to make recommendations about other SMBs you may like;</li>
						    <li>Process and deliver contest entries and rewards;</li>
						    <li>Display relevant advertising;</li>
						    <li>Respond to your comments and questions and provide customer service;</li>
						    <li>Send you information relating to our products and services, including reservation confirmations, receipts, technical notices, updates, security alerts, and support and administrative messages; Communicate with you about contests, offers, promotions, rewards, upcoming events, and other news about products and services offered by RezervNow, our subsidiaries, and affiliates; select SMBs; and our other selected partners;</li>
						    <li>Link or combine with other personal information we get from third parties to help understand your needs and provide you with better service;</li>
						    <li>Authenticate your credit or debit card account information; and</li>
						    <li>Protect, investigate, and deter against fraudulent, unauthorized, or illegal activity. By providing your mobile phone number, you expressly consent to receive direct dial calls, autodialed and prerecorded message calls, and text messages from us relating to our product and services at that number.</li>
						</ol>
						<p>
						    RezervNow may store and process personal information in the United States and other countries.
						</p>
						We share information in the following ways:
						<ol>
						    <li><b>Information Shared with SMBs:</b> When you make an appointment through our Sites, your information is provided to us and to the SMB with whom you choose to make the appointment. In order to facilitate your appointment, your information is provided to that SMB, just as it would if you made an appointment by calling the SMB, emailing the SMB, or using the SMB’s website. If you provide a mobile phone number, SMBs may send you text messages regarding your reservation. Some SMBs also require you to provide credit or debit card account information to secure your appointment. When you make an appointment through our Sites we may also share with the SMBs additional information, such as information about your history or information that we collect via Third-Party Platforms You also have the option of indicating special preferences or providing comments about your appointment that RezervNow will pass on to that SMB. We may share with SMBs summary reports of feedback from clients. If you provide comments about a SMB through our Sites, these comments may be shared with that SMB. We will not tie your comments with other information that can identify you, but a SMB may be able to tell who you are from your comments, particularly if you give your name in the comments or provide contact information, such as an email address. Information you choose to share with a SMB when you make an appointment and/or pay a SMB through our Sites may be used by the SMB for its own purposes. RezervNow does not control the privacy practices of SMBs. Please contact the SMB directly if you want to learn about its privacy practices.</li>
						    <li><b>Information Shared with Gift Card Merchants:</b> If you purchase a Merchant Gift Card or redeem an RezervNow Gift Card for a Merchant Gift Card) through our Sites, we notify the applicable issuer of the Merchant Gift Card and provide it with certain related information about your purchase or redemption, including your name, email address, and the amount of the Merchant Gift Card.</li>
						    <li><b>Payment Card Information</b> To use certain services on our Sites, such as to make appointments with certain SMBs; to make payments to RezervNow; and to purchase RezervNow Gift Cards, Merchant Gift Cards, or other products or services, we may require credit or debit card account information. By submitting your credit or debit card account information through our Sites, you expressly consent to the sharing of your information with, third-party payment processors, and other third-party service providers, and you further agree to the following terms. RezervNow collects and processes all payments on behalf of SMB through recognized professional payment gateway providers. When you use a credit or debit card to secure a reservation through our Sites, we provide your credit or debit card account information (including card number and expiration date, but excluding the CVV number) to our third-party payment service providers. If you purchase RezervNow Gift Cards or Merchant Gift Cards from us, we collect the credit or debit card account information from you. We share this information with our third-party payment service providers in order to process your payments. These third parties may also store your credit or debit card information, other than your CVV number, for your future use on our Sites. Your CVV number will not be stored and must be re-entered for each order. For information about the security of your credit or debit card account information, see Section called “Security of Your Personal Information” below.</li>
						    <li><b>Information You Share Socially:</b> Our Sites may allow you to connect and share your actions, comments, content, and information publicly or with friends on Third-Party Platforms such as Facebook or Instagram. Our Sites may also allow you to connect with us on, share on, and use Third-Party Platforms, including those on which RezervNow has a presence. Please be mindful of your personal privacy needs and the privacy needs of others as you choose whom to connect with and what to share and make public. We cannot control the privacy or security of information you choose to make public or share with others. RezervNow also does not control the privacy practices of Third-Party Platforms. Please contact those sites and services directly if you want to learn about their privacy practices.</li>
						    <li><b>Sharing with Others:</b> We do not share your personal information with third parties other than as described above and as follows: We may share personal information when you authorize us to share your information with other third parties (such as the SMBs at which you make appointments through our Sites) for their own marketing purposes, which are subject to the separate privacy policies of such third parties. </li>
						</ol>
						<p>
						    We may share personal information with affiliates, third-party vendors, consultants, and other service providers who work for us.  We may share your credit or debit card account information with third parties as described in the section called “Payment Card Information” above. We may share aggregate statistical data for the improvement of services offered by our Sites.
						</p>
						<p>
						    We share personal information with third parties who provide services to us, such as data collection, reporting, ad response measurement, and site analytics, as well as assistance with delivery of relevant marketing messages and advertisements. These third parties may view, edit, or set their own cookies. We and our third-party service providers, advertisers, and/or partners may also place web beacons for these third parties. The use of these technologies by these third parties is subject to their own privacy policies and is not covered by this Policy.
						</p>
						<p>
						    We may disclose your personal information (i) to comply with laws and to respond to lawful requests and legal process, (ii) to protect the rights and property of RezervNow, our agents and customers, and others, including to enforce our agreements, policies, and terms of use, and (iii) in an emergency to protect the personal safety of RezervNow, its customers, or any person.
						</p>
						<p>
						    We may disclose or transfer your personal information to a third party if we sell, transfer, divest, or disclose all or a portion of our business or assets to another company in connection with or during negotiation of any merger, financing, acquisition, bankruptcy, dissolution, transaction, or proceeding. We may also share aggregated or de-identified information with third parties in our discretion.
						</p>
						<p>
						    RezervNow takes reasonable steps to help protect your personal information in an effort to prevent loss, misuse, unauthorized access, disclosure, alteration, and destruction. When your credit or debit card account information is being transmitted to our Sites or through our Sites, it will be protected by encryption technology, such as Secure Sockets Layer (SSL). To be clear, RezervNow does not itself store your credit or debit card account information, and we do not have direct control over or responsibility for your credit or debit card account information. Our contracts with third parties that receive your credit or debit card account information require them to keep it secure and confidential.
						</p>
						<p>
						    Nonetheless, we cannot guarantee that transmissions of your credit or debit card account information or personal information will always be secure or that unauthorized third parties will never be able to defeat the security measures taken by RezervNow or our third-party service providers. We assume no liability or responsibility for disclosure of your information due to errors in transmission, unauthorized third-party access, or other causes beyond our control. You play an important role in keeping your personal information secure. You should not share your user name, password, or other security information for your RezervNow account with anyone. If we receive instructions using your user name and password, we will consider that you have authorized the instructions.
						</p>
						<p>
						    You may opt out of receiving promotional emails from RezervNow by following the instructions in those emails. If you opt out, we may still send you non-promotional emails, such as emails about your RezervNow account or our ongoing business relations. You may also send requests about your contact preferences or changes to your information, including requests to opt out of sharing your personal information with third parties, to our contact information below. 

						</p>
						<ol>
					    	<li><b>Cookie choices:</b> Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Sites.
					    	</li>
					    	<li><b>Application location choices:</b> Most mobile devices allow you to turn off location services. For more information about how to do this, please contact your mobile service carrier or your device manufacturer. If you choose to turn off location services, this could affect certain features or services of our Sites.
					    	</li>
					    </ol>
						<p>
						    RezervNow may update or revise this Policy from time to time. You agree that you will review this Policy periodically. If we make any changes to this Policy, we will change the “Last Updated” date above. You are free to decide whether or not to accept a modified version of this Policy, but accepting this Policy, as modified, is required for you to continue using our Sites. If you do not agree to the terms of this Policy or any modified version of this Policy, your sole recourse is to terminate your use of our Sites.
						</p>
		  			</div>
	  			</div>
  			</div>
  		</main>
  		`,
})
export class PrivacyPage {
	constructor() {

    }
}
