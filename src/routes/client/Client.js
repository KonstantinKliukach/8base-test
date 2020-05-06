import React from 'react';
import { Card, Heading, Paragraph } from '@8base/boost';

import OrderDeleteDialog from './ClientOrderDeleteDialog';
import OrdersTable from './ClientOrdersTable';

let Client = ({ client }) => {
  return (
    <Card padding="md" stretch>
      <Card.Header>
        <Heading type="h4" text={`${client.firstName} ${client.lastName}`} />
      </Card.Header>
      <OrderDeleteDialog />
      <Card.Body>
        <Paragraph text={`Email: ${client.email}`} />
        <Paragraph text={`Phone: ${client.phone}`} />
        <Paragraph text={`Birthday: ${client.birthday}`} />
      </Card.Body>
      <Card.Body padding="none" stretch scrollable>
        <OrdersTable orders={client.orders.items} />
      </Card.Body>
    </Card>
  );
};

export { Client };
