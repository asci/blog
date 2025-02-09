import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [firstNumber, setFirstNumber] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperation = (op) => {
    setFirstNumber(parseFloat(display));
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = () => {
    const second = parseFloat(display);
    let result = 0;
    switch (operation) {
      case "+":
        result = firstNumber + second;
        break;
      case "-":
        result = firstNumber - second;
        break;
      case "*":
        result = firstNumber * second;
        break;
      case "/":
        result = firstNumber / second;
        break;
      default:
        return;
    }
    setDisplay(result.toString());
    setNewNumber(true);
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        {[7, 8, 9, "+", 4, 5, 6, "-", 1, 2, 3, "*", "C", 0, "=", "/"].map(
          (btn) => (
            <button
              key={btn}
              onClick={() => {
                if (typeof btn === "number") handleNumber(btn.toString());
                else if (btn === "=") calculate();
                else if (btn === "C") setDisplay("0");
                else handleOperation(btn);
              }}
            >
              {btn}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default App;
