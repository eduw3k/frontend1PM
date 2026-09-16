import { Injectable } from '@angular/core';
import { Drone } from '../models/drone';

@Injectable({
  providedIn: 'root'
})
export class DroneService {

  private drones: Drone[] = [
    new Drone(1, 'DJI', 'Mini 4 Pro'),
    new Drone(2, 'DJI', 'Mavic 3'),
    new Drone(3, 'Autel', 'EVO Nano+')
  ];

  listar(): Drone[] {
    return this.drones;
  }

  criar(drone: Drone): void {
    drone.id = this.drones.length > 0
      ? Math.max(...this.drones.map(d => d.id)) + 1
      : 1;

    this.drones.push(drone);
  }

  editar(drone: Drone): void {
    const index = this.drones.findIndex(d => d.id === drone.id);

    if (index !== -1) {
      this.drones[index] = drone;
    }
  }

  excluir(id: number): void {
    this.drones = this.drones.filter(d => d.id !== id);
  }

  buscarPorId(id: number): Drone | undefined {
    return this.drones.find(d => d.id === id);
  }
}