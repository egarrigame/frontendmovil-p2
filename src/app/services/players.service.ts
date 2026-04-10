import { Injectable } from '@angular/core';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase';

export interface Player {
  id?: string;         // id de Firestore
  nombre: string;
  apellidos: string;
  posicion: string;
  edad: number;
  altura: number;
  photoUrl: string;
  videoUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  constructor() {}

  // Leer todos los jugadores
  async getPlayers(): Promise<Player[]> {
    const colRef = collection(db, 'players');
    const snapshot = await getDocs(colRef);

    const players: Player[] = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Player, 'id'>),
    }));

    console.log('Jugadores desde Firestore:', players);
    return players;
  }

  // Crear jugador nuevo
  async addPlayer(player: Omit<Player, 'id'>): Promise<string> {
    const colRef = collection(db, 'players');
    const docRef = await addDoc(colRef, player);
    console.log('Jugador creado con id:', docRef.id);
    return docRef.id;
  }

  // Actualizar jugador existente
  async updatePlayer(player: Player): Promise<void> {
    if (!player.id) {
      throw new Error('No se puede actualizar un jugador sin id');
    }
    const docRef = doc(db, 'players', player.id);
    const { id, ...data } = player; // Firestore no quiere el id dentro de los datos
    await updateDoc(docRef, data as any);
    console.log('Jugador actualizado:', player.id);
  }

  // Borrar jugador
  async deletePlayer(id: string): Promise<void> {
    const docRef = doc(db, 'players', id);
    await deleteDoc(docRef);
    console.log('Jugador eliminado:', id);
  }
}

