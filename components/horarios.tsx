import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Horario } from "@prisma/client"; // ou "@/types", dependendo de onde você definiu o tipo

interface HorarioItemProps {
  horarios: Horario[];
}

const HorarioTable = ({ horarios }: HorarioItemProps) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Itinerario</TableCell>
        <TableCell>Dia da Semana</TableCell>
        <TableCell>Horários</TableCell>
        <TableCell>Trajeto</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {horarios.map((horario) => (
        <TableRow key={horario.id}>
          <TableCell>{horario.itinerario}</TableCell>
          <TableCell>{horario.diaDaSemana}</TableCell>
          <TableCell>{new Date(horario.horario).toLocaleTimeString()}</TableCell>
          <TableCell>{horario.trajeto}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default HorarioTable;
