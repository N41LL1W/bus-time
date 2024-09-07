import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Horario } from "@prisma/client"; // ou "@/types", dependendo de onde você definiu o tipo

interface HorarioItemProps {
  horarios: Horario[];
}

const HorarioTable = ({ horarios }: HorarioItemProps) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell className="text-left">Itinerário</TableCell> {/* Alinhado à esquerda */}
        <TableCell className="text-right">Dia da Semana</TableCell> {/* Alinhado à direita */}
        <TableCell className="text-right">Horário</TableCell> {/* Alinhado à direita */}
        <TableCell className="text-right">Trajeto</TableCell> {/* Alinhado à direita */}
      </TableRow>
    </TableHead>
    <TableBody>
      {horarios.map((horario) => (
        <TableRow key={horario.id}>
          <TableCell className="text-left">{horario.itinerario}</TableCell>
          <TableCell className="text-right">{horario.diaDaSemana}</TableCell>
          <TableCell className="text-right">{horario.horario}</TableCell>
          <TableCell className="text-right">{horario.trajeto}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default HorarioTable;
