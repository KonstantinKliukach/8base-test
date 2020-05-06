import gql from 'graphql-tag';

export const CLIENT_CREATE_MUTATION = gql`
  mutation ClientCreate($data: ClientCreateInput!) {
    clientCreate(data: $data) {
      id
    }
  }
`;

export const CLIENT_DELETE_MUTATION = gql`
  mutation ClientDelete($id: ID!) {
    clientDelete(data: { id: $id }) {
      success
    }
  }
`;

export const CLIENTS_LIST_QUERY = gql`
  query ClientsList {
    clientsList {
      count
      items {
        id
        firstName
        lastName
        email
        phone
        birthday
      }
    }
  }
`;

export const CLIENT_QUERY = gql`
  query Client($id: ID!) {
    client(id: $id) {
      id
      firstName
      lastName
      email
      phone
      birthday
      orders {
        items {
          address
          deliveryDt
          comment
          status
        }
      }
    }
  }
`;

export const PRODUCTS_LIST_QUERY = gql`
  query ProductsList {
    productsList {
      count
      items {
        id
        picture {
          id
          uploadUrl
        }
        name
        description
        price
      }
    }
  }
`;

export const PRODUCT_CREATE_MUTATION = gql`
  mutation ProductCreate($data: ProductCreateInput!) {
    productCreate(data: $data) {
      id
    }
  }
`;

export const PRODUCT_DELETE_MUTATION = gql`
  mutation ProductDelete($id: ID!) {
    productDelete(data: { id: $id }) {
      success
    }
  }
`;

export const ORDER_QUERY = gql`
  query Order($id: ID!) {
    order(id: $id) {
      id
      client {
        firstName
        lastname
      }
      address
      deliveryDt
      comment
      orderItems {
        items {
          quantity
          product {
            name
          }
        }
      }
    }
  }
`;

export const ORDERS_LIST_QUERY = gql`
  query OrdersList {
    ordersList {
      count
      items {
        id
        client {
          id
          firstName
          lastName
        }
        address
        deliveryDt
        comment
        status
        orderItems {
          items {
            product {
              id
              name
            }
            quantity
          }
        }
      }
    }
  }
`;

export const ORDER_CREATE_MUTATION = gql`
  mutation OrderCreate($data: OrderCreateInput!) {
    orderCreate(data: $data) {
      id
    }
  }
`;

export const ORDER_DELETE_MUTATION = gql`
  mutation OrderDelete($id: ID!) {
    orderDelete(data: { id: $id }) {
      success
    }
  }
`;
