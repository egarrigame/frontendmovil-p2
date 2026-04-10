import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from './services/players.service';
import { PlayersComponent } from './components/players/players';
import { DetailComponent } from './components/detail/detail.component';
import { MediaComponent } from './components/media/media.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PlayersComponent, DetailComponent, MediaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  currentPage: 'home' | 'players' = 'home';
  selectedPlayer: Player | null = null;

  goTo(page: 'home' | 'players') {
    this.currentPage = page;
  }

  onPlayerSelected(player: Player) {
    this.selectedPlayer = player;
  }
}

