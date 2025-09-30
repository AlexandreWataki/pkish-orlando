import React, { useEffect, useState } from 'react';
import DiaCard from './DiaCard';
import CatalogoDias from '../catalogo/CatalogoDias';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type Dia = {
  numero: number;
  tipo: string;
  data?: string;
  [key: string]: any; // permite extensões como parque_nome, aeroporto, etc.
};

const ListaBlocos = () => {
  const [dias, setDias] = useState<Dia[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [filtroDia, setFiltroDia] = useState<number | null>(null);

  useEffect(() => {
    async function carregarDias() {
      const arquivos: Promise<Dia | null>[] = [];

      for (let d = 13; d <= 24; d++) {
        arquivos.push(
          fetch(`/data/dia${d}.json`)
            .then((r) => (r.ok ? r.json() : null))
            .catch(() => null)
        );
      }

      const resultados = await Promise.all(arquivos);

      setDias(
        resultados
          .filter(Boolean)
          .map((dia, idx) => ({
            ...dia!,
            numero: dia?.numero ?? 13 + idx,
          }))
      );

      setLoading(false);
    }

    const verificarTamanhoTela = () => {
      setIsMobile(window.innerWidth < 768);
    };

    carregarDias();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', verificarTamanhoTela);
      return () => window.removeEventListener('resize', verificarTamanhoTela);
    }
  }, []);

  if (loading) {
    return <div className="p-4 text-lg font-semibold">Carregando dados...</div>;
  }

  const diasFiltrados = filtroDia
    ? dias.filter((d) => d.numero === filtroDia)
    : dias;

  return (
    <div className="relative z-10 px-3">
      {/* Catálogo de navegação por dia */}
      <div className="mb-4">
        <CatalogoDias onEscolher={setFiltroDia} />
      </div>

      {/* Lista de cartões dos dias */}
      {isMobile ? (
        <Swiper spaceBetween={20} slidesPerView={1}>
          {diasFiltrados.map((dia) => (
            <SwiperSlide key={dia.numero}>
              <div className="p-3">
                <DiaCard bloco={dia} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="grid p-3 justify-content-center md:justify-start md:grid-cols-3 gap-4">
          {diasFiltrados.map((dia) => (
            <div key={dia.numero}>
              <DiaCard bloco={dia} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaBlocos;
