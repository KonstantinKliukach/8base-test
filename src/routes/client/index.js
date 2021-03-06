import React from 'react';

import { withRouter } from 'react-router-dom';

import { Query } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';

import { Client } from './Client';

const ClientWrapper = props => {
  const {
    match: {
      params: { id },
    },
  } = props;

  return (
    <Query query={sharedGraphQL.CLIENT_QUERY} variables={{ id }}>
      {({ data, loading }) => {
        if (loading) return 'Loading...';
        if (!data) return 'Client not found';
        return <Client client={data.client} />;
      }}
    </Query>
  );
};

const ClientWrapperWithRouter = withRouter(ClientWrapper);

export default ClientWrapperWithRouter;
