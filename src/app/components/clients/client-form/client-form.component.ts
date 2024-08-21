import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  imports: [HttpClientModule],
})
export class ClientFormComponent implements OnInit {
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
      name: ['', [Validators.required]],
      surname: ['', [Validators.required, this.validateNameSurname()]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      type: ['PERSONA', [Validators.required]],
      isRegular: [false],
      isActive: [true],
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.clientId = params['id'];
        this.clientService.getClient(this.clientId).subscribe((client) => {
          this.clientForm.patchValue(client);
        });
      }
    });
  }

  validateNameSurname() {
    return (control: any) => {
      const value = control.value;
      if (/[^a-zA-Z\s]/.test(value)) {
        return { invalidName: true };
      }
      return null;
    };
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      if (this.isEditMode) {
        this.clientService
          .updateClient(this.clientId, this.clientForm.value)
          .subscribe(() => {
            this.router.navigate(['/clients']);
          });
      } else {
        this.clientService.createClient(this.clientForm.value).subscribe(() => {
          this.router.navigate(['/clients']);
        });
      }
    }
  }
}
