import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemI } from 'src/app/models/file-item-model';
import { CargaImagenesService } from 'src/app/services/carga-imagenes.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.scss']
})
export class FotosComponent implements OnInit {

  items: Observable<ItemI[]>;

  constructor(private imagesSvc: CargaImagenesService) { }

  ngOnInit(): void {
    this.items = this.imagesSvc.getImagesUploaded();
  }

}
