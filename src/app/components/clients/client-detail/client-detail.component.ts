import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../services/client.service';
import Swal from 'sweetalert2';
import { NoSpecialCharactersDirective } from '../../../directives/no-special-characters.directive';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NoSpecialCharactersDirective,
  ],
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css'],
})
export class ClientDetailComponent implements OnInit {
  clientForm!: FormGroup;
  isEditMode: boolean = false;
  clientId!: string;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      identification: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      type: ['PERSON', [Validators.required]],
      isRegular: [false],
      isActive: [true],
      employees: this.fb.array([]),
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.clientId = params['id'];
        this.clientService.getClient(this.clientId).subscribe((client) => {
          this.clientForm.patchValue(client);
          this.setEmployees(client.employees || []);
        });
      }
    });
  }

  employees(): FormArray {
    return this.clientForm.get('employees') as FormArray;
  }

  addEmployee() {
    this.employees().push(
      this.fb.group({
        id: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      })
    );
  }

  removeEmployee(index: number) {
    this.employees().removeAt(index);
  }

  setEmployees(employees: any[]) {
    const employeeFGs = employees.map((employee) => this.fb.group(employee));
    const employeeFormArray = this.fb.array(employeeFGs);
    this.clientForm.setControl('employees', employeeFormArray);
  }

  onSubmit(): void {
    if (!this.clientForm.valid) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Please fill all the required fields',
      });
      return;
    }

    if (this.isEditMode) {
      this.clientService
        .updateClient(this.clientId, this.clientForm.value)
        .subscribe({
          next: () => {
            this.router.navigate(['/clients']);
          },
          error: (err) => {
            console.log('err: ', err);
            if (err.status === 400) {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err?.error?.error || 'Something went wrong!',
              });
              return;
            }
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Something went wrong!',
            });
          },
        });
    } else {
      this.clientService.createClient(this.clientForm.value).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    }
  }
}
