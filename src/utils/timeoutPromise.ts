import { NavigateFunction } from "react-router-dom";

export default (navigate: NavigateFunction, cb: () => void) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
      cb();
    }, 2000);
  })
}