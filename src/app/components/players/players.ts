import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersService, Player } from '../../services/players.service';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './players.html',
  styleUrl: './players.scss',
})
export class PlayersComponent implements OnInit {
  players: Player[] = [];

  @Input() selectedPlayer: Player | null = null;
  @Output() playerSelected = new EventEmitter<Player>();

  constructor(private playersService: PlayersService) {}

  async ngOnInit(): Promise<void> {
    try {
      const rawPlayers = await this.playersService.getPlayers();
      this.players = rawPlayers.filter((p) => p && p.nombre);
    } catch (error) {
      console.error('Error cargando jugadores:', error);
    }
  }

  // Seleccionar jugador
  selectPlayer(player: Player) {
    this.playerSelected.emit(player);
  }

  // Crear un jugador nuevo (vacío) y avisar al componente padre
 newPlayer() {
  const empty: Player = {
    nombre: '',
    apellidos: '',
    posicion: '',
    edad: 0,
    altura: 0,
    photoUrl: '',
    videoUrl: '',
  };

  // 1) Lo añadimos a la lista local
  this.players.push(empty);

  // 2) Lo marcamos como seleccionado (para que el detalle se ponga en modo edición)
  this.playerSelected.emit(empty);
}


  // Borrar un jugador (icono papelera)
  async deletePlayer(player: Player, event: MouseEvent) {
    event.stopPropagation(); // que no dispare selectPlayer

    if (!player.id) {
      console.warn('No se puede borrar un jugador sin id');
      return;
    }

    const confirmar = confirm(
      `¿Seguro que quieres borrar a ${player.nombre} ${player.apellidos}?`
    );
    if (!confirmar) return;

    try {
      await this.playersService.deletePlayer(player.id);
      // quitarlo de la lista local
      this.players = this.players.filter((p) => p.id !== player.id);
    } catch (err) {
      console.error('Error borrando jugador:', err);
      alert('Error borrando el jugador.');
    }
  }
}

