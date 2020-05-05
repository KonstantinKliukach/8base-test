import React from 'react';
import { Card, Heading } from '@8base/boost';
import { compose } from 'recompose';

import { graphql } from 'react-apollo';

import { useParams } from 'react-router-dom';

import { CLIENT_QUERY } from 'shared/graphql';

const ClientWrapper = () => {
  const { id } = useParams();

  return <Client />;
};

const Client = client => (
  <Card padding="md" stretch>
    <Card.Header>
      <Heading type="h4" text={client.firstName} />
    </Card.Header>
    <Card.Body padding="none" stretch scrollable />
  </Card>
);

export default ClientWrapper;
