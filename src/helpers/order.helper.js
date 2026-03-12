function orderBy(arr = [], key = "", direction = "desc") {
  if (direction === "desc") {
    return arr.sort((a, b) => {
      return a[key] < b[key] ? 1 : -1
    });
  }

  if (direction === "asc") {
    return arr.sort((a, b) => {
      return a[key] > b[key] ? 1 : -1
    });
  }

  return arr;
}

const orderHelper = {
  orderBy,
}

export default orderHelper;
