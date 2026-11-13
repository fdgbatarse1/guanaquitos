const unique = (values: (string | null)[]) =>
  Array.from(new Set(values.filter((value): value is string => value !== null))).sort((a, b) =>
    a.localeCompare(b, 'es'),
  );

export default unique;
