import {
  ExtraActivitiesBasedOnPrefferedTravelStyle,
  ItineraryActivity,
  ItineraryDay,
} from '@/types';
import { Description } from '@/utils/description';
import { Avatar, Card, Flex } from 'antd';
import { LatLngExpression } from 'leaflet';

type ActivityCardProps = {
  data: ExtraActivitiesBasedOnPrefferedTravelStyle[];
  map: L.Map | null;
};

export const ExtraActivities = ({ data, map }: ActivityCardProps) => {
  const handleOnClick = (latLong: LatLngExpression) => {
    map?.flyTo(latLong, 18);
  };
  return (
    <Card title="Atividades extras baseadas na sua preferência">
      <Flex
        gap="middle"
        align="start"
        vertical
        style={{
          width: '100%',
        }}
      >
        {data.map((activity, index) => {
          return (
            <Card
              loading={false}
              onClick={() =>
                handleOnClick({
                  lat: Number(activity.latitude),
                  lng: Number(activity.longitude),
                })
              }
              className="w-full hover:bg-slate-200 transition-all duration-75 cursor-pointer"
            >
              <Card.Meta
                //   avatar={<Avatar src={`${type}.svg`} />}
                title={activity.activity}
                description={
                  <>
                    <Description label="Horário" value={activity.time} />
                    <Description
                      label="Custo médio"
                      value={activity.average_cost}
                    />
                    <Description label="Endereço" value={activity.address} />
                  </>
                }
              />
            </Card>
          );
        })}
      </Flex>
    </Card>
  );
};
