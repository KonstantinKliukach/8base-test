import React from 'react';

import { Table } from '@8base/boost';

let ClientOrdersTable = ({ orders }) => (
  <Table>
    <Table.Header columns="repeat(4, 1fr) 60px">
      <Table.HeaderCell>Adress</Table.HeaderCell>
      <Table.HeaderCell>DeliveryDT</Table.HeaderCell>
      <Table.HeaderCell>Comment</Table.HeaderCell>
      <Table.HeaderCell>Status</Table.HeaderCell>
    </Table.Header>

    <Table.Body data={orders}>
      {order => (
        <Table.BodyRow columns="repeat(4, 1fr) 60px" key={order.id}>
          <Table.BodyCell>{order.address}</Table.BodyCell>
          <Table.BodyCell>{order.deliveryDt}</Table.BodyCell>
          <Table.BodyCell>{order.comment}</Table.BodyCell>
          <Table.BodyCell>{order.status}</Table.BodyCell>
        </Table.BodyRow>
      )}
    </Table.Body>
  </Table>
);

export default ClientOrdersTable;
