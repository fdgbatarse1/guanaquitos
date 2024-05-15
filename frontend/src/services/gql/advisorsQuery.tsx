import { gql } from '@apollo/client';

const advisorsQuery = gql`
  query GetAdvisors {
    advisors {
      data {
        id
        attributes {
          name
          description
          linkedin
          resume {
            data {
              id
              attributes {
                url
              }
            }
          }
          picture {
            data {
              id
              attributes {
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

export default advisorsQuery;
