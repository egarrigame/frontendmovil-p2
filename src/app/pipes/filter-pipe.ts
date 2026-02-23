import { Pipe, PipeTransform } from '@angular/core'; // Imports de Angular para crear, nombrar y poder hacer el transform
import { Player } from '../models/player'; // Import de players para que el pipe sepa el tipo y estructura de los datos

@Pipe({   // Le dice a angular que esto es un pipe
  name: 'filter', // Nombre del pipe para poder referenciarlo desde el html
})
export class FilterPipe implements PipeTransform { // la clase FilterPipe debe cumplir con las normas de PipeTransform (función transform dentro)
  
  // transform es la función que se ejecuta al llamar al pipe (sólo se puede llamar así en Angular)
  transform(players: Player[], busqueda: string): Player[] { // recibe lista de jugadores y el texto de del usuario y devuelve lista de jugadores transformada
    
    if (!players || !busqueda) {
      return players; // Si no hay resultados o la busqueda está va´cia devolver la lista original
    }
    const lowBusqueda = busqueda.toLowerCase();
    
    return players.filter(player =>  // como .filter de JS, recorre el array y aplica filtro
      player.nombre.toLowerCase().includes(lowBusqueda) ||      // buscamos por los 3 campos a la vez
      player.apellidos.toLowerCase().includes(lowBusqueda) ||   // pasamos el campo a lowerCase y comparamos con la busqueda a lowerCase
      player.posicion.toLowerCase().includes(lowBusqueda)
    );
  }
}
