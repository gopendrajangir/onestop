import { Filters } from "./searchParamsUtils";


const ifFiltersExist: (filters: Filters) => boolean = (filters) => {

  let filtersExist = false;
  const filterTypes = Object.keys(filters);

  for (let i = 0; i < filterTypes.length; i++) {
    let ifBroken = false;
    const filterTitles = Object.keys(filters[filterTypes[i]]);
    for (let j = 0; j < filterTitles.length; j++) {
      if (filters[filterTypes[i]][filterTitles[j]].values.length > 1) {
        filtersExist = true;
        ifBroken = true;
        break;
      } else if (filters[filterTypes[i]][filterTitles[j]].values.length === 1) {
        if (filters[filterTypes[i]][filterTitles[j]].values[0].selected) {
          filtersExist = true;
          ifBroken = true;
          break;
        }
      }
    }
    if (ifBroken) break;
  }

  return filtersExist;
}

export default ifFiltersExist;