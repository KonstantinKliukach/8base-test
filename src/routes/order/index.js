import React from 'react';

import { withRouter } from 'react-router-dom';

import { Query } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';

import { Order } from './Order';

const OrderWrapper = props => {
  const {
    match: {
      params: { id },
    },
  } = props;

  return (
    <Query query={sharedGraphQL.ORDER_QUERY} variables={{ id }}>
      {({ data, loading }) => {
        if (loading) return 'Loading...';
        if (!data) return 'Order not found';
        return <Order order={data.order} />;
      }}
    </Query>
  );
};

const OrderWrapperWithRouter = withRouter(OrderWrapper);

export default OrderWrapperWithRouter;
