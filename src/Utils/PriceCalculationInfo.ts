type delivaryCalculationData = {
  cartValue: number;
  delivaryDistance: number;
  items: number;
};
export default function PriceCalculationInfo({
  cartValue,
  delivaryDistance,
  items,
}: delivaryCalculationData) {
  const baseFee: number = 2;
  const baseDelivaryDistance: number = 1000;
  const additionalCharge: number = 0.5;
  const noExtraSurchargeItemNumber: number = 4;
  let bulkAmountsItemsFee: number = 0;
  let distance: number;

  // calculating surcharge adding or not dependes on cart value
  let surCharge: number = 10 - cartValue;

  // checking cartValue
  cartValue < 10 ? surCharge : (surCharge = 0);

  // calculating distance
  if (delivaryDistance < baseDelivaryDistance) {
    distance = 0;
  } else {
    distance = (delivaryDistance - baseDelivaryDistance) / 500;
  }

  // Calculating bulk amount fee dependes on items number
  if (items > noExtraSurchargeItemNumber) {
    const itemNumber = items - noExtraSurchargeItemNumber;
  
    if (items > 12) {
      bulkAmountsItemsFee = itemNumber * additionalCharge + 1.2;
    } else {
     
      bulkAmountsItemsFee = itemNumber * 0.5;
    }
  }

  return { baseFee, distance, surCharge, bulkAmountsItemsFee };
}
