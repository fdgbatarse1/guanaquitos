import { gql } from '@apollo/client';

const scholarshipsSearchQuery = gql`
  query GetScholarshipsSearch(
    $query: String
    $type: String
    $category: String
    $country: String
    $entity_name: String
    $sort: String
    $page: Int
    $page_size: Int
  ) {
    scholarships(
      filters: {
        name: { containsi: $query }
        type: { containsi: $type }
        category: { containsi: $category }
        country: { containsi: $country }
        entities: { name: { containsi: $entity_name } }
      }
      sort: [$sort]
      pagination: { page: $page, pageSize: $page_size }
    ) {
      data {
        id
        attributes {
          name
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

export default scholarshipsSearchQuery;
