import { IReview } from "common/types";

export default (reviews: IReview[]) => {
  return reviews
    .map(({ images, ...data }) => {
      const rvs = images ? images.map((image) => {
        return { ...data, image };
      }) : []
      return rvs;
    })
    .flat()
}