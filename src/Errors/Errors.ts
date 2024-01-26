import { InputError, InputProps } from "./ErrorAndPropsType";

export default function Errors({
  cartValue,
  delivaryDistance,
  items,
}: InputProps): InputError {
 
  const newErrors: InputError = {
    cartValueError: "",
    distanceError: "",
    itemsError: "",
  };

  // checkeing cartValue greter then 0 or not
  if (cartValue < 1) {
    newErrors.cartValueError = "Value must be greter then 0";
  }
  // checkeing delivaryDistance greter then 0 or not
  if (delivaryDistance <= 0) {
    newErrors.distanceError = "Distance must be greter then 0";
  }
  // checkeing items greter then 0 or not
  if (items < 1) {
    newErrors.itemsError = "Items must be greter then 0";
  }

 

  return newErrors;
}
