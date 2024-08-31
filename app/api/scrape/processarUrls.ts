import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Função para processar URLs e atualizar o banco de dados
export async function processarUrls() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // URLs para raspagem
    const urls = [
      'https://www.ribetransporte.com.br/ribeirao-preto-a-jardinopolis/',
    ];
    
    for (const url of urls) {
      await page.goto(url, { waitUntil: 'networkidle2' });
      const content = await page.content();
      
      // Usar cheerio para manipular o HTML
      const $ = cheerio.load(content);
      
      // Adapte o seletor conforme necessário
      const diasSemana = [
        { dia: 'Segunda à Sexta', titulo: 'Horários de Segunda à Sexta' },
        { dia: 'Sábado', titulo: 'Horários de Sábado' },
        { dia: 'Domingo', titulo: 'Horários de Domingo e Feriados' }
      ];
      
      const horariosTotais: { horario: string, itinerario: string, diaDaSemana: string, trajeto: string }[] = [];
      
      for (const { dia, titulo } of diasSemana) {
        // Localiza o título e o conteúdo subsequente
        const section = $(`h2:contains(${titulo})`).nextUntil('h2', 'p').text();
        
        console.log(`HTML para '${titulo}':`, section); // Log do texto extraído
        
        if (section) {
          const linhas = section.split('\n').filter(linha => linha.trim() !== '');
          
          linhas.forEach(linha => {
            const [horario, ...resto] = linha.split(/\s(.+)/);
            const trajeto = resto.join(' ').trim();
            
            if (horario && trajeto) {
              horariosTotais.push({
                horario: horario.trim(),
                itinerario: 'RIBEIRÃO PRETO A JARDINÓPOLIS',
                diaDaSemana: dia,
                trajeto
              });
            }
          });
        }
      }
      
      if (horariosTotais.length === 0) {
        console.warn('Nenhum horário encontrado');
      } else {
        // Deleta os registros antigos e insere os novos
        await prisma.horario.deleteMany({});
        await prisma.horario.createMany({
          data: horariosTotais,
        });
        console.log('Horários inseridos no banco de dados com sucesso.');
      }
    }
    
    await browser.close();
  } catch (error: unknown) {
    console.error(`Erro na raspagem: ${error}`);
    throw error;
  }
}
