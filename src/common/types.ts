export interface IQueryObject {
  baseColor?: string;
  'analytics.gender'?: string;
  'analytics.articleType'?: string;
  'analytics.brand'?: string;
  'analytics.subCategory'?: string;
  'analytics.masterCategory'?: string;
  'specifications.Sleeve Length'?: string;
  'specifications.Occasion'?: string;
  'specifications.Type'?: string;
}

export interface IRatings {
  averageRating?: number;
  totalCount?: number;
  ratingInfo:
  {
    rating: number;
    count: number;
  }[];
  reviewInfo?: {
    reviewsCount: number;
  };
}

export interface IReview {
  _id: string;
  productId: string;
  rating: number;
  username: string;
  review: string;
  images: string[] | null;
}

export interface ISku {
  _id: string;
  productId: string;
  skuId: string;
  quantity: number;
  size: string;
  priority: number;
}

export interface IAnalytics {
  articleType: string;
  subCategory: string;
  masterCategory: string;
  gender: string;
  brand: string
}


export interface IVariant {
  _id: string;
  name: string;
  image: string;
  baseColor: string;
}

export interface IDetails {
  title: 'string';
  description: 'string';
}

export interface IImage {
  src: string;
  secureSrc: string;
  host: string | null;
  imageURL: string;
  annotation: []
}

export interface IDiscount {
  label?: string;
  discountPercent?: number
}

export interface IProductMedia {
  videos:
  {
    id: string;
    host: string;
    view: string;
    title: string | null;
    description: string | null;
    url: string;
    album: string;
  }[];
  albums: {
    name: string;
    images: IImage[]
  }[]
}

export interface IProduct {
  _id: string;
  name: string;
  manufacturer: string;
  countryOfOrigin: string;
  baseColor: string;
  ratings?: IRatings;
  brand: {
    name: string;
    image: string;
  };
  sizeChart?: {
    sizeChartUrl?: 'string';
    sizeRepresentationUrl?: 'string';
  };
  details: IDetails[];
  specifications?: { [key: string]: string };
  sellers?: {
    sellerPartnerId: number;
    sellerName: string;
    displayName: string;
    sellerAddress: {
      address: string;
      city: string;
      state: string;
      pincode: string;
      country: string;
    }
  }[];
  expiryDate?: string | null;
  analytics: IAnalytics;
  master?: string;
  media: IProductMedia;
  mrp: number;
  discount?: IDiscount | null;
  sizes: {
    label: string;
    measurements: {
      type: string;
      name: string;
      value: string;
      minValue: string;
      maxValue: string;
      unit: string;
      displayText: string;
    }[];
  }[];
  skus: ISku[];
  variants?: IVariant[];
  reviews: IReview[]
}

export interface ReviewImage {
  i: number;
  j: number;
  idx: number;
  image: string;
}

export interface ICartProduct {
  _id: string;
  name: string;
  brand: { name: string, image: string },
  media: IProductMedia;
  mrp: number;
  discount?: {
    label?: string;
    discountPercent?: number;
  },
  skus: ISku[]
}

export interface ICartItem {
  _id: string;
  sku: ISku;
  product: ICartProduct;
  quantity: number;
  selected: boolean;
}

export interface ICart {
  _id: string;
  userId: string;
  items: ICartItem[]
}

export interface IWishlistItem {
  _id: string;
  name: string;
  brand: { name: string, image: string },
  mrp: number;
  media: IProductMedia;
  discount?: {
    label?: string;
    discountPercent?: number;
  },
  skus: ISku[]
}

export interface IWishlist {
  _id: string;
  userId: string;
  items: IWishlistItem[]
}


export interface IAddress {
  _id: string;
  completeAddress: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  isDefault?: boolean;
  isCurrent?: boolean;
}

export interface IProfile {
  phone: string;
  email?: string;
  name?: string;
  gender?: 'male' | 'female';
  addresses: IAddress[];
}
