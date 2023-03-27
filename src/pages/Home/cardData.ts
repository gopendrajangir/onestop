import BodyWashImg from 'assets/img/bodywash.png';
import WatchImg from 'assets/img/watch.png';
import ShoesImg from 'assets/img/shoes.png';
import MakeupImg from 'assets/img/makeup.png';

import createCustomUrl from 'utils/createCustomUrl';

export const saleData = [
  {
    bg: 'bg-blue-200',
    urlParams: createCustomUrl('body wash and scrubs', {
      'discount.discountPercent': [{ min: 0, max: 70 }],
    }),
    title: 'Body washes',
    img: BodyWashImg,
    discountLabel: 'Upto 70% off',
  },
  {
    bg: 'bg-amber-200',
    urlParams: createCustomUrl('watches', {
      'discount.discountPercent': [{ min: 0, max: 60 }],
    }),
    title: 'Branded watches',
    img: WatchImg,
    discountLabel: 'Upto 60% off',
  },
  {
    bg: 'bg-emerald-200',
    urlParams: createCustomUrl('Shoes', {
      'discount.discountPercent': [{ min: 0, max: 70 }],
    }),
    title: 'Trending Shoes',
    img: ShoesImg,
    discountLabel: 'Upto 70% off',
  },
  {
    bg: 'bg-slate-200',
    urlParams: createCustomUrl('Makeup', {
      'discount.discountPercent': [{ min: 0, max: 50 }],
    }),
    title: 'Makeup Kits',
    img: MakeupImg,
    discountLabel: 'Upto 50% off',
  },
];

export const topPicksData = [
  {
    urlParams: createCustomUrl('kurtas', {
      mrp: [{ min: 0, max: 799 }],
    }),
    title: 'Kurtas',
    img: "https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width),w_/v1/assets/images/6603449/2018/5/31/0c4975ee-d176-4f1f-925f-d7d4c2a7bbba1527769207973-na-991527769206303-1.jpg",
    discount: '799',
  },
  {
    urlParams: createCustomUrl('dresses', {
      mrp: [{ min: 0, max: 899 }],
    }),
    title: 'Dresses',
    img: "https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width),w_/v1/assets/images/10308591/2019/7/29/1b9df8fd-214e-4e8c-a0b6-759a9167e1e61564379559418-SASSAFRAS-Women-Black-A-Line-Dress-291564379558115-1.jpg",
    discount: '899',
  },
  {
    urlParams: createCustomUrl('jeans', {
      mrp: [{ min: 0, max: 999 }],
    }),
    title: 'Jeans',
    img: "https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width),w_/v1/assets/images/7139482/2022/4/21/6ad74122-26a4-44b4-a461-e5ec6431efd01650541011059RoadsterMenBlackSlimFitMid-RiseCleanLookStretchableJeans1.jpg",
    discount: '999',
  },
  {
    urlParams: createCustomUrl('casual shirts', {
      mrp: [{ min: 0, max: 799 }],
    }),
    title: 'Casual shirts',
    img: "https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width),w_/v1/assets/images/1291760/2017/12/5/11512469309123-Highlander-Dark-Green-Slim-Fit-Casual-Shirt-5071512469308877-1.jpg",
    discount: '799',
  },
  {
    urlParams: createCustomUrl('tshirts', {
      mrp: [{ min: 0, max: 499 }],
    }),
    title: 'tshirts',
    img: "https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width),w_/v1/assets/images/2115291/2017/10/25/11508912500536-Kook-N-Keech-Women-Black-Printed-Round-Neck-T-shirt-251508912500341-1.jpg",
    discount: '499',
  },
  {
    urlParams: createCustomUrl('formal shirts', {
      mrp: [{ min: 0, max: 899 }],
    }),
    title: 'Formal shirts',
    img: "https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width),w_/v1/assets/images/productimage/2020/2/14/11adb5a6-9666-4bd2-8ed8-03fd20291f9d1581635929903-1.jpg",
    discount: '899',
  },
  {
    urlParams: createCustomUrl('tops', {
      mrp: [{ min: 0, max: 899 }],
    }),
    title: 'tops',
    img: "https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width),w_/v1/assets/images/8375271/2019/1/7/582995a9-d9c8-4129-8538-bf6492edc0191546853353174-Ives-Women-Olive-Green-Solid-Shirt-Style-Top-342154685335233-1.jpg",
    discount: '899',
  },
];

export const categoriesData = [
  {
    urlParams: createCustomUrl('bags'),
    title: 'bags',
    img: "https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width),w_/v1/assets/images/10821000/2019/11/14/ce9dc89f-f948-4d11-aacf-9cdc3177ba711573730338812-F-Gear-Castle-24-Ltrs-Black-Casual-Backpack-3227-58515737303-1.jpg"
  },
  {
    urlParams: createCustomUrl('tshirts'),
    title: 'tshirts',
    img: "https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width),w_/v1/assets/images/2115291/2017/10/25/11508912500536-Kook-N-Keech-Women-Black-Printed-Round-Neck-T-shirt-251508912500341-1.jpg",
  },
  {
    urlParams: createCustomUrl('sarees'),
    title: 'shirts',
    img: "https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width),w_/v1/assets/images/16595858/2022/1/21/81124523-6b8d-46f6-a74f-b4fe28a7d3b61642763095101-Saree-Mall-Pink-Organza-Ethnic-Printed-Party-Wear-Saree-with-1.jpg",
  },
  {
    urlParams: createCustomUrl('kurtas'),
    title: 'kurtas',
    img: "https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width),w_/v1/assets/images/6603449/2018/5/31/0c4975ee-d176-4f1f-925f-d7d4c2a7bbba1527769207973-na-991527769206303-1.jpg",
  },
  {
    urlParams: createCustomUrl('jewellery'),
    title: 'jewellery',
    img: "https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width),w_/v1/assets/images/10942906/2021/11/22/84277a7f-3c9a-4613-a98d-aaffd7b72f411637573698864ZaveriPearlsGold-TonedWhiteContemporaryPearlsStuddedJeweller1.jpg"
  },
  {
    urlParams: createCustomUrl('beauty'),
    title: 'beauty',
    img: "https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/17680742/2022/3/31/564a9ead-0ffd-4672-a7ba-67fbcb1582031648728144579IbaMustHaveCompleteMakeupBox-Fair1.jpg"
  },
  {
    urlParams: createCustomUrl('jeans'),
    title: 'jeans',
    img: "https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width),w_/v1/assets/images/7139482/2022/4/21/6ad74122-26a4-44b4-a461-e5ec6431efd01650541011059RoadsterMenBlackSlimFitMid-RiseCleanLookStretchableJeans1.jpg",
  },
  {
    urlParams: createCustomUrl('sports shoes'),
    title: 'sports shoes',
    img: "http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/2154051/2022/4/25/84da0175-ccff-4adc-aa17-176c527c66811650874352312HRXbyHrithikRoshanMenActiveGreyCore10RunningShoes1.jpg"
  },
  {
    urlParams: createCustomUrl('trousers'),
    title: 'trousers',
    img: "http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/13843132/2021/3/23/ea4344b1-280b-4021-a9b8-5d67e20f96a81616490669283-SASSAFRAS-Women-Olive-Green-Regular-Fit-Solid-Pure-Cotton-St-1.jpg"
  },
  {
    urlParams: createCustomUrl('casual shoes'),
    title: 'casual shoes',
    img: "http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/10331501/2020/3/18/d4d07c60-88d9-43d9-aa78-9cc7712816321584508934272-US-Polo-Assn-Men-White-Colourblocked-Sneakers-84015845089331-1.jpg"
  },
  {
    urlParams: createCustomUrl('track pants'),
    title: 'track pants',
    img: "http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/1757669/2022/4/22/ba29f669-1381-4fb2-9186-8098551040c41650613357390HubberholmeBlackSlimFitTrackPants1.jpg"
  },
  {
    urlParams: createCustomUrl('tops'),
    title: 'tops',
    img: "https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width),w_/v1/assets/images/8375271/2019/1/7/582995a9-d9c8-4129-8538-bf6492edc0191546853353174-Ives-Women-Olive-Green-Solid-Shirt-Style-Top-342154685335233-1.jpg",
  },
  {
    urlParams: createCustomUrl('watches'),
    title: 'watches',
    img: "http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/9460049/2022/6/17/7886cbfe-cef2-4af4-86b6-d60fb3b2525f1655465213416-The-Roadster-Lifestyle-Co-Men-Black-Multi-Function-Analogue--1.jpg"
  },
  {
    urlParams: createCustomUrl('bath'),
    title: 'bath',
    img: "http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/16065192/2022/3/31/fb6dffc2-cefd-4c05-ac80-21340afe9c6e1648710223351-HRX-by-Hrithik-Roshan-Unisex-Burgundy-Solid-Face-Towel-96164-7.jpg"
  },
  {
    urlParams: createCustomUrl('dresses'),
    title: 'dresses',
    img: "https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width),w_/v1/assets/images/10308591/2019/7/29/1b9df8fd-214e-4e8c-a0b6-759a9167e1e61564379559418-SASSAFRAS-Women-Black-A-Line-Dress-291564379558115-1.jpg",
  },
  {
    urlParams: createCustomUrl('innerwear'),
    title: 'innerwear',
    img: "http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/17036988/2022/2/3/4cdaaa44-50e8-4e42-9f3f-5d2a5159d1c81643881631387PackOf3DollarLeharMensWhiteVest1.jpg"
  },
];
