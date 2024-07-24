import { ItineraryActivity, ItineraryDay } from '@/types';
import { Description } from '@/utils/description';
import { Avatar, Card } from 'antd';
import { LatLngExpression } from 'leaflet';

type ActivityCardProps = {
  data: ItineraryDay;
  type: 'morning' | 'afternoon' | 'night';
  onClick: (latLong: LatLngExpression) => void;
};

export const ActivityCard = ({ data, type, onClick }: ActivityCardProps) => {
  const currentData = data[type] as ItineraryActivity;

  return (
    <Card
      loading={false}
      onClick={() =>
        onClick({
          lat: Number(currentData.latitude),
          lng: Number(currentData.longitude),
        })
      }
      className="w-full hover:bg-slate-200 transition-all duration-75 cursor-pointer"
    >
      <Card.Meta
        avatar={<Avatar src={`${type}.svg`} />}
        title={currentData.activity}
        description={
          <>
            <p className='my-2'>{currentData.description}</p>
            <Description label="Horário" value={currentData.time} />
            <Description label="Custo médio" value={currentData.average_cost} />
            <Description label="Endereço" value={currentData.address} />
          </>
        }
      />
    </Card>
  );
};
