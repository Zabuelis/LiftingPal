function filterList(list, filter) {
  return list.filter((record) =>
    record.name.toUpperCase().includes(filter.toUpperCase()),
  );
}

export default filterList;
