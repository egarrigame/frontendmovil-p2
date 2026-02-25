import { Component, Input, ViewChild, ElementRef } from '@angular/core'; // Añadimos ViewChild y ElementRef para buscar el elemento en el html y poder manipularlo (equivalente adoc.getElementById de JS)
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media',
  imports: [CommonModule],
  templateUrl: './media.html',
  styleUrl: './media.css',
})
export class Media {
  @Input() videoUrl?: string; // Recibimos la url del video desde el componente Detail, recibimos la string y lo guardamos como videoUrl
  @ViewChild('reproductor') videoElement!: ElementRef<HTMLVideoElement>; // Buscamos el elemento 'reproductor' en el html de detail y lo guardamos en la variable videoElement. Referenciamos con el tipo VideoElment de html para poder usarlo
  
  // variables para guardar el progreso de reproduccón y el nivel del volumen, ambos de 0 a 100
  reproduccion: number = 0;
  volumen: number = 100;

  // Funciones para el control del vídeo
  play() {
    this.videoElement.nativeElement.play(); // Llamamos a la variable videoElement definida antes y con natuiveElement podemos acceder al html y aplicarle los métodos
  }
  pause() {
    this.videoElement.nativeElement.pause();
  }
  stop() {
    this.videoElement.nativeElement.pause(); // Primero pausamos el vídeo y luego lo devolvemos al inicio
    this.videoElement.nativeElement.currentTime = 0;
  }

  // Control de progreso------------------
  // Función para que la barra avance de manera automática
  barraAutomatica() {
    const video = this.videoElement.nativeElement; // guardamos el video en la variable 'video' para facilitar las formulas
    if (video.duration) {
      this.reproduccion = (video.currentTime / video.duration) * 100; // porcentaje de la reproduccion según el tiempo actual y el tiempo total
    }
  }

  // Función para recalcular progreso cuando el usuario mueva la barra
  barraUsuario(event: any) {
    const video = this.videoElement.nativeElement;
    const nuevaReproduccion = event.target.value; // Capturamos donde el usuario ha movido la barra y lo guardamos en la nueva variable
    video.currentTime = (video.duration * nuevaReproduccion) / 100; // Volvemos a calcular el tiempo según el nuevo porcentaje guardado
  }

  // Control de volumen
  volumenUsuario(event: any) {
    const video = this.videoElement.nativeElement;
    const nuevoVolumen = event.target.value; // Capturamos donde el usuario ha movido la barra y lo guardamos
    video.volume = nuevoVolumen; // Aplicamos el nuevo volumen al video directamente
    this.volumen = nuevoVolumen; // También lo guardamos en nuestra variable
  }
}
