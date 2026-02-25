/* Comportamiento del componente con TS, se importa en app/app.ts para que se pueda mostrar.
Desde aquí importamos el modelo y los datos a datos/players-data.ts y se guarda en una variable para que luego el html pueda leerlo.  */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para que el componente pueda usar html (html puede entender los comandos ngFor y ngIf para bucles y visibilidad de elementos)
import { Player } from '../../models/player'; // Modelo de los datos de players
import { PLAYERS } from '../../datos/players-data'; // Datos de los players
import { Detail } from '../detail/detail'; // Componente detail para mostrarlo de cada player
import { Search } from '../search/search'; // Componente del filtro
import { FilterPipe } from '../../pipes/filter-pipe'; // Pipe de filtrado

@Component({
  selector: 'app-players',
  imports: [CommonModule, Detail, Search, FilterPipe], // 
  templateUrl: './players.html',
  styleUrl: './players.css',
})
export class Players {
  listaPlayers: Player[] = PLAYERS; // Variable con los players definidos en datos, para que el html pueda leer a los jugadores que contiene.

  playerSeleccionado?: Player; // Variable para guardar player seleccionado con el click

  textoFiltro: string = ''; // variable para guardar lo que el usuario escribe, viene de players.html que anteriormente lo ha recibido del output de search.ts
  posicionFiltro: string = '';

  verDetail(player: Player) {  // Función para mostrar el detail del player guardado en la variable anterior
    if (this.playerSeleccionado === player) { // Si al hacer click el player es el mismo que está seleccionado, se anula la selección (se pone undefined) y como el player no está en la variable no se muestra el detail
      this.playerSeleccionado = undefined;
    } else {
      this.playerSeleccionado = player; // Si al hacer click es otro player, se guarda en la variable y se pinta el detalle
    }
  }
  // al hacer click, se llama a la función verDetail, que guarda al jugador seleccionado en la variable, entonces el html lee la variable y lo pone en el html desde la etiqueta <app-detail>. Le pasa los datos al @input para que el detail pueda mostrar los datos del player.


}
