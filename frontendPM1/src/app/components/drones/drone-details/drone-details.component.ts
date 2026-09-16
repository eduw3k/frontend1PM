import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { Drone } from '../../../models/drone';
import { DroneService } from '../../../services/drone.service';

@Component({
  selector: 'app-drone-details',
  standalone: true,
  imports: [FormsModule, MdbRippleModule],
  templateUrl: './drone-details.component.html',
  styleUrl: './drone-details.component.scss'
})
export class DroneDetailsComponent implements OnInit {

  drone: Drone = new Drone(0, '', '');

  editando = false;

  constructor(
    private droneService: DroneService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      const droneEncontrado =
        this.droneService.buscarPorId(Number(id));

      if (droneEncontrado) {

        this.drone = new Drone(
          droneEncontrado.id,
          droneEncontrado.marca,
          droneEncontrado.modelo
        );

        this.editando = true;
      }
    }
  }

  salvar(): void {

    if (this.editando) {

      this.droneService.editar(this.drone);

    } else {

      this.droneService.criar(this.drone);

    }

    this.router.navigate(['/drones']);
  }

  cancelar(): void {
    this.router.navigate(['/drones']);
  }
}