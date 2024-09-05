import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Horario } from "@prisma/client"; // ou "@/types", dependendo de onde você definiu o tipo

interface HorarioItemProps {
  horarios: Horario[];
}

const HorarioTable = ({ horarios }: HorarioItemProps) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Itinerário</TableCell>
        <TableCell>Dia da Semana</TableCell>
        <TableCell>Horário</TableCell>
        <TableCell>Trajeto</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {horarios.map((horario) => (
        <TableRow key={horario.id}>
          <TableCell>{horario.itinerario}</TableCell>
          <TableCell>{horario.diaDaSemana}</TableCell>
          <TableCell>{horario.horario}</TableCell>
          <TableCell>{horario.trajeto}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default HorarioTable;
