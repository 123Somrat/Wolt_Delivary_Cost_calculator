import "./App.css";
import CalculationForm from "./CalculationForm/CalculationForm";
import Footer from "./Footer/Footer";

function App() {
  return (
    <>
      <div className="main margin-auto">
        <h5 className="border-bottom padding">Delivery Fee Calculator</h5>
        <main style={{ margin: "10px 100px" }}>
          <CalculationForm />
        </main>
        <footer>
           <Footer />
        </footer>
      </div>
    </>
  );
}

export default App;
