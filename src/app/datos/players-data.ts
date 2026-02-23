// mock data para primer producto

import { Player } from '../models/player'; // importamos el modelo

export const PLAYERS: Player[] = [ 
  {
    id: 1,
    nombre: 'Eduard',
    apellidos: 'Garriga',
    posicion: 'Base',
    edad: 28,
    altura: 1.98,
    video: 'assets/videos/video1.mp4',
    imagen: 'assets/images/Eduard.jpg'
  },
  {
    id: 1,
    nombre: 'Andres',
    apellidos: 'Restrepo',
    posicion: 'Escolta',
    edad: 21,
    altura: 1.94,
    video: 'assets/videos/video2.mp4',
    imagen: 'assets/images/Andres.jpg'
  },
  {
    id: 1,
    nombre: 'Juan',
    apellidos: 'Roig',
    posicion: 'Escolta',
    edad: 19,
    altura: 2.00,
    video: 'assets/videos/video3.mp4',
    imagen: 'assets/images/Juan.jpg'
  },
  {
    id: 1,
    nombre: 'David',
    apellidos: 'Casero',
    posicion: 'Pivot',
    edad: 26,
    altura: 2.10,
    video: 'assets/videos/video4.mp4',
    imagen: 'assets/images/David.jpg'
  },
  {
    id: 1,
    nombre: 'Jose',
    apellidos: 'Ramirez',
    posicion: 'Pivot',
    edad: 27,
    altura: 2.16,
    video: 'assets/videos/video5.mp4',
    imagen: 'assets/images/Jose.jpg'
  }
];