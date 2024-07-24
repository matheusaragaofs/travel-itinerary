'use client';

import React, { useState } from 'react';
import {
  Col,
  DatePicker,
  DatePickerProps,
  FormProps,
  InputNumber,
  InputNumberProps,
  Row,
  Select,
  Slider,
  Space,
  Tooltip,
} from 'antd';
import { Button, Form, Input } from 'antd';
import '../app/css/form.css';

type FieldType = {
  travel_period: string;
  budget: string;
  destination: string;
  preffered_travel_styles: string;
};

const travelStyleOptions = {
  'Aventura/Ao ar livre':
    'Para aqueles interessados em caminhadas, acampamentos, esportes aquáticos e outras atividades aventureiras.',
  'Cultural/Histórico':
    'Foco em museus, sítios históricos e experiências culturais.',
  Luxo: 'Hotéis de alto padrão, gastronomia refinada e experiências exclusivas.',
  Econômico:
    'Acomodações acessíveis, atividades econômicas e opções de refeições econômicas.',
  Familiar:
    'Atividades adequadas para todas as idades, acomodações adequadas para crianças e atrações.',
  Romântico:
    'Escapadas românticas, atividades para casais, experiências especiais para dois.',
  'Bem-estar/Relaxamento':
    'Retiro de spa, atividades de bem-estar, sessões de ioga e locais serenos.',
  'Comida e Bebida':
    'Tours culinários, degustações de vinhos, experiências de culinária local.',
  Compras: 'Foco em distritos de compras, mercados e lojas locais únicas.',
  'Vida Noturna': 'Clubes, bares, música ao vivo e outras atividades noturnas.',
  'Natureza e Vida Selvagem':
    'Parques nacionais, safáris de vida selvagem, jardins botânicos.',
  'Festival/Eventos':
    'Participação em festivais locais, concertos, eventos esportivos ou outros grandes eventos.',
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const ItineraryForm: React.FC = () => {
  const [sliderInputValue, setSliderInputValue] = useState(1);

  const onChangeSlider: InputNumberProps['onChange'] = (newValue) => {
    setSliderInputValue(newValue as number);
  };

  const handleChangePrefferedTravelStyle = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="form-container">
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Destino"
          name="destination"
          rules={[{ required: true, message: 'Please input your username!' }]}
          className="form-item"
        >
          <Input placeholder="Rio de Janeiro,RJ..." className="custom-input" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Período da viagem"
          name="travel_period"
          rules={[{ required: true, message: 'Please input your password!' }]}
          className="form-item"
        >
          <DatePicker placeholder="Selecione a data..."onChange={onChangeDate} picker="week" className="custom-input" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Estilos de viagem preferidos"
          name="preffered_travel_styles"
          rules={[{ required: true, message: 'Please input your password!' }]}
          className="form-item"
        >
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            maxCount={3}
            placeholder="Escolha seu tipo de viagem..."
            onChange={handleChangePrefferedTravelStyle}
            options={Object.entries(travelStyleOptions).map(([label, value]) => ({
              label,
              value,
            }))}
            optionRender={(option) => (
              <Tooltip placement="top" title={option.data.value}>
                <Space>{option.label}</Space>
              </Tooltip>
            )}
            className="custom-input-dropdown"
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Orçamento"
          name="budget"
          rules={[
            { required: true, message: 'Por favor selecione seu orçamento!' },
          ]}
          className="form-item"
        >
          <Row>
            <Col span={24}>
              <Slider
                min={1}
                max={50}
                onChange={onChangeSlider}
                value={
                  typeof sliderInputValue === 'number' ? sliderInputValue : 0
                }
                tooltip={{ open: true, formatter: (value) => `R$${value * 20},00` }} 
                className="custom-slider"
              />
            </Col>
          </Row>
        </Form.Item>

        <Form.Item className="form-item centered-button" wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Descubra o seu plano
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ItineraryForm;

