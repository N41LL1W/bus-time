import { NextResponse } from 'next/server';
import { processarUrls } from './processarUrls'; // Ajuste o caminho conforme necessário

// Exporta a função POST para processar a raspagem e inserção no banco de dados
export async function POST() {
  try {
    await processarUrls(); // Chama a função de raspagem
    return NextResponse.json({ message: 'Raspagem e inserção realizadas com sucesso.' }, { status: 200 });
  } catch (error: unknown) {
    console.error(`Erro ao processar URLs: ${error}`);
    let errorMessage = 'Erro desconhecido';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: `Erro ao processar URLs: ${errorMessage}` }, { status: 500 });
  }
}
