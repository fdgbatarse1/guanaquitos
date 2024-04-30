import { gql } from '@apollo/client';

const scholarshipsQuery = gql`
  query GetScholarships(
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
          country
          application_start_date
          application_final_date
          entities {
            data {
              attributes {
                name
                acronym
                logo {
                  data {
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

export default scholarshipsQuery;
