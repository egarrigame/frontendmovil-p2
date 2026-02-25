import { Pipe, PipeTransform } from '@angular/core'; // Imports de Angular para crear, nombrar y poder hacer el transform
import { Player } from '../models/player'; // Import de players para que el pipe sepa el tipo y estructura de los datos

@Pipe({   // Le dice a angular que esto es un pipe
  name: 'filter', // Nombre del pipe para poder referenciarlo desde el html
})
export class FilterPipe implements PipeTransform { // la clase FilterPipe debe cumplir con las normas de PipeTransform (función transform dentro)
  
  // transform es la función que se ejecuta al llamar al pipe (sólo se puede llamar así en Angular)
  transform(players: Player[], busqueda: string, posicion: string): Player[] { // recibe lista de jugadores, el texto de del usuario y la selección de la posición y devuelve lista de jugadores transformada
    
    if (!players) {
      return[]; // Si no hay resultados, devolvemos vacío
    }
    const lowBusqueda = busqueda.toLowerCase();
    
    return players.filter(player => {  // como .filter de JS, recorre el array y aplica filtro
      
      let busquedaValida = true; // variable para validar la busqueda y usar como condiciona al imprimri el resultado del filtro
      if (busqueda) { // si hay búsqueda, validamos que sea correcta
      busquedaValida = 
        player.nombre.toLowerCase().includes(lowBusqueda) ||      // buscamos por los 3 campos a la vez
        player.apellidos.toLowerCase().includes(lowBusqueda)   // pasamos el campo a lowerCase y comparamos con la busqueda a lowerCase
      }

      let posicionValida = true;
      if (posicion !== '') {  // si la posición no está vacía, validamos si coincide
        posicionValida = player.posicion.toLowerCase() === posicion.toLowerCase(); // si el usuario ha seleccionado una posición, comparamos con la del jugador
      }
    
      return busquedaValida && posicionValida; // si cumple con las dos validaciones, devolvemos la lista transformada  
    });
  }
}
