import React from 'react';
import { compose } from 'recompose';
import * as R from 'ramda';
import { Table, Dropdown, Icon, Menu, withModal } from '@8base/boost';
import { graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';

import ProductDeleteDialog from './ProductDeleteDialog';
import ProductCreateDialog from './ProductCreateDialog';

let ProductsTable = ({ products, openModal, closeModal }) => (
  <Table>
    <Table.Header columns="repeat(4, 1fr) 60px">
      <Table.HeaderCell>Picture</Table.HeaderCell>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Description</Table.HeaderCell>
      <Table.HeaderCell>Price</Table.HeaderCell>
      <Table.HeaderCell />
    </Table.Header>

    <Table.Body
      loading={products.loading}
      data={R.pathOr([], ['productsList', 'items'], products)}
      action="Create Product"
      onActionClick={() => openModal(ProductCreateDialog.id)}
    >
      {product => (
        <Table.BodyRow columns="repeat(4, 1fr) 60px" key={product.id}>
          <Table.BodyCell>{product.picture.uploadUrl}</Table.BodyCell>
          <Table.BodyCell>{product.name}</Table.BodyCell>
          <Table.BodyCell>{product.description}</Table.BodyCell>
          <Table.BodyCell>{product.price}</Table.BodyCell>
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
                        openModal(ProductDeleteDialog.id, { id: product.id });
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

ProductsTable = compose(
  withModal,
  graphql(sharedGraphQL.PRODUCTS_LIST_QUERY, { name: 'products' })
)(ProductsTable);

export default ProductsTable;
