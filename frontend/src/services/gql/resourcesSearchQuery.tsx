import { gql } from '@apollo/client';

const resourcesSearchQuery = gql`
  query GetResourcesSearch(
    $query: String
    $type: String
    $sort: String
    $page: Int
    $page_size: Int
  ) {
    resources(
      filters: { title: { containsi: $query }, type: { containsi: $type } }
      sort: [$sort]
      pagination: { page: $page, pageSize: $page_size }
    ) {
      data {
        id
        attributes {
          title
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

export default resourcesSearchQuery;
