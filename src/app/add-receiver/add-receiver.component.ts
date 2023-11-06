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
      firstName: [''],
      middleName: [''],
      lastName: [''],
      address: ['']
    });

    this.receiverService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

  // Method to handle form submission
  onSubmit() {
    const receiverData = this.receiverForm.value;
    this.receiverService.postReceiver(receiverData).subscribe(response => {
      // Handle response if needed
    });
    this.router.navigate(["/myreceiver"])
  }

  // Method to handle changes in selected country
  onCountryChange() {
    const selectedCountry = this.receiverForm.get('country').value;
    const countryDetails = this.countries.find(country => country.name === selectedCountry);

    // Enable/disable form controls based on selected country
    const controls = ['firstName', 'middleName', 'lastName', 'address'];
    controls.forEach(control => {
      if (countryDetails.fields.includes(control)) {
        this.receiverForm.get(control).enable();
      } else {
        this.receiverForm.get(control).disable();
      }
    });
  }

}
