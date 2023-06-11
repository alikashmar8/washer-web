import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdsService } from 'src/app/services/ads.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { loadingGifUrl } from 'src/constants/constants';
import { Employee } from 'src/models/employee.model';

@Component({
  selector: 'app-create-ad-modal',
  templateUrl: './create-ad-modal.component.html',
  styleUrls: ['./create-ad-modal.component.css'],
})
export class CreateAdModalComponent implements OnInit {
  currentEmployee: Employee;
  ad = {
    title: null,
    description: null,
    isActive: false,
    image: null,
  };
  file: any;

  count: number;

  isStoreLoading: boolean = false;
  loadingGif: string = loadingGifUrl;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private adsService: AdsService,
    public activeModal: NgbActiveModal
  ) {
    this.currentEmployee = authService.currentEmployee;
  }

  async ngOnInit(): Promise<void> {}

  uploadImage(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  store() {
    this.isStoreLoading = true;
    if (!this.ad.title) {
      this.alertService.toastError('Title should not be empty');
      this.isStoreLoading = false;
      return;
    }

    if (!this.file) {
      this.alertService.toastError('Title image should not be empty');
      this.isStoreLoading = false;
      return;
    }

    let data = new FormData();
    data.append('title', this.ad.title);
    data.append('description', this.ad.description);
    data.append('image', this.file, this.file.name);

    this.adsService.store(data).subscribe({
      next: (data) => {
        console.log(data);
        this.alertService.toastSuccess('Ad Added Successfully');
        this.isStoreLoading = false;
        this.activeModal.close(true);
      },
      error: (error) => {
        console.log(error);
        this.authService.handleHttpError(error);
        this.isStoreLoading = false;
      },
    });
  }
}
