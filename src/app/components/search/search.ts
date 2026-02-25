import { Component, EventEmitter, Output } from '@angular/core'; // Añadimos eventEmiter y Output para poder usarlos (output envía datos y eventEmiter lleva esos datos)

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {

  // Output le dice a angular que la variable 'busqueda' es para enviar y que la escuchará el componente padre, 
  @Output() busqueda = new EventEmitter<string>();  // eventEmiter dice que enviamos una string (que será el texto buscado)

  @Output() posicion = new EventEmitter<string>(); // nuevo output para enviar también la posición del filtro

  textoBusqueda(event: any) {  // se ejecuta cuando el usuario escribe (event del naveagador), recibe datos de /search.html
    const texto = event.target.value; // guardamos el texto (value) que el usuario ha escrito en el campo (event.target)
    this.busqueda.emit(texto); // .emit envía el texto guardado en la variable 'busqueda'
  }

  // mismo proceder para la selección de posición
  posicionSeleccion(event: any) {
    const posicion = event.target.value;
    this.posicion.emit(posicion);
  }
}
