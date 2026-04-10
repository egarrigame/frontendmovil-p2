import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Player, PlayersService } from '../../services/players.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnChanges {
  @Input() player: Player | null = null;

  editMode = false;
  editable: Player | null = null;
  saving = false;

  constructor(private playersService: PlayersService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.player) {
      // clonamos para editar sin tocar directamente el objeto original
      this.editable = { ...this.player };
      // si no tiene id, lo consideramos nuevo -> entrar en edición directamente
      this.editMode = !this.player.id;
    } else {
      this.editable = null;
      this.editMode = false;
    }
  }

  enableEdit() {
    if (this.player) {
      this.editable = { ...this.player };
      this.editMode = true;
    }
  }

  async save() {
    if (!this.editable) return;

    this.saving = true;
    try {
      if (this.editable.id) {
        // actualizar en Firestore
        await this.playersService.updatePlayer(this.editable);
      } else {
        // crear en Firestore
        const { id, ...data } = this.editable;
        const newId = await this.playersService.addPlayer(data as any);
        this.editable.id = newId;
      }

      // AQUÍ sincronizamos el objeto original que ve la lista
      if (this.player && this.editable) {
        Object.assign(this.player, this.editable);
      } else {
        this.player = this.editable;
      }

      this.editMode = false;
      alert('Jugador guardado correctamente.');
    } catch (err) {
      console.error('Error guardando jugador:', err);
      alert('Error guardando el jugador. Revisa la consola (F12).');
    } finally {
      this.saving = false;
    }
  }

  cancel() {
    this.editMode = false;
    if (this.player) {
      this.editable = { ...this.player };
    } else {
      this.editable = null;
    }
  }
}

