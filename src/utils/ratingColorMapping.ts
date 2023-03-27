export const ratingBgMap = (rating: number) => {
  return {
    'bg-green-700': rating <= 5 && rating >= 4,
    'bg-green-500': rating >= 3 && rating < 4,
    'bg-orange-500': rating >= 2 && rating < 3,
    'bg-red-500': rating >= 0 && rating < 2,
  }
}

export const ratingFillMap = (rating: number) => {
  return {
    'fill-green-700': rating <= 5 && rating >= 4,
    'fill-green-500': rating >= 3 && rating < 4,
    'fill-orange-500': rating >= 2 && rating < 3,
    'fill-red-500': rating >= 0 && rating < 2,
  }
}