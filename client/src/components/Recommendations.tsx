import { Recommendations as IRecommendations } from '@/types';
import { Description } from '@/utils/description';
import { Card, List } from 'antd';

interface Props {
  data: IRecommendations[];
  title: string;
}

export function Recommendations({ data, title }: Props) {
  return (
    <Card className="w-1/2" title={title}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={<div className='text-neutral-700 font-bold'>{item.name}</div>}
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
