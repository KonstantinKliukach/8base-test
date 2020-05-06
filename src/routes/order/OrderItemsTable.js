import React from 'react';

import { Table } from '@8base/boost';

const OrderItemsTable = ({ items }) => (
  <Table>
    <Table.Header columns="repeat(2, 1fr) 60px">
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Quantity</Table.HeaderCell>
    </Table.Header>

    <Table.Body data={items}>
      {item => (
        <Table.BodyRow columns="repeat(2, 1fr) 60px" key={item.id}>
          <Table.BodyCell>{item.product.name}</Table.BodyCell>
          <Table.BodyCell>{item.quantity}</Table.BodyCell>
        </Table.BodyRow>
      )}
    </Table.Body>
  </Table>
);

export default OrderItemsTable;
