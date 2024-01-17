import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { TripsService } from '../services/trips.service';
import { Trip } from '../trip';
import { TripRatingComponent } from '../trip-rating/trip-rating.component';
import { FormsModule } from '@angular/forms';
import { ReviewsComponent } from '../reviews/reviews.component';
import { NgIf, NgStyle } from '@angular/common';
import { CartService } from '../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-single-trip-page',
  standalone: true,
  imports: [TripRatingComponent, FormsModule, NgIf,
    ReviewsComponent, NgStyle, RouterModule, RouterOutlet],
  templateUrl: './single-trip-page.component.html',
  styleUrl: './single-trip-page.component.css'
})
export class SingleTripPageComponent implements OnInit{

  trip!: Trip;
  selectedCurrency: string = 'PLN';
  plnToEuro: number = 0.23;
  plnToDollar: number = 0.25;
  
  priceToShow!: number;

  constructor(private route: ActivatedRoute, 
    private tripsService: TripsService,
    private cartService: CartService,
    private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    const _id = String(this.route.snapshot.paramMap.get('id'));
    this.trip = this.tripsService.trips.filter(t => t._id === _id)[0];
    this.priceToShow = this.trip.price;
  }

  onSelectChange(value: any){
    if(value === '$'){
      this.priceToShow = this.trip.price * this.plnToDollar;
    }
    else if(value === "€"){
      this.priceToShow = this.trip.price * this.plnToEuro
    }
    else if(value === "PLN"){
      this.priceToShow = this.trip.price;
    }
  }
  onPlusClick(){
    if(this.trip.availablePlaces > 0){
      this.trip.availablePlaces--;
      this.cartService.addItemToCart(this.trip);
    }
  }
  onMinusClick(){
    if(this.trip.availablePlaces < this.trip.maxPlaces){
      this.trip.availablePlaces++;
      this.cartService.removeItemFromCart(this.trip);
    }
  }

  getCountrySource(){
    if (this.trip.country.toLowerCase() === "cambodia")
      return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1997065.9197471235!2d103.66132154727907!3d12.145002306969074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310787bfd4dc3743%3A0xe4b7bfe089f41253!2sCambodia!5e0!3m2!1sen!2spl!4v1705518952207!5m2!1sen!2spl");
    else if(this.trip.country.toLowerCase() === "nepal")
      return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3594654.305314283!2d81.49005857199822!3d28.37684532308531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995e8c77d2e68cf%3A0x34a29abcd0cc86de!2sNepal!5e0!3m2!1sen!2spl!4v1705519573641!5m2!1sen!2spl");
    else if(this.trip.country.toLowerCase() === "norway")
      return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7114766.756754075!2d7.221632204265217!3d64.19185559298644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x461268458f4de5bf%3A0xa1b03b9db864d02b!2sNorway!5e0!3m2!1sen!2spl!4v1705519742785!5m2!1sen!2spl");
    else if(this.trip.country.toLowerCase() === "finland")
      return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4896501.412241575!2d22.240295469012754!3d64.92978335988823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4681cadf4b32f6dd%3A0x146d63c75a810!2sFinland!5e0!3m2!1sen!2spl!4v1705519806345!5m2!1sen!2spl");
    else if(this.trip.country.toLowerCase() === "japan")
      return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d831483.6010912812!2d139.2330505980644!3d35.50470311490645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x605d1b87f02e57e7%3A0x2e01618b22571b89!2sTokyo%2C%20Japan!5e0!3m2!1sen!2spl!4v1705519878815!5m2!1sen!2spl");
    else if(this.trip.country.toLowerCase() === "maldives")
      return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4079540.1818230227!2d70.59934458626095!3d3.1142912558387734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x24b599bfaafb7bbd%3A0x414509e181956289!2sMaldives!5e0!3m2!1sen!2spl!4v1705520119824!5m2!1sen!2spl");
    else if(this.trip.country.toLowerCase() === "brazil")
      return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15846452.003799625!2d-61.965359593116716!3d-14.15004424272471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9c59c7ebcc28cf%3A0x295a1506f2293e63!2sBrazil!5e0!3m2!1sen!2spl!4v1705520190798!5m2!1sen!2spl");
    else if(this.trip.country.toLowerCase() === "croatia")
      return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2918017.8706362573!2d13.76728700394432!3d44.42030280717533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133441080add95ed%3A0xa0f3c024e1661b7f!2sCroatia!5e0!3m2!1sen!2spl!4v1705520273375!5m2!1sen!2spl");
    else if(this.trip.country.toLowerCase() === "italy")
      return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190028.35442708264!2d12.37119266416737!3d41.910208791693364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f6196f9928ebb%3A0xb90f770693656e38!2sRome%2C%20Metropolitan%20City%20of%20Rome%20Capital%2C%20Italy!5e0!3m2!1sen!2spl!4v1705520313736!5m2!1sen!2spl");
    else if(this.trip.country.toLowerCase() === "kenya")
      return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4085558.050586509!2d35.267371050342064!3d0.15989642207407798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182780d08350900f%3A0x403b0eb0a1976dd9!2sKenya!5e0!3m2!1sen!2spl!4v1705520355261!5m2!1sen!2spl");
    else if(this.trip.country.toLowerCase() === "ukraine")
      return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5443946.529048521!2d25.904384267130116!3d48.22246590487044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d1d9c154700e8f%3A0x1068488f64010!2sUkraine!5e0!3m2!1sen!2spl!4v1705520446212!5m2!1sen!2spl");
    else
      return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2561.091575644511!2d19.920251576074115!3d50.06584661498207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165ba716a39a4b%3A0x11d137e3b938f290!2sAGH%20C2!5e0!3m2!1sen!2spl!4v1703617065476!5m2!1sen!2spl");
  }

}
