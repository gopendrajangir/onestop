import { IAddress } from "common/types";

export default (addresses: IAddress[]) => {
  console.log(addresses.filter(address => !address.isDefault));
  return {
    defaultAddress: addresses.filter(address => address.isDefault)[0],
    currentAddress: addresses.filter(address => address.isCurrent)[0],
    otherAddresses: addresses.filter(address => !address.isDefault)
  }
}