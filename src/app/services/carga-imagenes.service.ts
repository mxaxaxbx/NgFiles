import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { FileItemI, ItemI } from '../models/file-item-model';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';
  

  constructor(private db: AngularFirestore, private storage: AngularFireStorage ) { }

  cargarImagenesFirebase(imagenes: FileItemI[]) {
    const storageRef = this.storage.storage.ref();

    for( const item of imagenes ) {
      item.estaSubiendo = true;
      const uploadTask = storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`)
        .put(item.archivo)

      uploadTask.on('state_changed', (snapshot) => {
        item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      }, (err) => {
        console.error('Upload File error: ', err);
        item.estaSubiendo = false;

      }, () => {
        uploadTask.snapshot.ref.getDownloadURL()
          .then(downloadURL => {
            item.url = downloadURL;
            item.estaSubiendo = false;

            this.guardarImagen({
              nombre: item.nombreArchivo,
              url: downloadURL,
            });
          })
      } )

      
    }
    
  }

  private guardarImagen(imagen: {nombre: string, url: string}) {
    this.db.collection(`/${this.CARPETA_IMAGENES}`)
      .add( imagen );
  }

  getImagesUploaded(): Observable<ItemI[]> {
    const itemsCollection = this.db.collection<ItemI>(this.CARPETA_IMAGENES);
    return itemsCollection.valueChanges();
  }
}
