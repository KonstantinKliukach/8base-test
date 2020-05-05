import React from 'react';
import { compose } from 'recompose';
import * as R from 'ramda';
import { Table, Dropdown, Icon, Menu, withModal } from '@8base/boost';

import { Link } from 'react-router-dom';

import { graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';

import OrderDeleteDialog from './OrderDeleteDialog';
import OrderCreateDialog from './OrderCreateDialog';

let OrdersTable = ({ orders, openModal, closeModal }) => (
  <Table>
    <Table.Header columns="repeat(5, 1fr) 60px">
      <Table.HeaderCell>Client</Table.HeaderCell>
      <Table.HeaderCell>Adress</Table.HeaderCell>
      <Table.HeaderCell>DeliveryDT</Table.HeaderCell>
      <Table.HeaderCell>Comment</Table.HeaderCell>
      <Table.HeaderCell>Status</Table.HeaderCell>
      <Table.HeaderCell />
    </Table.Header>

    <Table.Body
      loading={orders.loading}
      data={R.pathOr([], ['ordersList', 'items'], orders)}
      action="Create Order"
      onActionClick={() => openModal(OrderCreateDialog.id)}
    >
      {order => (
        <Table.BodyRow columns="repeat(5, 1fr) 60px" key={order.id}>
          <Table.BodyCell>
            <Link to={`/clients/${order.client.id}`}>{`${order.client.firstName} ${order.client.lastName}`}</Link>
          </Table.BodyCell>
          <Table.BodyCell>{order.address}</Table.BodyCell>
          <Table.BodyCell>{order.deliveryDt}</Table.BodyCell>
          <Table.BodyCell>{order.comment}</Table.BodyCell>
          <Table.BodyCell>{order.status}</Table.BodyCell>
          <Table.BodyCell>
            <Dropdown defaultOpen={false}>
              <Dropdown.Head>
                <Icon name="More" color="LIGHT_GRAY2" />
              </Dropdown.Head>
              <Dropdown.Body pin="right">
                {({ closeDropdown }) => (
                  <Menu>
                    <Menu.Item
                      onClick={() => {
                        openModal(OrderDeleteDialog.id, { id: order.id });
                        closeDropdown();
                      }}
                    >
                      Delete
                    </Menu.Item>
                  </Menu>
                )}
              </Dropdown.Body>
            </Dropdown>
          </Table.BodyCell>
        </Table.BodyRow>
      )}
    </Table.Body>
  </Table>
);

OrdersTable = compose(withModal, graphql(sharedGraphQL.ORDERS_LIST_QUERY, { name: 'orders' }))(OrdersTable);

export default OrdersTable;
