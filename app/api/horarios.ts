import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const horarios = await prisma.horario.findMany(); // Ajuste o nome do modelo conforme necessário
      res.status(200).json(horarios);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar horários' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
