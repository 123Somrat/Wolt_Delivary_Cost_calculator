import "./CalculationInputBox.css";

type InputProps = {
  lable: string;
  name: string;
  InType: string;
  currency?: string;
  distance?: string;
};

export default function CalculationInputBox({
  lable,
  InType,
  name,
  currency,
  distance,
}: InputProps) {
  return (
    <div className="margin-bottom padding flex flex-wrap items-center">
      <label htmlFor={lable} style={{ width: "5rem" }}>
        {lable}{" "}
      </label>
      <input
        type={InType}
        name={name}
        className="width padding border-radius margin-right"
      />

      <span>{currency}</span>
      <span>{distance}</span>
    </div>
  );
}
