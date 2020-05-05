import React from 'react';
import { Card, Heading } from '@8base/boost';

import ProductDeleteDialog from './ProductDeleteDialog';
import ProductCreateDialog from './ProductCreateDialog';
import ProductsTable from './ProductsTable';

const Products = () => (
  <Card padding="md" stretch>
    <Card.Header>
      <Heading type="h4" text="Products" />
    </Card.Header>
    <ProductDeleteDialog />
    <ProductCreateDialog />
    <Card.Body padding="none" stretch scrollable>
      <ProductsTable />
    </Card.Body>
  </Card>
);

export default Products;
