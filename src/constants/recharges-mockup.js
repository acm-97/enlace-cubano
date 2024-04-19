import {randomUUID} from 'expo-crypto'

export const movilRecharges = [
  {
    id: randomUUID(),
    description: 'Recarga de $100 para llamadas ilimitadas',
    price: 10,
    isFavorite: true,
    date: new Date('2024-04-11'),
    status: "Completado"
  },
  {
    id: randomUUID(),
    description: 'Recarga de $50 con bono de datos',
    price: 50,
    isFavorite: false,
    date: new Date('2024-04-10'),
    status: "Pendiente"
  },
  {
    id: randomUUID(),
    description: 'Recarga de $200 con mensajes de texto gratis',
    price: 20,
    isFavorite: false,
    date: new Date('2024-04-09'),
    status: "Pendiente"
  },
  {
    id: randomUUID(),
    description: 'Recarga de $150 con bono de minutos',
    price: 15,
    isFavorite: false,
    date: new Date('2024-04-08'),
    status: "Completado"
  },
  {
    id: randomUUID(),
    description: 'Recarga de $300 con megas adicionales',
    price: 30,
    isFavorite: false,
    date: new Date('2024-04-07'),
    status: "Completado"
  },
  {
    id: randomUUID(),
    description: 'Recarga de $75 con bono de mensajes',
    price: 75,
    isFavorite: false,
    date: new Date('2024-04-06'),
    status: "Completado"
  },
  {
    id: randomUUID(),
    description: 'Recarga de $250 con llamadas internacionales',
    price: 25,
    isFavorite: false,
    date: new Date('2024-04-05'),
    status: "Completado"
  },
  {
    id: randomUUID(),
    description: 'Recarga de $120 con bono de redes sociales',
    price: 12,
    isFavorite: false,
    date: new Date('2024-04-04'),
    status: "Pendiente"
  },
  {
    id: randomUUID(),
    description: 'Recarga de $180 con bono de minutos y mensajes',
    price: 18,
    isFavorite: false,
    date: new Date('2024-04-03'),
    status: "Completado"
  },
  {
    id: randomUUID(),
    description: 'Recarga de $350 con beneficios premium',
    price: 35,
    isFavorite: false,
    date: new Date('2024-04-02'),
    status: "Completado"
  },
]
