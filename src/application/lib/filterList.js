function filterList(list, filter) {
  if (!list) {
    return [];
  }
  return list.filter((record) =>
    record.name.toUpperCase().includes(filter.toUpperCase()),
  );
}

export default filterList;
