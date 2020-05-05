import React from 'react';
import { Card, Heading } from '@8base/boost';

import OrderDeleteDialog from './OrderDeleteDialog';
import OrderCreateDialog from './OrderCreateDialog';
import OrdersTable from './OrdersTable';

const Orders = () => (
  <Card padding="md" stretch>
    <Card.Header>
      <Heading type="h4" text="Orders" />
    </Card.Header>
    <OrderDeleteDialog />
    <OrderCreateDialog />
    <Card.Body padding="none" stretch scrollable>
      <OrdersTable />
    </Card.Body>
  </Card>
);

export default Orders;
