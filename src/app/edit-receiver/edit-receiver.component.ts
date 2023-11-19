import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReceiverService } from '../receiver.service';

@Component({
  selector: 'app-edit-receiver',
  templateUrl: './edit-receiver.component.html',
  styleUrls: ['./edit-receiver.component.css']
})
export class EditReceiverComponent implements OnInit {
  
  receiverForm: FormGroup;
  receiverId: number;
  receiverData: any;
  countries: any[];

  constructor(
    private fb: FormBuilder, private receiverService: ReceiverService, private router: Router, private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.receiverId = +params['id']; 
    });

    this.receiverService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
    

    this.receiverService.getReceiver(this.receiverId).subscribe(receiver => {
      this.receiverData = receiver;
      console.log(this.receiverData);
      
      this.initForm();
    });
  }

  initForm() {
    this.receiverForm = this.fb.group({
      country: [this.receiverData.country], // Display-only field
      // Other form controls - adjust as per your requirements
      type: [this.receiverData.type],
      countryCode: [this.receiverData.countryCode],
      phoneNumber: [this.receiverData.phoneNumber],
      firstName: [this.receiverData.firstName, Validators.required],
      middleName: [this.receiverData.middleName],
      lastName: [this.receiverData.lastName, Validators.required]
    });

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


  onSubmit() {
    const updatedReceiverData = this.receiverForm.value;
    this.receiverService.updateReceiver(this.receiverId, updatedReceiverData).subscribe(response => {
      this.router.navigate(["/myreceiver"]);
    });
  }

  onCancel() {
    this.router.navigate(["/myreceiver"]);
  }



// onCountryChange() {
//   const selectedCountry = this.receiverForm.get('country').value;
//   const countryDetails = this.countries.find(country => country.name === selectedCountry);

//   const controlsToEnable = countryDetails.fields;
//   controlsToEnable.forEach(control => {
//     this.receiverForm.get(control).enable();
//   });

//   const controlsToDisable = ['type', 'countryCode', 'phoneNumber', 'firstName', 'middleName', 'lastName'];
//   controlsToDisable.forEach(control => {
//     if (!controlsToEnable.includes(control)) {
//       this.receiverForm.get(control).disable();
//     }
//   });
// }

}
