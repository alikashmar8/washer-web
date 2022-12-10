import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/models/employee.model';

@Component({
  selector: 'app-show-employee-modal',
  templateUrl: './show-employee-modal.component.html',
  styleUrls: ['./show-employee-modal.component.css'],
})
export class ShowEmployeeModal implements OnInit {
  @Input() employee: Employee;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
