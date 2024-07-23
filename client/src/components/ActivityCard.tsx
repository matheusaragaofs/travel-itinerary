import { ItineraryActivity, ItineraryDay } from '@/types';
import { Avatar, Card } from 'antd';

type ActivityCardProps = {
  data: ItineraryDay;
  type: 'morning' | 'afternoon' | 'night';
};

export const ActivityCard = ({ data, type }: ActivityCardProps) => {
  const currentData = data[type] as ItineraryActivity;

  return (
    <Card loading={false} className="w-full">
      <Card.Meta
        avatar={<Avatar src={`${type}.svg`} />}
        title={currentData.activity}
        description={
          <>
            <div className="flex gap-1 ">
              <div className="font-bold">Horario:</div>
              <div>{currentData.time}</div>
            </div>

            <div className="flex gap-1">
              <div className="font-bold">Custo médio:</div>
              <div>{currentData.average_cost}</div>
            </div>
            <div className="flex gap-1">
              <div className="font-bold">Endereço:</div>
              <div className="text-end">{currentData.address}</div>
            </div>
          </>
        }
      />
    </Card>
  );
};
