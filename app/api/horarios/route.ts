import { NextRequest, NextResponse } from 'next/server';
import { processarUrls } from '../scrape/processarUrls';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// CREATE - Executa a raspagem e insere os dados no banco de dados
export async function POST(request: NextRequest) {
  try {
    // Processa as URLs para realizar a raspagem e inserção no banco de dados
    await processarUrls();

    return NextResponse.json({ success: true, message: 'Horários inseridos no banco de dados.' });
  } catch (error) {
    console.error('Erro ao criar horário:', error);
    return NextResponse.json({ error: 'Erro ao criar horário' }, { status: 500 });
  }
}

// READ - Recupera os horários do banco de dados
export async function GET() {
  try {
    const horarios = await prisma.horario.findMany();
    return NextResponse.json(horarios);
  } catch (error) {
    console.error('Erro ao buscar horários:', error);
    return NextResponse.json({ error: 'Erro ao buscar horários' }, { status: 500 });
  }
}
