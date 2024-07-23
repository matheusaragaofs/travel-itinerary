import { RecommendedAccommodation, RecommendedRestaurant } from '@/types';
import { Avatar, Card, List } from 'antd';

interface Props {
  data: RecommendedRestaurant[];
}

export function Restaurants({ data }: Props) {
  return (
    <Card className='w-1/2' title="Restaurantes">
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.address}
            />
            <div className="flex gap-1">
              <div>{item.type} | </div>
              <div>{item.average_cost}</div>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
}
