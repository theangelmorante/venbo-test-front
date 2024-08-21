import { Component } from '@angular/core';
import { ClientListComponent } from './client-list/client-list.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [ClientListComponent, HttpClientModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent {}
