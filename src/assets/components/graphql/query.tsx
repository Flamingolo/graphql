  import { gql } from '@apollo/client';

  export const GET_ALL_DATA = gql`
  query {
    user {
      id
      login
      attrs
      totalUp
      totalDown
      createdAt
      updatedAt
      transactions(order_by: { createdAt: desc }, where: { _not: { _or: [{ path: { _ilike: "%piscine%" } }, { type: { _ilike: "%piscine%" } }] } }) {
        id
        createdAt
        objectId
        type
        amount
        path
        object {
          id
          name
          type
          attrs
        }
      }
    }
  }
`;
