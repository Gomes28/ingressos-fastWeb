import { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";

export function Clock({ expiredAt }) {
  // Convertendo a string de data para um objeto de data JavaScript
  const [day, month, year, hours, minutes, seconds] = expiredAt.split(/[\s/:]/);
  const expirationDate = new Date(+`20${year}`, month - 1, day, hours, minutes, seconds);

  // Calculando a diferença entre as datas para obter o tempo restante
  const currentDate = new Date();
  const timeDifference = expirationDate.getTime() - currentDate.getTime();
  const initialMinutes = Math.floor(timeDifference / (1000 * 60));
  const initialSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  const [tempoRestante, setTempoRestante] = useState({
    minutos: initialMinutes,
    segundos: initialSeconds,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (tempoRestante.minutos === 0 && tempoRestante.segundos === 0) {
        clearInterval(interval);
        alert('Contador atingiu zero!');
      } else {
        setTempoRestante((prevState) => {
          if (prevState.segundos === 0) {
            return {
              minutos: prevState.minutos - 1,
              segundos: 59,
            };
          } else {
            return {
              ...prevState,
              segundos: prevState.segundos - 1,
            };
          }
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [tempoRestante]);

  return (
    <div className="flex items-center justify-between bg-gray-100 px-3 rounded-md gap-4 h-16 mt-6">
      <div className="flex gap-4 items-center">
        <FiClock size={24} className="text-primary" />
        <span className="w-20 text-lg font-semibold">
          {tempoRestante.minutos < 10 ? '0' : ''}{tempoRestante.minutos}:
          {tempoRestante.segundos < 10 ? '0' : ''}{tempoRestante.segundos}
        </span>
      </div>
      <div className="flex-1 flex justify-end">
        <p className="text-xs">
          Após este tempo, os ingressos serão liberados para venda novamente.
        </p>
      </div>
    </div>
  );
}
