import { ICartItem } from 'common/types';

export default (items: ICartItem[]) => {
  const totalDiscount = items.reduce((acc, item) => {
    const mrp = item.product.mrp;
    const discountPercent = item.product?.discount?.discountPercent;
    if (discountPercent) {
      return acc + mrp - Math.floor((discountPercent / 100) * mrp);
    }
    return acc;
  }, 0);

  const totalMrp = items.reduce((acc, item) => {
    const { mrp } = item.product;
    if (mrp) {
      return acc + mrp;
    }
    return acc;
  }, 0);

  return {
    totalDiscount,
    totalMrp,
  };
};
