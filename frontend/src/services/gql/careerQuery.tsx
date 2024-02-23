import { gql } from '@apollo/client';

const careerQuery = gql`
  query GetCareer($career: String, $university: String) {
    careers(
      filters: { name: { containsi: $career }, university: { acronym: { containsi: $university } } }
    ) {
      data {
        attributes {
          name
          title
          curriculum {
            data {
              attributes {
                url
              }
            }
          }
          description
          modality
          duration
          links {
            text
          }
          study_areas {
            text
          }
          job_areas {
            text
          }
          costs
          academic_grade
          educational_field
          university {
            data {
              attributes {
                name
                acronym
                websites {
                  text
                }
                emails {
                  text
                }
                phones {
                  text
                }
                addresses {
                  address
                  map
                }
                logo {
                  data {
                    attributes {
                      url
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

export default careerQuery;
