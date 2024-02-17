import { gql } from '@apollo/client';

const careersSearchQuery = gql`
  query (
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

export default careersSearchQuery;
