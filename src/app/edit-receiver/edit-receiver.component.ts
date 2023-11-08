import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceiverService } from '../receiver.service';

@Component({
  selector: 'app-edit-receiver',
  templateUrl: './edit-receiver.component.html',
  styleUrls: ['./edit-receiver.component.css']
})
export class EditReceiverComponent implements OnInit {

  receiverForm: FormGroup;
  receiverId: number;

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router, 
    private receiverService: ReceiverService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.receiverId = +params['id'];
      this.receiverService.getReceiver(this.receiverId).subscribe(receiver => {
        this.populateForm(receiver);
      });
    });
  }

  populateForm(receiver: any) {
    this.receiverForm.patchValue({
      firstName: receiver.firstName,
      lastName: receiver.lastName,
      // Add other form fields here
    });
  }

  onSubmit() {
    const receiverData = this.receiverForm.value;
    this.receiverService.updateReceiver(this.receiverId, receiverData).subscribe(response => {
      // Handle response if needed
      this.router.navigate(['/my-receiver']);
    });
  }

}
