import './CalculatePriceBtn.css'

interface MyButtonProps {
  buttonType?: "button" | "submit" | "reset";
}

export default function CalculatePriceBtn({ buttonType }: MyButtonProps) {
  return (
    <div>
      <button
       className='margin padding shadow'
        type={buttonType}
      >
        Calculate Delivary Price
      </button>
    </div>
  );
}
