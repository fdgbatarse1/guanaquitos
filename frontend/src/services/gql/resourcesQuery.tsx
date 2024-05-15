import { gql } from '@apollo/client';

const resourcesQuery = gql`
  query GetResources($query: String, $type: String, $sort: String, $page: Int, $page_size: Int) {
    resources(
      filters: { title: { containsi: $query }, type: { containsi: $type } }
      sort: [$sort]
      pagination: { page: $page, pageSize: $page_size }
    ) {
      data {
        id
        attributes {
          title
          description
          type
          link
          media {
            data {
              id
              attributes {
                url
              }
            }
          }
        }
      }
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
    }
  }
`;

export default resourcesQuery;
