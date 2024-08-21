import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Client } from '../../../../shared/types/clients.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  filterTerm: string = '';

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe({
      next: (response: any) => {
        this.clients = response.clients;
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      },
    });
  }

  filteredClients() {
    return this.clients.filter(
      (client) =>
        client.firstName
          .toLowerCase()
          .includes(this.filterTerm.toLowerCase()) ||
        client.lastName.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(this.filterTerm.toLowerCase())
    );
  }

  editClient(client: Client): void {
    this.router.navigate(['/clients', client._id]);
  }

  createClient(): void {
    this.router.navigate(['/clients/new']);
  }

  deleteClient(id: string): void {
    if (confirm('Are you sure you want to delete this client?')) {
      this.clientService.deleteClient(id).subscribe(() => {
        this.clients = this.clients.filter((client) => client._id !== id);
      });
    }
  }
}
