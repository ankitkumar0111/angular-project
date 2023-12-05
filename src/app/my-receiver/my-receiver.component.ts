import { Component, OnInit } from '@angular/core';
import { ReceiverService } from '../receiver.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-receiver',
  templateUrl: './my-receiver.component.html',
  styleUrls: ['./my-receiver.component.css']
})
export class MyReceiverComponent implements OnInit {

  receivers: any[];

  constructor(private receiverService: ReceiverService,private router: Router) {}

  ngOnInit() {
    this.receiverService.getReceivers().subscribe(receivers => {
      this.receivers = receivers;
    });
  }

  navigateToAddReceiver() {
    this.router.navigate(['/add']);
  }

  editReceiver(receiverId: number) {
    this.router.navigate(['/edit-receiver', receiverId]);
  }

  deleteReceiver(receiverId: number) {
    this.receivers = this.receivers.filter(receiver => receiver.id !== receiverId);

    this.receiverService.deleteReceiver(receiverId).subscribe(response => {
      console.log(`Receiver with ID ${receiverId} deleted successfully.`);
    });
  }
  

  // Inside your Angular component
// activeAccordion: number | null = null; // Initialize as null or any default value

// // Function to toggle the active accordion
// toggleAccordion(receiverId: number): void {
//   if (this.activeAccordion === receiverId) {
//     // If the clicked receiver's accordion is already active, close it
//     this.activeAccordion = null;
//   } else {
//     // If another receiver's accordion is active, close it before opening the clicked one
//     this.activeAccordion = receiverId;
//   }
// }


}
