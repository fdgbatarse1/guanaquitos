import client from '@/lib/apollo-client';

const getFetchOptions =
  ({ resourcesSearchQuery, type, order }: any) =>
  async (newInputValue: string) => {
    const { data: newData } = await client.query({
      query: resourcesSearchQuery,
      variables: {
        query: newInputValue,
        type,
        sort: order || 'title:asc',
        page: 1,
        page_size: 10,
      },
    });

    const titles = newData.resources.data.map((resource: any) => resource.attributes.title);

    return titles;
  };

export default getFetchOptions;
