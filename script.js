//# JAVASCRIPT CODE
document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  let currentInput = "0";
  let currentOperator = "";
  let prevInput = "";

  function updateDisplay() {
      display.textContent = currentInput;
  }

  function handleDigitClick(digit) {
      if (currentInput === "0" || currentInput === "Infinity" || currentInput === "-Infinity") {
          currentInput = digit;
      } else {
          currentInput += digit;
      }
      updateDisplay();
  }

  function handleOperatorClick(operator) {
      prevInput = currentInput;
      currentInput = "0";
      currentOperator = operator;
  }

  function handleEqualsClick() {
      const prev = parseFloat(prevInput);
      const current = parseFloat(currentInput);
      switch (currentOperator) {
          case "+":
              currentInput = prev + current;
              break;
          case "-":
              currentInput = prev - current;
              break;
          case "*":
              currentInput = prev * current;
              break;
          case "/":
              if(current !== 0) {
                  currentInput = prev / current;
              } else {
                  currentInput = "Error";
              }
              break;
      }

      currentOperator = "";
      prevInput = "";
      updateDisplay();
  }

  function clear() {
      currentInput = "0";
      currentOperator = "";
      prevInput = "";
      updateDisplay();
  }

  document.querySelectorAll('.btn').forEach(btn => {
      const id = btn.id;
      if (!isNaN(id)) {
          btn.addEventListener('click', () => handleDigitClick(id));
      }
  });

  document.getElementById("add").addEventListener("click", () => handleOperatorClick("+"));
  document.getElementById("subtract").addEventListener("click", () => handleOperatorClick("-"));
  document.getElementById("multiply").addEventListener("click", () => handleOperatorClick("*"));
  document.getElementById("divide").addEventListener("click", () => handleOperatorClick("/"));

  document.getElementById("decimal").addEventListener("click", () => {
      if (!currentInput.includes(".")) {
          currentInput += ".";
          updateDisplay();
      }
  });

  document.getElementById("equals").addEventListener("click", handleEqualsClick);
  document.getElementById("clear").addEventListener("click", clear);

  document.getElementById("backspace").addEventListener("click", () => {
      currentInput = currentInput.slice(0, -1);
      if (currentInput === "") {
          currentInput = "0";
      }
      updateDisplay();
  });

  updateDisplay();
});