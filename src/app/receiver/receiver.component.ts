import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReceiverService } from '../receiver.service';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.css']
})
export class ReceiverComponent implements OnInit {

  receiverForm: FormGroup;
  selectedPayout: string;

  constructor(private formBuilder: FormBuilder, private receiverService: ReceiverService) {}

  ngOnInit(): void {
    this.receiverForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['', Validators.required],
      phoneNumber: [''],
      bankName: [''],
      accountNumber: [''],
      reEnterAccount: [''],
      walletProvider: [''],
      walletCountryCode: [''],
      mobileNumber: [''],
    });

    const localStorageData = localStorage.getItem('data');
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      this.selectedPayout = parsedData.method; // Assuming method is stored in localStorage
      this.setFormValues(parsedData);
    }
  }

  private setFormValues(parsedData: any): void {
    if (this.selectedPayout === 'bank') {
      this.receiverForm.patchValue({
        bankName: parsedData.bankName,
        accountNumber: parsedData.accountNumber,
        reEnterAccount: parsedData.reEnterAccount,
      });
    } else if (this.selectedPayout === 'wallet') {
      this.receiverForm.patchValue({
        walletProvider: parsedData.walletProvider,
        walletCountryCode: parsedData.walletCountryCode,
        mobileNumber: parsedData.mobileNumber,
      });
    }
  }

  onSubmit(): void {
    if (this.receiverForm.valid) {
      const formData = this.receiverForm.value;
      const localStorageData = localStorage.getItem('data');
      
      if (localStorageData) {
        const localStorageParsed = JSON.parse(localStorageData);
        let combinedData = { ...localStorageParsed };
  
        if (localStorageParsed.method === 'bank') {
          combinedData = {
            ...combinedData,
            bankName: formData.bankName,
            accountNumber: formData.accountNumber,
            reEnterAccount: formData.reEnterAccount,
          };
        } else if (localStorageParsed.method === 'wallet') {
          combinedData = {
            ...combinedData,
            walletProvider: formData.walletProvider,
            walletCountryCode: formData.walletCountryCode,
            mobileNumber: formData.mobileNumber,
          };
         
        }
        else if(localStorageParsed.method === 'cash'){
          combinedData= {...combinedData}
        }
  
        this.receiverService.postFormData(combinedData)
          .subscribe(
            (response) => {
              console.log('Combined data submitted successfully!', response);
            },
            (error) => {
              console.error('Error occurred while submitting combined data:', error);
            }
          );
      }
    }  else {
      console.log('Form is invalid. Please fill in all required fields.')
    }
  }

}
