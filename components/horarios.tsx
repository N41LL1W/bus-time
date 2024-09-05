"use client";

import { useEffect, useState } from "react";
import HorarioTable from "@/components/horario_table"; // Certifique-se de que a importação está correta

interface Horario {
  id: number;
  itinerario: string;
  diaDaSemana: string;
  horario: string; // ou Date, dependendo de como você está armazenando
  trajeto: string;
}

const Horarios = () => {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHorarios = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/horarios"); // Certifique-se de que o endpoint está correto
      const data = await response.json();
      if (response.ok) {
        setHorarios(data);
      } else {
        setError("Erro ao carregar horários");
      }
    } catch (error) {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleScrape = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
      });
      const data = await response.json();
      if (response.ok) {
        // Atualiza a lista de horários após a raspagem
        fetchHorarios();
      } else {
        setError("Erro ao realizar a raspagem: " + data.error);
      }
    } catch (error) {
      setError("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHorarios();
  }, []);

  return (
    <div>
      <h1>Horários</h1>
      <button onClick={handleScrape} disabled={loading}>
        {loading ? "Processando..." : "Iniciar Raspagem"}
      </button>
      {error && <p>{error}</p>}
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <HorarioTable horarios={horarios} />
      )}
    </div>
  );
};

export default Horarios;
