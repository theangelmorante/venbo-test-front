import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Client } from '../../../../shared/types/clients.type';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

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
  typeFilter: string = '';
  statusFilter: string = '';
  regularFilter: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe({
      next: (response: any) => {
        this.clients = response.clients;
        this.calculateTotalPages();
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      },
    });
  }

  calculateTotalPages(): void {
    const filtered = this.filteredClients();
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
  }

  filteredClients() {
    return this.clients
      .filter(
        (client) =>
          client.firstName
            .toLowerCase()
            .includes(this.filterTerm.toLowerCase()) ||
          client.lastName.toLowerCase().includes(this.filterTerm.toLowerCase())
      )
      .filter(
        (client) => this.typeFilter === '' || client.type === this.typeFilter
      )
      .filter(
        (client) =>
          this.statusFilter === '' ||
          (this.statusFilter === 'active' ? client.isActive : !client.isActive)
      )
      .filter(
        (client) =>
          this.regularFilter === '' ||
          (this.regularFilter === 'true' ? client.isRegular : !client.isRegular)
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

  paginatedClients() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredClients().slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.calculateTotalPages();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.calculateTotalPages();
    }
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, `${fileName}_export_${new Date().getTime()}.xlsx`);
  }

  exportToExcel(): void {
    const filteredClients = this.filteredClients().map((client) => ({
      Identification: client.identification,
      Name: client.firstName,
      Surname: client.lastName,
      Email: client.email,
      Address: client.address,
      Type: client.type,
      IsRegular: client.isRegular ? 'Yes' : 'No',
      IsActive: client.isActive ? 'Yes' : 'No',
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredClients);
    const workbook: XLSX.WorkBook = {
      Sheets: { Clients: worksheet },
      SheetNames: ['Clients'],
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    this.saveAsExcelFile(excelBuffer, 'clients');
  }
}
