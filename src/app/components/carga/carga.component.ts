import { Component, OnInit } from '@angular/core';
import { FileItemI } from 'src/app/models/file-item-model';
import { CargaImagenesService } from 'src/app/services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.scss']
})
export class CargaComponent implements OnInit {
  
  estaSobreDropZone: boolean = false;
  archivos: FileItemI[] = [];

  constructor(public cargaImgSvc: CargaImagenesService) { }

  ngOnInit(): void {
  }

  cargarImagenes() {
    this.cargaImgSvc.cargarImagenesFirebase(this.archivos);
  }

  limpiarArchivos() {
    this.archivos = [];
  }

}
