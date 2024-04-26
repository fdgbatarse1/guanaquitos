import { gql } from '@apollo/client';

const scholarshipQuery = gql`
  query GetScholarship($scholarship: String, $entity: String) {
    scholarships(
      filters: { name: { containsi: $scholarship }, entities: { name: { containsi: $entity } } }
    ) {
      data {
        id
        attributes {
          name
          country
          type
          category
          modality
          application_start_date
          application_final_date
          studies_start_date
          studies_final_date
          documents {
            data {
              id
              attributes {
                url
              }
            }
          }
          description
          goals
          study_areas {
            id
            text
          }
          benefits
          requirements
          conditions
          how_to_apply
          required_documents
          selection_criteria
          links {
            id
            text
          }
          entities {
            data {
              attributes {
                name
                acronym
                websites {
                  id
                  text
                }
                emails {
                  id
                  text
                }
                phones {
                  id
                  text
                }
                addresses {
                  id
                  address
                  map
                }
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

export default scholarshipQuery;
