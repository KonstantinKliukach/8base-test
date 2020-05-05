import React from 'react';
import { Form, Field } from '@8base/forms';
import { Dialog, Grid, Button, InputField, ModalContext } from '@8base/boost';
import { graphql } from 'react-apollo';

import { FileInputField } from 'shared/components';

import * as sharedGraphQL from 'shared/graphql';
import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

const CREATE_CLIENT_ID = 'CREATE_CLIENT_ID';

class ProductCreateDialog extends React.Component {
  static contextType = ModalContext;

  onSubmit = async data => {
    data.price = Number(data.price);
    data.picture = {
      create: {
        filename: data.picture.filename,
        public: true,
        fileId: data.picture.fileId,
      },
    };

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
            <Field name="picture" label="Picture" component={FileInputField} maxFiles={1} type="image" public={true} />
          </Grid.Box>
          <Grid.Box>
            <Field name="name" label="Name" type="text" component={InputField} />
          </Grid.Box>
          <Grid.Box>
            <Field name="description" label="Product description" type="text" component={InputField} />
          </Grid.Box>
          <Grid.Box>
            <Field name="price" label="Price" type="number" component={InputField} />
          </Grid.Box>
        </Grid.Layout>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="neutral" variant="outlined" disabled={submitting} onClick={this.onClose}>
          Cancel
        </Button>
        <Button color="primary" type="submit" loading={submitting}>
          Create Product
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

ProductCreateDialog = graphql(sharedGraphQL.PRODUCT_CREATE_MUTATION, {
  name: 'productCreate',
  options: {
    refetchQueries: ['ProductsList'],
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'Product successfuly created',
    },
  },
})(ProductCreateDialog);

ProductCreateDialog.id = CREATE_CLIENT_ID;

export default ProductCreateDialog;
