/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetCareer($career: String, $university: String) {\n    careers(\n      filters: { name: { containsi: $career }, university: { acronym: { containsi: $university } } }\n    ) {\n      data {\n        attributes {\n          name\n          title\n          curriculum {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n          description\n          modality\n          duration\n          links {\n            text\n          }\n          study_areas {\n            text\n          }\n          job_areas {\n            text\n          }\n          costs\n          discounts\n          academic_grade\n          educational_field\n          university {\n            data {\n              attributes {\n                name\n                acronym\n                websites {\n                  text\n                }\n                emails {\n                  text\n                }\n                phones {\n                  text\n                }\n                addresses {\n                  address\n                  map\n                }\n                logo {\n                  data {\n                    attributes {\n                      url\n                      width\n                      height\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n      meta {\n        pagination {\n          page\n          pageSize\n          pageCount\n          total\n        }\n      }\n    }\n  }\n": types.GetCareerDocument,
    "\n  query GetCareers(\n    $query: String\n    $academic_grade: String\n    $educational_field: String\n    $university_acronym: String\n    $sort: String\n    $page: Int\n    $page_size: Int\n  ) {\n    careers(\n      filters: {\n        name: { containsi: $query }\n        academic_grade: { containsi: $academic_grade }\n        educational_field: { containsi: $educational_field }\n        university: { acronym: { containsi: $university_acronym } }\n      }\n      sort: [$sort]\n      pagination: { page: $page, pageSize: $page_size }\n    ) {\n      data {\n        id\n        attributes {\n          name\n          university {\n            data {\n              attributes {\n                name\n                acronym\n                logo {\n                  data {\n                    attributes {\n                      url\n                      width\n                      height\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n      meta {\n        pagination {\n          page\n          pageSize\n          pageCount\n          total\n        }\n      }\n    }\n  }\n": types.GetCareersDocument,
    "\n  query GetCareersSearch(\n    $query: String\n    $academic_grade: String\n    $educational_field: String\n    $university_acronym: String\n    $sort: String\n    $page: Int\n    $page_size: Int\n  ) {\n    careers(\n      filters: {\n        name: { containsi: $query }\n        academic_grade: { containsi: $academic_grade }\n        educational_field: { containsi: $educational_field }\n        university: { acronym: { containsi: $university_acronym } }\n      }\n      sort: [$sort]\n      pagination: { page: $page, pageSize: $page_size }\n    ) {\n      data {\n        id\n        attributes {\n          name\n        }\n      }\n      meta {\n        pagination {\n          page\n          pageSize\n          pageCount\n          total\n        }\n      }\n    }\n  }\n": types.GetCareersSearchDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCareer($career: String, $university: String) {\n    careers(\n      filters: { name: { containsi: $career }, university: { acronym: { containsi: $university } } }\n    ) {\n      data {\n        attributes {\n          name\n          title\n          curriculum {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n          description\n          modality\n          duration\n          links {\n            text\n          }\n          study_areas {\n            text\n          }\n          job_areas {\n            text\n          }\n          costs\n          discounts\n          academic_grade\n          educational_field\n          university {\n            data {\n              attributes {\n                name\n                acronym\n                websites {\n                  text\n                }\n                emails {\n                  text\n                }\n                phones {\n                  text\n                }\n                addresses {\n                  address\n                  map\n                }\n                logo {\n                  data {\n                    attributes {\n                      url\n                      width\n                      height\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n      meta {\n        pagination {\n          page\n          pageSize\n          pageCount\n          total\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCareer($career: String, $university: String) {\n    careers(\n      filters: { name: { containsi: $career }, university: { acronym: { containsi: $university } } }\n    ) {\n      data {\n        attributes {\n          name\n          title\n          curriculum {\n            data {\n              attributes {\n                url\n              }\n            }\n          }\n          description\n          modality\n          duration\n          links {\n            text\n          }\n          study_areas {\n            text\n          }\n          job_areas {\n            text\n          }\n          costs\n          discounts\n          academic_grade\n          educational_field\n          university {\n            data {\n              attributes {\n                name\n                acronym\n                websites {\n                  text\n                }\n                emails {\n                  text\n                }\n                phones {\n                  text\n                }\n                addresses {\n                  address\n                  map\n                }\n                logo {\n                  data {\n                    attributes {\n                      url\n                      width\n                      height\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n      meta {\n        pagination {\n          page\n          pageSize\n          pageCount\n          total\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCareers(\n    $query: String\n    $academic_grade: String\n    $educational_field: String\n    $university_acronym: String\n    $sort: String\n    $page: Int\n    $page_size: Int\n  ) {\n    careers(\n      filters: {\n        name: { containsi: $query }\n        academic_grade: { containsi: $academic_grade }\n        educational_field: { containsi: $educational_field }\n        university: { acronym: { containsi: $university_acronym } }\n      }\n      sort: [$sort]\n      pagination: { page: $page, pageSize: $page_size }\n    ) {\n      data {\n        id\n        attributes {\n          name\n          university {\n            data {\n              attributes {\n                name\n                acronym\n                logo {\n                  data {\n                    attributes {\n                      url\n                      width\n                      height\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n      meta {\n        pagination {\n          page\n          pageSize\n          pageCount\n          total\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCareers(\n    $query: String\n    $academic_grade: String\n    $educational_field: String\n    $university_acronym: String\n    $sort: String\n    $page: Int\n    $page_size: Int\n  ) {\n    careers(\n      filters: {\n        name: { containsi: $query }\n        academic_grade: { containsi: $academic_grade }\n        educational_field: { containsi: $educational_field }\n        university: { acronym: { containsi: $university_acronym } }\n      }\n      sort: [$sort]\n      pagination: { page: $page, pageSize: $page_size }\n    ) {\n      data {\n        id\n        attributes {\n          name\n          university {\n            data {\n              attributes {\n                name\n                acronym\n                logo {\n                  data {\n                    attributes {\n                      url\n                      width\n                      height\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n      meta {\n        pagination {\n          page\n          pageSize\n          pageCount\n          total\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCareersSearch(\n    $query: String\n    $academic_grade: String\n    $educational_field: String\n    $university_acronym: String\n    $sort: String\n    $page: Int\n    $page_size: Int\n  ) {\n    careers(\n      filters: {\n        name: { containsi: $query }\n        academic_grade: { containsi: $academic_grade }\n        educational_field: { containsi: $educational_field }\n        university: { acronym: { containsi: $university_acronym } }\n      }\n      sort: [$sort]\n      pagination: { page: $page, pageSize: $page_size }\n    ) {\n      data {\n        id\n        attributes {\n          name\n        }\n      }\n      meta {\n        pagination {\n          page\n          pageSize\n          pageCount\n          total\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCareersSearch(\n    $query: String\n    $academic_grade: String\n    $educational_field: String\n    $university_acronym: String\n    $sort: String\n    $page: Int\n    $page_size: Int\n  ) {\n    careers(\n      filters: {\n        name: { containsi: $query }\n        academic_grade: { containsi: $academic_grade }\n        educational_field: { containsi: $educational_field }\n        university: { acronym: { containsi: $university_acronym } }\n      }\n      sort: [$sort]\n      pagination: { page: $page, pageSize: $page_size }\n    ) {\n      data {\n        id\n        attributes {\n          name\n        }\n      }\n      meta {\n        pagination {\n          page\n          pageSize\n          pageCount\n          total\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;