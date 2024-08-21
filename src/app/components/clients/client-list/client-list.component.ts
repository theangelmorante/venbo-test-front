import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Client } from '../../../../shared/types/clients.type';

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

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe((data) => {
      this.clients = data.clients;
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

  editClient(client: any): void {
    // Redirigir al formulario de edición
  }

  deleteClient(id: string): void {
    if (confirm('Are you sure you want to delete this client?')) {
      this.clientService.deleteClient(id).subscribe(() => {
        this.clients = this.clients.filter((client) => client.id !== id);
      });
    }
  }
}
