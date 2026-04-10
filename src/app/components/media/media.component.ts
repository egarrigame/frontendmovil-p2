import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../services/players.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media.component.html',
  styleUrl: './media.component.scss',
})
export class MediaComponent implements OnChanges {
  @Input() player: Player | null = null;

  videoId: string | null = null;
  thumbnailUrl: string | null = null;
  safeEmbedUrl: SafeResourceUrl | null = null;

  isPlaying = false;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.isPlaying = false;
    this.videoId = null;
    this.thumbnailUrl = null;
    this.safeEmbedUrl = null;

    if (!this.player?.videoUrl) {
      return;
    }

    const id = this.extractYoutubeId(this.player.videoUrl);
    if (!id) {
      console.warn('No se pudo extraer ID de YouTube de', this.player.videoUrl);
      return;
    }

    this.videoId = id;
    this.thumbnailUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    const embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1`;
    this.safeEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  startVideo() {
    if (this.safeEmbedUrl) {
      this.isPlaying = true;
    }
  }

  /** Extrae el ID de YouTube de varias formas comunes */
  private extractYoutubeId(url: string): string | null {
    try {
      const u = new URL(url);

      // https://youtu.be/ID
      if (u.hostname.includes('youtu.be')) {
        return u.pathname.slice(1);
      }

      // https://www.youtube.com/watch?v=ID
      const v = u.searchParams.get('v');
      if (v) return v;

      // https://www.youtube.com/embed/ID
      const embedMatch = u.pathname.match(/\/embed\/([^/]+)/);
      if (embedMatch && embedMatch[1]) return embedMatch[1];
    } catch {
      // si no es URL válida, intentamos extraer un ID por regex
      const reg = /([a-zA-Z0-9_-]{11})/;
      const match = url.match(reg);
      if (match) return match[1];
    }

    return null;
  }
}

