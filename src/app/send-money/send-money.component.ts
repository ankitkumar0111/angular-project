import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReceiverService } from '../receiver.service';

@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.css']
})
export class SendMoneyComponent implements OnInit {

  countryData: any;
  countries: any;
  selectedCountry: string;
  flagImageUrl: string;
  showCountry: boolean = false;
  senderCode: string = "USD";
  currencyCode: string;
  currencyRate: any= 90;
  sendMoney: any = 100;
  receiveMoney: any = this.sendMoney * this.currencyRate;
  selectedPayout: string;
  data: any;

  constructor(private route: Router,private receiver: ReceiverService) { }
 
    ngOnInit(): void {
      this.receiver.getCountries().subscribe(
        (array: any) => {
          this.countryData = array;
          this.selectedCountry = array[0].name;
          this.flagImageUrl = array[0].flagImageUrl;
          this.currencyRate = array[0].currencyRate;
          this.currencyCode = array[0].currencyCode;
          console.log(this.countryData);
        },
        (err: Error) => {
          console.log(err);
        }
      );
    }
    payoutMethod(method: string) {
      this.selectedPayout = method;
      console.log(method);
    }
   
    filter(data: string) {
      this.showCountry = true;
      this.selectedCountry = data;
      console.log(data);
      this.countries = data === "" ? this.countryData : this.countryData.filter((c: any) => {
        return c.name.toLowerCase().includes(data.toLowerCase());
      });
    }
    countryChange(country: any) {
      this.showCountry = false;
      this.selectedCountry = country.name;
      this.flagImageUrl = country.flagImageUrl;
      console.log("country",country)
      if (this.selectedCountry) {
        this.currencyRate = country.currencyRate
        this.currencyCode = country.currencyCode;
        if (this.sendMoney) {
          this.receiveMoney = this.sendMoney * this.currencyRate;
        }
        else {
          this.receiveMoney = 0;
        }
      }
    }
    sendMoneyChange(amount: any) {
      console.log(amount);
      this.sendMoney = amount;
      this.receiveMoney = amount * this.currencyRate;
    }
    receiveMoneyChange(amount: any) {
      this.receiveMoney = amount
      this.sendMoney = amount / this.currencyRate;
    }
    onContinue() {
      if (this.selectedPayout && this.selectedCountry) {
        this.data = {
          country: this.selectedCountry,
          method: this.selectedPayout,
          sendMoney: this.sendMoney,
          receiveMoney: this.receiveMoney
        }
        localStorage.setItem("data", JSON.stringify(this.data));
        this.route.navigate(['/receiver']);
      }
      else {
        alert("Please select payout method or country");
      }
    }
    ngOnChange(): void {
      this.showCountry = true;
    }

}
