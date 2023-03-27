export default function getPageNumbers(page, limit, totalPages) {
  const arr = [];
  if (page >= 10) {
    let extraSub = 0;
    if (page + 4 > totalPages) {
      extraSub = page + 4 - totalPages;
    }
    arr.push(1, page - 5 - extraSub);
    for (let i = page - 4; i <= page + 4 && i <= totalPages; i++) {
      arr.push(i);
    }
  } else {
    for (let i = 1; i <= 10 && i <= totalPages; i++) {
      arr.push(i);
    }
  }

  return arr;
}