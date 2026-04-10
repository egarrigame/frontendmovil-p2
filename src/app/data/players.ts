export interface Player {
  id: number;
  nombre: string;
  apellidos: string;
  posicion: string;
  edad: number;
  altura: number;      // en cm
  videoUrl: string;
  photoUrl: string;    
}



export const PLAYERS: Player[] = [
  {
    id: 1,
    nombre: 'Juan',
    apellidos: 'Pérez',
    posicion: 'Base',
    edad: 25,
    altura: 183,
    videoUrl: 'https://www.youtube.com/embed/T4R9Jc96rtQ?si=HPbuvXDTVJcPdfpC',
    photoUrl: 'https://images.pexels.com/photos/974501/pexels-photo-974501.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    nombre: 'Carlos',
    apellidos: 'López',
    posicion: 'Escolta',
    edad: 27,
    altura: 189,
    videoUrl: 'https://www.youtube.com/embed/iYtbvKqImlA?si=N7H7HY369fk5TXbT',
    photoUrl: 'https://images.pexels.com/photos/974501/pexels-photo-974501.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    nombre: 'Miguel',
    apellidos: 'García',
    posicion: 'Alero',
    edad: 24,
    altura: 195,
    videoUrl: 'https://www.youtube.com/embed/nLMq9DLvDxc?si=cnjcLmiKNS0sm2Ip',
    photoUrl: 'https://images.pexels.com/photos/974501/pexels-photo-974501.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 4,
    nombre: 'Diego',
    apellidos: 'Rodríguez',
    posicion: 'Ala-Pívot',
    edad: 29,
    altura: 201,
    videoUrl: 'https://www.youtube.com/embed/CXLM08fZO5o?si=2eWPylRzkXtcCy91',
    photoUrl: 'https://images.pexels.com/photos/974501/pexels-photo-974501.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 5,
    nombre: 'Sergio',
    apellidos: 'Martínez',
    posicion: 'Pívot',
    edad: 30,
    altura: 208,
    videoUrl: 'https://www.youtube.com/embed/P8RIY4hiO2M?si=zNHMQ99qNLzEYF1B',
    photoUrl: 'https://images.pexels.com/photos/974501/pexels-photo-974501.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 6,
    nombre: 'Michael',
    apellidos: 'Jordan',
    posicion: 'Pívot',
    edad: 45,
    altura: 210,
    videoUrl: 'https://www.youtube.com/embed/P8RIY4hiO2M?si=zNHMQ99qNLzEYF1B',
    photoUrl: 'https://images.pexels.com/photos/974501/pexels-photo-974501.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

