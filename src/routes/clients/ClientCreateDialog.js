import React from 'react';
import { Form, Field } from '@8base/forms';
import { Dialog, Grid, Button, InputField, DateInputField, ModalContext } from '@8base/boost';
import { graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';
import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

const CREATE_CLIENT_ID = 'CREATE_CLIENT_ID';

class ClientCreateDialog extends React.Component {
  static contextType = ModalContext;

  onSubmit = async data => {
    await this.props.clientCreate({ variables: { data } });
    this.context.closeModal(CREATE_CLIENT_ID);
  };

  onClose = () => {
    this.context.closeModal(CREATE_CLIENT_ID);
  };

  renderFormContent = ({ handleSubmit, invalid, submitting, pristine }) => (
    <form onSubmit={handleSubmit}>
      <Dialog.Header title="New Client" onClose={this.onClose} />
      <Dialog.Body scrollable>
        <Grid.Layout gap="sm" stretch>
          <Grid.Box>
            <Field name="firstName" label="First name" type="text" component={InputField} />
          </Grid.Box>
          <Grid.Box>
            <Field name="lastName" label="Last name" type="text" component={InputField} />
          </Grid.Box>
          <Grid.Box>
            <Field name="email" label="Email address" type="text" component={InputField} />
          </Grid.Box>
          <Grid.Box>
            <Field name="phone" label="Phone number" type="text" component={InputField} />
          </Grid.Box>
          <Grid.Box>
            <Field name="birthday" label="Client's birthday" component={DateInputField} />
          </Grid.Box>
        </Grid.Layout>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="neutral" variant="outlined" disabled={submitting} onClick={this.onClose}>
          Cancel
        </Button>
        <Button color="primary" type="submit" loading={submitting}>
          Create Client
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

ClientCreateDialog = graphql(sharedGraphQL.CLIENT_CREATE_MUTATION, {
  name: 'clientCreate',
  options: {
    refetchQueries: ['ClientsList'],
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'Client successfuly created',
    },
  },
})(ClientCreateDialog);

ClientCreateDialog.id = CREATE_CLIENT_ID;

export default ClientCreateDialog;
