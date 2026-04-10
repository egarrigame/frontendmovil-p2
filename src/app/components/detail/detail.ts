import { Component, Input, Output, EventEmitter, inject, ChangeDetectorRef } from '@angular/core'; // Añdimos input, output y eventEmitter para que se puedan usar
import { CommonModule } from '@angular/common'; // Necesario para *ngFor *ngIf
import { FormsModule } from '@angular/forms'; // Para inputs y captura de datos introducidos
 
import { Player } from '../../models/player'; //Modelo de datos de players
import { Media } from '../media/media'; // Componente media para incluir el reproductor

import { Firestore, doc, updateDoc } from '@angular/fire/firestore'; // Herramientas de firebase para actualizar

@Component({
  selector: 'app-detail',
  imports: [CommonModule, Media, FormsModule], // Añadimos Media y FormsModule para poder usar el html de media y los inputs en detail
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {
  @Input() player?: Player; // Aquí le decimos a Angular que la información (la variable) vendrá de otro componente (un player de players). El html lee la variable y puede recibir datos desde players.

  @Output() cerrarDetail = new EventEmitter<void>(); // Emite un evento vacío para que /players.html ponga en undefined el jugador seleccionado y así se cierra el detalle

  private firestore: Firestore = inject(Firestore); // Conexión con Firestore, la que está configurada en /app.config.ts

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef); // forzar la actualización del hhtml cuando cambien datos

  modoEdicion: boolean = false;
  playerEditado: Partial<Player> = {}; // Guardamos los datos cambiados (partial porque noi son todos obligatorios)

  botonX() { // función que llamaremos desde /detail.html con el botón para cerrar el detalle
    this.cerrarDetail.emit();  // se emite el evento del output
  }

  activarEdicion() { // guardamos los datos actuales del player
    this.modoEdicion = true;
    this.playerEditado = { ...this.player }; 
  }

  cancelarEdicion() { // si se cancela, volvemos al original
    this.modoEdicion = false;
  }

  async guardarEdicion() {
    if (!this.player) return;

    try {
      const documentoRef = doc(this.firestore, 'players', this.player.id); // marcar el jugador que modificamos en firebase
      
      const { id, ...datosAActualizar } = this.playerEditado as Player; // separamos el id, sólo enviamos datos

      await updateDoc(documentoRef, datosAActualizar); // actualización del documento en firebase
      
      console.log('Jugador actualizado con éxito');
      
      this.modoEdicion = false; // quitamos modo edición al guardar
      this.cdr.detectChanges(); // forzamos repintar el html

    } catch (error) {
      console.error('Error al actualizar el jugador:', error);
    }
  }
}
