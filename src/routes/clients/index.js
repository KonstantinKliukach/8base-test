import React from 'react';
import { Card, Heading } from '@8base/boost';

import ClientDeleteDialog from './ClientDeleteDialog';
import ClientCreateDialog from './ClientCreateDialog';
import ClientsTable from './ClientsTable';

const Clients = () => (
  <Card padding="md" stretch>
    <Card.Header>
      <Heading type="h4" text="Clients" />
    </Card.Header>
    <ClientDeleteDialog />
    <ClientCreateDialog />
    <Card.Body padding="none" stretch scrollable>
      <ClientsTable />
    </Card.Body>
  </Card>
);

export default Clients;
