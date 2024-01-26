type delivaryCalculationData = {
  cartValue: number;
  baseFee: number;
  distance: number;
  surCharge: number;
  bulkAmountsItemsFee: number;
  delivaryDay: string;
};

export default function DelivaryFee({
  cartValue,
  baseFee,
  distance,
  surCharge,
  bulkAmountsItemsFee,
  delivaryDay,
}: delivaryCalculationData): number {
  let totalDelivaryFee: number = 0;
  const date: Date = new Date();
  const time: number = date.getUTCHours();

  // checking delivary fee more then or equal 200 or not.If delivary fee more then or qeual 200 then set delivbary fee 0
  if (cartValue >= 200) {
    totalDelivaryFee = 0;
    return totalDelivaryFee;
  }

  // if delivary less then 200 and day is friday and time is 3pm to 7 pm then multiple totalDelivary fee with 1.2
  if (cartValue < 200 && delivaryDay === "Friday" && 15 <= time && time <= 19) {
    totalDelivaryFee =
      (baseFee + Math.ceil(distance) + surCharge + bulkAmountsItemsFee) * 1.2;
    return totalDelivaryFee;
  }

  // if delivary fee less then 200 then set the delivary fee depends on baseFee , distance , surCharge and bulkItemsFee
  if (cartValue < 200) {
    totalDelivaryFee =
      baseFee + Math.ceil(distance) + surCharge + bulkAmountsItemsFee;
    return totalDelivaryFee;
  }

  // default return delivary fee
  return totalDelivaryFee;
}
