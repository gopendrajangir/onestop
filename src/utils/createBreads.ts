import { IAnalytics, IQueryObject } from "common/types";

export default (
  queryObject: IQueryObject = {},
  analytics: IAnalytics,
  isSingleProduct: boolean
) => {
  const breads = [{ link: '/', value: 'Home' }];

  if (
    queryObject['analytics.masterCategory'] ||
    (!queryObject['analytics.brand'] && !queryObject['specifications.Occasion'])
  )
    breads.push({
      link: `/search?query=${queryObject['analytics.masterCategory'] ?? analytics.masterCategory
        }`,
      value:
        queryObject['analytics.masterCategory'] ?? analytics.masterCategory,
    });

  if (
    queryObject['analytics.subCategory'] ||
    (!queryObject['analytics.brand'] &&
      !queryObject['analytics.masterCategory'] &&
      !queryObject['specifications.Occasion'])
  )
    breads.push({
      link: `/search?query=${queryObject['analytics.subCategory'] ?? analytics.subCategory
        }`,
      value: queryObject['analytics.subCategory'] ?? analytics.subCategory,
    });

  if (queryObject['analytics.articleType']) {
    breads.push({
      link: `/search?query=${queryObject['analytics.articleType']
          ? queryObject['analytics.gender']
            ? `${queryObject['analytics.articleType']} for ${queryObject['analytics.gender']}`
            : queryObject['analytics.articleType']
          : analytics.articleType
        }`,
      value: queryObject['analytics.articleType']
        ? queryObject['analytics.gender']
          ? `${queryObject['analytics.articleType']} for ${queryObject['analytics.gender']}`
          : queryObject['analytics.articleType']
        : analytics.articleType,
    });
  }

  if (queryObject['specifications.Occasion']) {
    breads.push({
      link: `/search?query=${queryObject['specifications.Occasion']}`,
      value: queryObject['specifications.Occasion'],
    });
  }

  if (isSingleProduct) {
    breads.push(
      {
        link: `/search?query=${analytics.brand}+${analytics.articleType}`,
        value: analytics.brand,
      },
      {
        link: `/search?query=${analytics.brand}`,
        value: `More from ${analytics.brand}`,
      }
    );
  } else {
    if (queryObject['analytics.brand']) {
      breads.push({
        link: `/search?query=${analytics.brand}`,
        value: analytics.brand,
      });
    }
  }

  return breads;
};
