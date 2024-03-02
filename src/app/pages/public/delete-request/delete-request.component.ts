import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-delete-request',
  templateUrl: './delete-request.component.html',
  styleUrls: ['./delete-request.component.css'],
})
export class DeleteRequestComponent implements OnInit {
  constructor(private alertService: AlertService) {}

  ngOnInit(): void {}

  deleteRequest() {
    setTimeout(() => {
      this.alertService.toastSuccess('Request Deleted Successfully');
    }, 500);
  }
}
