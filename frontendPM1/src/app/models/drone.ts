export class Drone {
  id!: number;
  marca!: string;
  modelo!: string;

  constructor(id: number, marca: string, modelo: string) {
    this.id = id;
    this.marca = marca;
    this.modelo = modelo;
  }
}