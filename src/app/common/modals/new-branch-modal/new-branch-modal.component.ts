import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { BranchesService } from 'src/app/services/branches.service';
import { loadingGifUrl } from 'src/constants/constants';
import { CreateBranchDTO } from 'src/dtos/create-branch.dto';
import { Employee } from 'src/models/employee.model';

@Component({
  selector: 'app-new-branch-modal',
  templateUrl: './new-branch-modal.component.html',
  styleUrls: ['./new-branch-modal.component.css'],
})
export class NewBranchModalComponent implements OnInit {
  currentEmployee: Employee;
  branch: CreateBranchDTO = {
    description: null,
    coverageArea: null,
    address: {
      city: null,
      region: null,
      street: null,
      building: null,
      lat: null,
      lon: null,
      description: null,
    },
  };

  count: number;

  isStoreLoading: boolean = false;
  loadingGif: string = loadingGifUrl;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private branchesService: BranchesService,
    public activeModal: NgbActiveModal
  ) {
    this.currentEmployee = authService.currentEmployee;
  }

  async ngOnInit(): Promise<void> {}

  store() {
    this.isStoreLoading = true;
    if (!this.branch.description) {
      this.alertService.toastError('Branch name should not be empty');
      this.isStoreLoading = false;
      return;
    }

    if (!this.branch.coverageArea) {
      this.alertService.toastError('Branch coverage area should not be empty');
      this.isStoreLoading = false;
      return;
    }

    if (!this.branch.address.city) {
      this.alertService.toastError('Branch city should not be empty');
      this.isStoreLoading = false;
      return;
    }

    // if (!this.branch.address.region) {
    //   this.alertService.toastError('Branch region should not be empty');
    //   this.isStoreLoading = false;
    //   return;
    // }

    if (!this.branch.address.building) {
      this.alertService.toastError('Branch building should not be empty');
      this.isStoreLoading = false;
      return;
    }

    if (!this.branch.address.description) {
      this.alertService.toastError('Branch address should not be empty');
      this.isStoreLoading = false;
      return;
    }

    if (!this.branch.address.lon || !this.branch.address.lat) {
      this.alertService.toastError(
        'Branch latitude and longitude should be filled!'
      );
      this.isStoreLoading = false;
      return;
    }

    this.branchesService.store(this.branch).subscribe({
      next: (data) => {
        console.log(data);
        this.alertService.toastSuccess('Branch Added Successfully');
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
