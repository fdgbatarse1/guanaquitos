import { gql } from '@apollo/client';

const homepageQuery = gql`
  query GetHomepage {
    homepage {
      data {
        id
        attributes {
          announcements {
            id
            url
            title
            description
          }
          videos {
            id
            url
            title
            description
          }
        }
      }
    }
  }
`;

export default homepageQuery;
