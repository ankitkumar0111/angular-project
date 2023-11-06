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

  deleteReceiver(receiverId: number) {
    this.receivers = this.receivers.filter(receiver => receiver.id !== receiverId);

    this.receiverService.deleteReceiver(receiverId).subscribe(response => {
      console.log(`Receiver with ID ${receiverId} deleted successfully.`);
    });
  }

}
