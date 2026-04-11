/* Comportamiento del componente con TS, se importa en app/app.ts para que se pueda mostrar.
Desde aquí importamos el modelo y los datos a datos/players-data.ts y se guarda en una variable para que luego el html pueda leerlo.  */

import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para que el componente pueda usar html (html puede entender los comandos ngFor y ngIf para bucles y visibilidad de elementos)
import { FormsModule } from '@angular/forms'; // Para que el componente pueda usar formularios y capturar datos introducidos por el usuario
import { Player } from '../../models/player'; // Modelo de los datos de players
import { Detail } from '../detail/detail'; // Componente detail para mostrarlo de cada player
import { Search } from '../search/search'; // Componente del filtro
import { FilterPipe } from '../../pipes/filter-pipe'; // Pipe de filtrado
import { Firestore, collection, onSnapshot, doc, deleteDoc, addDoc } from '@angular/fire/firestore'; // Herramientas de firebase

@Component({
  selector: 'app-players',
  imports: [CommonModule, Detail, Search, FilterPipe, FormsModule], // 
  templateUrl: './players.html',
  styleUrl: './players.css',
})
export class Players implements OnInit { // OnInit carga los datos de firebase al iniciar el componente
  listaPlayers: Player[] = []; // Variable con los players definidos en datos, para que el html pueda leer a los jugadores que contiene, ahora está vacío porque vienen de Firebase

  playerSeleccionado?: Player; // Variable para guardar player seleccionado con el click

  textoFiltro: string = ''; // variable para guardar lo que el usuario escribe, viene de players.html que anteriormente lo ha recibido del output de search.ts
  posicionFiltro: string = '';

  mensajeExito: string = ''; // mensajes éxito o error
  mensajeError: string = '';

  mostrarFormularioAlta: boolean = false; // variables para crear jugador
  nuevoPlayer: Partial<Player> = {
    nombre: '',
    apellidos: '',
    posicion: 'Base',
    edad: 18,
    altura: 1.80,
    video: 'assets/videos/',
    imagen: 'assets/images/' // rutas preparadas para al crear un nuevo player que apunte a la carpeta
  };

  private firestore: Firestore = inject(Firestore); // Conexión con Firestore, la que está configurada en /app.config.ts
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit() { // se ejecuta cuando el componente nace
    const playersRef = collection(this.firestore, 'players'); // colección de firebase

    onSnapshot(playersRef, (snapshot) => { // comunicación en tiempo real
      const arrayTemporal: Player[] = []; // primero los guardamos aquí y cuando está completa ya pasamos a la variable principal
      
      snapshot.forEach((doc) => { // recorremos el snapshot y extraemos cada dodcumento
        const jugador = { id: doc.id, ...doc.data() } as unknown as Player; // sacamos el id y los datos del player
        arrayTemporal.push(jugador);  // metemos al player en la variable temporal
      });

      console.log('Datos listos para pintar:', arrayTemporal); // log comporobación
      
      this.listaPlayers = arrayTemporal; // array temporal completo lo pasamos a la variable principal de lista de players

      if (this.playerSeleccionado) { // sincronizar el detalle abierto cuando hagamos cambios en un jugador
        const jugadorActualizado = this.listaPlayers.find(p => p.id === this.playerSeleccionado?.id); // buscamos la version nueva
        
        if (jugadorActualizado) {
          this.playerSeleccionado = jugadorActualizado; // si hay jugador actualizado, actualizamos variable y el detalle
        } else {
          this.playerSeleccionado = undefined;
        }
      }
      
      this.cdr.detectChanges(); // cuando la variable cambia, repinta el html automático
      
    }, (error) => {
      console.error('Error al conectar con Firebase:', error); // log comprobación
    });
  }

  abrirFormulario() { // from para crear jugador
    this.mostrarFormularioAlta = true;
    this.playerSeleccionado = undefined;
  }

  async guardarNuevoJugador() {
    if (!this.nuevoPlayer.nombre || !this.nuevoPlayer.apellidos) { // check campos obligatorios
      this.mensajeError = 'Nombre y apellidos obligatorio';
      this.cdr.detectChanges();
      return;
    }
    
    try {
      if (this.nuevoPlayer.imagen === 'assets/images/') { 
        this.nuevoPlayer.imagen = 'assets/images/Jose.jpg'; // si no ha escrito nombre de imagen, ponemos una default
      }

      if (this.nuevoPlayer.video === 'assets/videos/') {
        this.nuevoPlayer.video = 'assets/videos/Jose.mp4'; // Mismo para video
      }
      
      const playersRef = collection(this.firestore, 'players');
      
      await addDoc(playersRef, this.nuevoPlayer); // enviamos el objeto a firebase, id automático

      this.mensajeExito = 'Jugador registrado'; // mensaje de e´xito y borramos si hubiera de error
      this.mensajeError = '';
    
      this.mostrarFormularioAlta = false;
      this.nuevoPlayer = { nombre: '', apellidos: '', posicion: 'Base', edad: 18, altura: 1.80, video: 'assets/videos/', imagen: 'assets/images/' };

      setTimeout(() => { // borramos mensaje en 3 segundos
        this.mensajeExito = '';
        this.cdr.detectChanges();
      }, 3000);

      this.cdr.detectChanges();

    } catch (error) {
      this.mensajeError = 'Error al crear el jugador'; // mensaje de error
      console.error('Error al crear jugador', error);
    }
  }

  verDetail(player: Player) {  // Función para mostrar el detail del player guardado en la variable anterior
    this.mostrarFormularioAlta = false; // cerrar el form de creación de jugador si se abre un detalle
    if (this.playerSeleccionado === player) { // Si al hacer click el player es el mismo que está seleccionado, se anula la selección (se pone undefined) y como el player no está en la variable no se muestra el detail
      this.playerSeleccionado = undefined;
    } else {
      this.playerSeleccionado = player; // Si al hacer click es otro player, se guarda en la variable y se pinta el detalle
    }
  }
  // al hacer click, se llama a la función verDetail, que guarda al jugador seleccionado en la variable, entonces el html lee la variable y lo pone en el html desde la etiqueta <app-detail>. Le pasa los datos al @input para que el detail pueda mostrar los datos del player.

  async borrarJugador(idJugador: string, event: Event) { // función de borrado de jugador
    event.stopPropagation();
    
    const confirmar = confirm('¿Estás seguro de que quieres borrar a este jugadors?');
    
    if (confirmar) {
      try {
        const documentoRef = doc(this.firestore, 'players', idJugador); // REFERENCIAMOS AL DOCUMENTO ÚNICO DEL JUGADOR
        
        await deleteDoc(documentoRef); // orden de borrado en firebase
        console.log('Jugador borrado');
        
        if (this.playerSeleccionado?.id === idJugador) { // cerrar detalle si era el jugador que hemos borrado
          this.playerSeleccionado = undefined;
        }
      } catch (error) {
        console.error('Error al intentar borrar el jugador:', error);
      }
    }
  }

}
