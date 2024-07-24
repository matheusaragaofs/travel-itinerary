import { ItineraryResponse } from '@/types';
import { Description } from '@/utils/description';
import { Card, Tag } from 'antd';

interface Props {
  destination: string;
  travelPeriod: string;
  localCurrency: string;
  localCurrencySymbol: string;
  travelStyles: string;
}

const colors = ['purple', 'magenta', 'blue'];

export function Header({
  destination,
  travelPeriod,
  localCurrency,
  localCurrencySymbol,
  travelStyles,
}: Props) {
  return (
    <Card className="flex">
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
        value={travelStyles.split(',').map((style, index) => (
          <Tag color={colors[index]} key={index}>
            {style}
          </Tag>
        ))}
      />
    </Card>
  );
}
