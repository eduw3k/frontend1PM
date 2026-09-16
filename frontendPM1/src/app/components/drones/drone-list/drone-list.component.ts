import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { Drone } from '../../../models/drone';
import { DroneService } from '../../../services/drone.service';

@Component({
  selector: 'app-drone-list',
  standalone: true,
  imports: [MdbRippleModule],
  templateUrl: './drone-list.component.html',
  styleUrl: './drone-list.component.scss'
})
export class DroneListComponent implements OnInit {

  drones: Drone[] = [];

  constructor(
    private droneService: DroneService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.drones = this.droneService.listar();
  }

  novo(): void {
    this.router.navigate(['/drones/novo']);
  }

  editar(id: number): void {
    this.router.navigate(['/drones/editar', id]);
  }

  excluir(id: number): void {
    if (confirm('Deseja realmente excluir este drone?')) {
      this.droneService.excluir(id);
      this.listar();
    }
  }
}