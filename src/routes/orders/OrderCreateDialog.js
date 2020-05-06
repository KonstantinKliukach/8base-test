import React from 'react';
import { Form, Field } from '@8base/forms';
import { Dialog, Grid, Button, ModalContext, SelectField, InputField } from '@8base/boost';
import { Query, graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';
import { DateTimeInput } from 'shared/components/';
import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

const CREATE_CLIENT_ID = 'CREATE_CLIENT_ID';

const getUserOptions = (users = []) =>
  users.map(user => ({
    value: user.id,
    label: `${user.firstName} ${user.lastName}`,
  }));

const getProductsOptions = (products = []) =>
  products.map(product => ({
    value: product.id,
    label: product.name,
  }));

class OrderCreateDialog extends React.Component {
  static contextType = ModalContext;

  onSubmit = async data => {
    data.client = {
      connect: {
        id: data.client,
      },
    };
    data.orderItems = {
      create: {
        quantity: Number.parseInt(data.quantity),
        product: {
          connect: {
            id: data.product,
          },
        },
      },
    };
    delete data.quantity;
    delete data.product;

    await this.props.productCreate({ variables: { data } });
    this.context.closeModal(CREATE_CLIENT_ID);
  };

  onClose = () => {
    this.context.closeModal(CREATE_CLIENT_ID);
  };

  renderFormContent = ({ handleSubmit, invalid, submitting, pristine }) => (
    <form onSubmit={handleSubmit}>
      <Dialog.Header title="New Product" onClose={this.onClose} />
      <Dialog.Body scrollable>
        <Grid.Layout gap="sm" stretch>
          <Grid.Box>
            <Query query={sharedGraphQL.CLIENTS_LIST_QUERY}>
              {({ data, loading }) => (
                <Field
                  name="client"
                  label="Client"
                  placeholder="Select a client"
                  component={SelectField}
                  loading={loading}
                  options={loading || !data ? [] : getUserOptions(data.clientsList.items)}
                  stretch
                />
              )}
            </Query>
          </Grid.Box>
          <Grid.Box>
            <Query query={sharedGraphQL.PRODUCTS_LIST_QUERY}>
              {({ data, loading }) => (
                <Field
                  name="product"
                  label="Products"
                  placeholder="Select a product"
                  component={SelectField}
                  loading={loading}
                  options={loading || !data ? [] : getProductsOptions(data.productsList.items)}
                  stretch
                />
              )}
            </Query>
          </Grid.Box>
          <Grid.Box>
            <Field name="quantity" label="Quantity" type="text" component={InputField} />
          </Grid.Box>
          <Grid.Box>
            <Field name="address" label="Adress" type="text" component={InputField} />
          </Grid.Box>
          <Grid.Box>
            <Field name="deliveryDt" label="Delivery date and time" component={DateTimeInput} />
          </Grid.Box>
          <Grid.Box>
            <Field name="comment" label="Comment" type="text" component={InputField} />
          </Grid.Box>
          <Grid.Box>
            <Field
              name="status"
              label="Status"
              placeholder="Select a status"
              component={SelectField}
              options={[{ label: 'Opened', value: 'Opened' }]}
              stretch
            />
          </Grid.Box>
        </Grid.Layout>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="neutral" variant="outlined" disabled={submitting} onClick={this.onClose}>
          Cancel
        </Button>
        <Button color="primary" type="submit" loading={submitting}>
          Create Order
        </Button>
      </Dialog.Footer>
    </form>
  );

  render() {
    return (
      <Dialog id={CREATE_CLIENT_ID} size="sm">
        <Form type="CREATE" tableSchemaName="Properties" onSubmit={this.onSubmit}>
          {this.renderFormContent}
        </Form>
      </Dialog>
    );
  }
}

OrderCreateDialog = graphql(sharedGraphQL.ORDER_CREATE_MUTATION, {
  name: 'productCreate',
  options: {
    refetchQueries: ['OrdersList'],
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'Order successfuly created',
    },
  },
})(OrderCreateDialog);

OrderCreateDialog.id = CREATE_CLIENT_ID;

export default OrderCreateDialog;
