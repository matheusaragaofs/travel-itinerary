import { ItineraryActivity, ItineraryDay } from '@/types';
import { Description } from '@/utils/description';
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
            <Description label="Horário" value={currentData.time} />
            <Description label="Custo médio" value={currentData.average_cost} />
            <Description label="Endereço" value={currentData.address} />
          </>
        }
      />
    </Card>
  );
};
