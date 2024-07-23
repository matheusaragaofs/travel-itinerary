import { Recommendations as IRecommendations } from '@/types';
import { Description } from '@/utils/description';
import { Card, List } from 'antd';
import { LatLngExpression } from 'leaflet';

interface Props {
  data: IRecommendations[];
  title: string;
  map: L.Map | null;
}

export function Recommendations({ data, title, map }: Props) {
  const handleOnClick = (latLong: LatLngExpression) => {
    map?.flyTo(latLong, 18);
  };

  return (
    <Card className="w-1/2 " title={title}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
            className=" hover:bg-slate-200 transition-all duration-75 cursor-pointer rounded-lg "
            onClick={() =>
              handleOnClick({
                lat: Number(item.latitude),
                lng: Number(item.longitude),
              })
            }
          >
            <List.Item.Meta
              className="px-3 "
              title={
                <div className="text-neutral-700 font-bold">{item.name}</div>
              }
              description={
                <div>
                  <Description label="Tipo" value={item.type} />
                  <Description label="Custo médio" value={item.average_cost} />
                  <Description
                    textAlign="right"
                    label="Endereço"
                    value={item.address}
                  />
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
}
