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
        <Paragraph text={`Email: ${order.email}`} />
        <Paragraph text={`Phone: ${order.phone}`} />
        <Paragraph text={`Birthday: ${order.birthday}`} />
      </Card.Body>
      <Card.Body padding="none" stretch scrollable>
        <OrdersTable orders={order.orders.items} />
      </Card.Body>
    </Card>
  );
};

export { Order };
