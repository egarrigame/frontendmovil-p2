import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../services/players.service';

@Pipe({
  name: 'playerFilter',
  standalone: true
})
export class PlayerFilterPipe implements PipeTransform {
  transform(
    players: Player[],
    searchTerm: string,
    positionFilter: string
  ): Player[] {
    if (!players) return [];
    let filtered = players;

    if (positionFilter) {
      filtered = filtered.filter(
        p => p.posicion.toLowerCase() === positionFilter.toLowerCase()
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        (p.nombre + ' ' + p.apellidos).toLowerCase().includes(term)
      );
    }

    return filtered;
  }
}

