import { gql } from '@apollo/client';

const careersQuery = gql`
  query GetCareers(
    $query: String
    $academic_grade: String
    $educational_field: String
    $university_acronym: String
    $sort: String
    $page: Int
    $page_size: Int
  ) {
    careers(
      filters: {
        name: { containsi: $query }
        academic_grade: { containsi: $academic_grade }
        educational_field: { containsi: $educational_field }
        university: { acronym: { containsi: $university_acronym } }
      }
      sort: [$sort]
      pagination: { page: $page, pageSize: $page_size }
    ) {
      data {
        id
        attributes {
          name
          university {
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

export default careersQuery;
