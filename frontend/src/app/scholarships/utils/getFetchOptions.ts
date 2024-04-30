import client from '@/lib/apollo-client';

const getFetchOptions =
  ({ scholarshipsSearchQuery, type, category, country, entity, order }: any) =>
  async (query: string) => {
    const { data } = await client.query({
      query: scholarshipsSearchQuery,
      variables: {
        query,
        type,
        category,
        country,
        entity_name: entity,
        sort: order || 'name:asc',
        page: 1,
        page_size: 10,
      },
    });

    const names = data.scholarships.data.map((scholarship: any) => scholarship.attributes.name);

    return names;
  };

export default getFetchOptions;
