import React from 'react';
import { compose } from 'recompose';

import { Table, Dropdown, Icon, Menu, withModal } from '@8base/boost';

import OrderDeleteDialog from './ClientOrderDeleteDialog';

let ClientOrdersTable = ({ orders, openModal, closeModal }) => (
  <Table>
    <Table.Header columns="repeat(4, 1fr) 60px">
      <Table.HeaderCell>Adress</Table.HeaderCell>
      <Table.HeaderCell>DeliveryDT</Table.HeaderCell>
      <Table.HeaderCell>Comment</Table.HeaderCell>
      <Table.HeaderCell>Status</Table.HeaderCell>
      <Table.HeaderCell />
    </Table.Header>

    <Table.Body data={orders}>
      {order => (
        <Table.BodyRow columns="repeat(4, 1fr) 60px" key={order.id}>
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

ClientOrdersTable = compose(withModal)(ClientOrdersTable);

export default ClientOrdersTable;
