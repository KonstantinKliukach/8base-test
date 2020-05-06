import React from 'react';
import { Card, Heading, Paragraph } from '@8base/boost';
import OrdersTable from './OrderItemsTable';

let Order = ({ order }) => {
  return (
    <Card padding="md" stretch>
      <Card.Header>
        <Heading type="h4" text={`Order №${order.id}`} />
      </Card.Header>
      <Card.Body>
        <Paragraph text={`Client: ${`${order.client.firstName} ${order.client.lastName}`}`} />
        <Paragraph text={`Address: ${order.address}`} />
        <Paragraph text={`Comment: ${order.comment}`} />
        <Paragraph text={`Delivery at: ${new Date(order.deliveryDt).toDateString()}`} />
      </Card.Body>
      <Card.Body padding="none" stretch scrollable>
        <OrdersTable items={order.orderItems.items} />
      </Card.Body>
    </Card>
  );
};

export { Order };
