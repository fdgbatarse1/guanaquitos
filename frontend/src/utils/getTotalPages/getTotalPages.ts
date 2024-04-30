interface GetTotalPages {
  total?: number;
  pageSize?: number;
}

const getTotalPages = ({ total, pageSize }: GetTotalPages) =>
  Math.ceil((total || 0) / (pageSize || 1));

export default getTotalPages;
