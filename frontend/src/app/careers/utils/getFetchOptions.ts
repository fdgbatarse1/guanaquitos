import client from '@/lib/apollo-client';

const getFetchOptions =
  ({ careersSearchQuery, degree, category, institution, order }: any) =>
  async (newInputValue: string) => {
    const { data: newData } = await client.query({
      query: careersSearchQuery,
      variables: {
        query: newInputValue,
        academic_grade: degree,
        educational_field: category,
        university_acronym: institution,
        sort: order || 'name:asc',
        page: 1,
        page_size: 10,
      },
    });

    const names = newData.careers.data.map((career: any) => career.attributes.name);

    return names;
  };

export default getFetchOptions;
