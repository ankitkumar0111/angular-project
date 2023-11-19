import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReceiverService } from 'src/app/receiver.service';

@Component({
  selector: 'app-add-receiver',
  templateUrl: './add-receiver.component.html',
  styleUrls: ['./add-receiver.component.css']
})
export class AddReceiverComponent implements OnInit {

  receiverForm: FormGroup;
  countries: any[];

  constructor(private fb: FormBuilder, private receiverService: ReceiverService,private router: Router) {}

  ngOnInit() {
    this.receiverForm = this.fb.group({
      country: ['', Validators.required],
      type: [''], 
      countryCode: [''], 
      phoneNumber: [''], 
      firstName: [''],
      middleName: [''],
      lastName: ['']
    });

    this.receiverService.getCountries().subscribe(countries => {
      this.countries = countries;
    });

    this.receiverForm.get('type').disable();
    this.receiverForm.get('countryCode').disable();
    this.receiverForm.get('phoneNumber').disable();
    this.receiverForm.get('firstName').disable();
    this.receiverForm.get('middleName').disable();
    this.receiverForm.get('lastName').disable();
  }


  onSubmit() {
    const receiverData = this.receiverForm.value;
    this.receiverService.postReceiver(receiverData).subscribe(response => {
      
    });
    this.router.navigate(["/myreceiver"])
  }


  onCountryChange() {
    const selectedCountry = this.receiverForm.get('country').value;
    const countryDetails = this.countries.find(country => country.name === selectedCountry);

   
    const controlsToEnable = countryDetails.fields;
    controlsToEnable.forEach(control => {
      this.receiverForm.get(control).enable();
    });


    const controlsToDisable = ['type', 'countryCode', 'phoneNumber', 'firstName', 'middleName', 'lastName'];
    controlsToDisable.forEach(control => {
      if (!controlsToEnable.includes(control)) {
        this.receiverForm.get(control).disable();
      }
    });
  }

  navigateToMyReceiver(){
    this.router.navigate(['/myreceiver']);
  }

}
