import { ItineraryResponse } from '@/types';
import { Description } from '@/utils/description';
import { Card, Tag } from 'antd';

interface Props {
  destination?: string;
  travelPeriod?: string;
  localCurrency: string;
  localCurrencySymbol: string;
  travelStyles?: string;
  setItineraryInfo: (itineraryInfo: any) => void;
}

const colors = ['purple', 'magenta', 'blue'];

export function Header({
  destination,
  travelPeriod,
  localCurrency,
  localCurrencySymbol,
  travelStyles,
  setItineraryInfo,
}: Props) {
  return (
    <Card className="flex relative">
      <div
        onClick={() => setItineraryInfo(null)}
        className="absolute top-5 right-5 cursor-pointer hover:bg-blue-800 transition bg-[#001b43] px-3 py-1 rounded-2xl  text-white"
      >
        Criar novo roteiro
      </div>
      <Description
        label="Destino"
        value={`${destination}`}
        labelFontsize="1.3rem"
        valueFontsize="1.3rem"
      />
      <Description
        label="Período da viagem"
        labelFontsize="1rem"
        valueFontsize="1rem"
        value={travelPeriod}
      />
      <Description
        label="Moeda local"
        labelFontsize="1rem"
        valueFontsize="1rem"
        value={
          <Tag color="green">
            {localCurrency} | {localCurrencySymbol}
          </Tag>
        }
      />
      <Description
        label="Estilos de viagem preferidos"
        labelFontsize="1rem"
        valueFontsize="1rem"
        value={travelStyles?.split(',').map((style, index) => (
          <Tag color={colors[index]} key={index}>
            {style}
          </Tag>
        ))}
      />
    </Card>
  );
}
