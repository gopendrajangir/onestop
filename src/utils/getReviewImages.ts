import { IReview } from "common/types";

export default (reviews: IReview[]) => {
  return reviews
    .map(({ images }, i) => {
      if (!images.length) return;
      return images.map((image) => {
        return {
          idx: i,
          image,
        };
      });
    })
    .filter((image) => image)
}