import { useState } from "react";
import CalculatePriceBtn from "../CalculatePriceBtn/CalculatePriceBtn";
import CalculationInputBox from "../CalculationInputBox/CalculationInputBox";
import PriceCalculationInfo from "../Utils/PriceCalculationInfo";
import DelivaryFee from "../Utils/DelivaryFee";
import Errors from "../Errors/Errors";
import { InputError } from "../Errors/ErrorAndPropsType";
import { day } from "../Utils/Utils";

const newErrors: InputError = {
  cartValueError: "",
  distanceError: "",
  itemsError: "",
};

export default function CalculationForm() {
  const initialErrorState: InputError = {
    cartValueError: "",
    distanceError: "",
    itemsError: "",
  };

  const [delivaryCost, setDelivaryCost] = useState<number | undefined>(0);
  const [errors, setError] = useState(initialErrorState);
  let totalDelivaryFee: number = 0;
  const maxDelivaryFee: number = 15;
  const days: string[] = day;

  const handleSubmit = (event: React.SyntheticEvent): void => {
    // preventing form submit default behaviour
    event.preventDefault();

    // clear error after submitting
    setError(newErrors);

    // selecting form
    const form = event.target as typeof event.target & {
      cart_value: { value: number };
      delivary_distance: { value: number };
      items: { value: number };
      date: { value: string };
    };

    // Getting data from form
    const cartValue = +form.cart_value.value;
    const delivaryDistance = +form.delivary_distance.value;
    const items = +form.items.value;
    const time = form.date.value;
    const date = new Date(time);
    const day = date.getDay();
    const delivaryDay = days[day];

    // Call Error utility function
    const errors = Errors({ cartValue, delivaryDistance, items });

    // set error on errors state if there any input feild less then or equal 0
    setError(errors);

    const CartValueAndDistance: boolean =
      cartValue <= 0 || delivaryDistance <= 0;

    {
      /* 
        checking the cart value more then 0 or not,If cart value equal to 0 then we set the delivary fee 0 
       else we set the calculated delivary price
  */
    }
    if (CartValueAndDistance || items <= 0) {
      return setDelivaryCost(0);
    }

    // call Utility PriceCalculationInfo function and pass the needed props
    const { baseFee, distance, surCharge, bulkAmountsItemsFee } =
      PriceCalculationInfo({ cartValue, delivaryDistance, items });

    // Call DelivaryFee Utility function and pass needed props
    totalDelivaryFee = DelivaryFee({
      cartValue,
      baseFee,
      distance,
      surCharge,
      bulkAmountsItemsFee,
      delivaryDay,
    });

    // set delivary fee
    setDelivaryCost(totalDelivaryFee);

    // set maxDelivary fee 15 if delivary fee more then 15 euro
    totalDelivaryFee > 15 && setDelivaryCost(maxDelivaryFee);

    // form.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CalculationInputBox
          lable="Cart value"
          InType="text"
          name="cart_value"
          currency="€"
        />
        {errors?.cartValueError && (
          <p className="red font flex justify-content margin-left">
            {errors?.cartValueError}
          </p>
        )}
        <CalculationInputBox
          lable="Delivary distance"
          InType="number"
          name="delivary_distance"
          distance="m"
        />
        {errors?.distanceError && (
          <p className="red font flex justify-content margin-left">
            {errors?.distanceError}
          </p>
        )}
        <CalculationInputBox
          lable="Amount of items"
          InType="number"
          name="items"
        />
        {errors?.itemsError && (
          <p className="red font flex justify-content margin-left">
            {errors?.itemsError}
          </p>
        )}
        <CalculationInputBox lable="Time" InType="date" name="date" />
        <CalculatePriceBtn buttonType="submit" />
      </form>

      <h4 className="padding">Delivary Cost: {delivaryCost}€</h4>
    </>
  );
}
