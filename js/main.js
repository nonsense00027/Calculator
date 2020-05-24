class UI {
  static selectElements() {
    let result = document.querySelector(".result");
    let input = document.querySelector(".input");
    let histories = document.querySelector(".table-history");
    return [result, input, histories];
  }

  static addInput(inp) {
    const [result, input, histories] = this.selectElements();
    if (result.innerText != "") {
      if (!this.isOperator(result.innerText[result.innerText.length - 1])) {
        return;
      }
    }
    input.textContent = input.textContent + inp;
    if (input.innerText.length > 16) {
      input.innerText = input.innerText.substring(0, 16);
    }
  }

  static addResult(inp) {
    const [result, input, histories] = this.selectElements();
    if (input.innerText != "") {
      if (input.innerText.includes("(")) {
        input.innerText = input.innerText + " " + inp + " ";
      } else {
        const text = input.innerText.split(" ");
        if (text.includes("^")) {
          let num1 = parseFloat(text[0]);
          let num2 = parseFloat(text[2]);
          input.innerText = Math.pow(num1, num2);
        }
        result.textContent =
          result.innerText + " " + input.innerText + " " + inp;
        input.textContent = "";
      }
    } else {
      if (result.innerText != "") {
        if (this.isOperator(result.innerText[result.innerText.length - 1])) {
          let str = result.innerText.substring(0, result.innerText.length - 1);
          str = str.concat(inp);
          result.innerText = str;
        } else {
          result.innerText = result.innerText + " " + inp;
        }
      }
    }
  }

  static isOperator(str) {
    const operators = ["*", "/", "+", "-"];
    return operators.includes(str);
  }

  static getResult() {
    const [result, input, histories] = this.selectElements();
    if (input.innerText != "") {
      result.innerText += " " + input.innerText;
    }
    let all = result.innerText.split(" ");
    this.computeResult(all, result.innerText);
  }

  static computeResult(all, text) {
    if (all.length === 1) {
      this.displayResult(all[0], text);
      return;
    } else {
      this.computeResult(this.compute(all), text);
    }
  }

  static compute(all) {
    if (all.includes("^")) {
      const index = all.indexOf("^");
      return this.com(all, index, 5);
    } else if (all.includes("*")) {
      const index = all.indexOf("*");
      return this.com(all, index, 1);
    } else if (all.includes("/")) {
      const index = all.indexOf("/");
      return this.com(all, index, 2);
    } else if (all.includes("+")) {
      const index = all.indexOf("+");
      return this.com(all, index, 3);
    } else if (all.includes("-")) {
      const index = all.indexOf("-");
      return this.com(all, index, 4);
    }
  }

  static com(all, index, operator) {
    const num1 = parseFloat(all[index - 1]);
    const num2 = parseFloat(all[index + 1]);
    let result;
    switch (operator) {
      case 1:
        result = num1 * num2;
        break;
      case 2:
        result = num1 / num2;
        break;
      case 3:
        result = num1 + num2;
        break;
      case 4:
        result = num1 - num2;
        break;
      case 5:
        result = Math.pow(num1, num2);
        break;
    }
    all.splice(index - 1, 3, result);
    return all;
  }

  static displayResult(total, text) {
    if (total.length > 16) {
      total = total.substring(0, 16);
    }
    const [result, input, histories] = this.selectElements();
    result.innerText = text;
    input.innerText = total;
    this.addToHistory(total, text);
  }

  static addToHistory(total, text) {
    const [result, input, histories] = this.selectElements();
    let add = document.createElement("tr");
    add.className = "history-list";
    add.innerHTML = `<td> ${text} = <strong> ${total} </strong> </td>`;
    histories.appendChild(add);
    this.addEvent(add);
    this.clearResult();
  }

  static clearAll() {
    const [result, input, histories] = this.selectElements();
    result.textContent = "";
    input.textContent = "";
  }

  static clearInput() {
    const [result, input, histories] = this.selectElements();
    input.textContent = "";
  }

  static clearResult() {
    const [result, input, histories] = this.selectElements();
    result.textContent = "";
  }

  static restoreHistory(restore) {
    const [result, input, histories] = this.selectElements();
    result.textContent = restore[0];
    input.textContent = "";
  }

  static addEvent(add) {
    add.addEventListener("click", (e) => {
      this.restoreHistory(add.innerText.split("="));
    });
  }

  static square() {
    const [result, input, histories] = this.selectElements();
    if (input.innerText != "") {
      input.innerText = Math.pow(parseFloat(input.innerText), 2);
    }
  }

  static squareRoot() {
    const [result, input, histories] = this.selectElements();
    if (input.innerText != "") {
      input.innerText = Math.sqrt(parseFloat(input.innerText));
    }
  }

  static exponent() {
    const [result, input, histories] = this.selectElements();
    if (input.innerText != "") {
      input.innerText += " ^ ";
    }
  }

  static percent() {
    const [result, input, histories] = this.selectElements();
    if (input.innerText != "") {
      input.innerText = input.innerText / 100;
    }
  }

  static sinCosTan(content) {
    const [result, input, histories] = this.selectElements();
    if (input.innerText != "") {
      switch (content) {
        case "sin":
          input.innerText = Math.sin((input.innerText * Math.PI) / 180);
          break;
        case "cos":
          input.innerText = Math.cos((input.innerText * Math.PI) / 180);
          break;
        case "tan":
          input.innerText = Math.tan((input.innerText * Math.PI) / 180);
          break;
      }
    }
  }

  static roundNumber(content) {
    const [result, input, histories] = this.selectElements();
    if (input.innerText != "") {
      switch (content) {
        case "ceil":
          input.innerText = Math.ceil(input.innerText);
          break;
        case "floor":
          input.innerText = Math.floor(input.innerText);
          break;
        case "rnd":
          input.innerText = Math.round(input.innerText);
          break;
      }
    }
  }

  static parenthesis() {
    const [result, input, histories] = this.selectElements();
    if (input.innerText === "") {
      input.innerText += "(";
    } else {
      if (input.innerText.includes("(")) {
        let text = input.innerText.substring(1, input.innerText.length);
        let all = text.split(" ");
        this.computeParenthesis(all, "");
      } else {
        input.innerText = "(" + input.innerText;
      }
    }
  }

  static computeParenthesis(all, text) {
    if (all.length === 1) {
      const [result, input, histories] = this.selectElements();
      input.innerText = all[0];
      return;
    } else {
      this.computeParenthesis(this.compute(all), text);
    }
  }

  static delete() {
    const [result, input, histories] = this.selectElements();
    input.innerText = input.innerText.substring(0, input.innerText.length - 1);
  }
}

const clear = document.querySelector(".clear");
clear.addEventListener("click", (e) => {
  const histories = document.querySelectorAll(".history-list");
  histories.forEach((history) => history.remove());
});

const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    button.blur();
    const content = button.innerText;
    if (
      content === "+" ||
      content === "-" ||
      content === "/" ||
      content === "*"
    ) {
      UI.addResult(content);
    } else if (content === "=") {
      UI.getResult();
    } else if (content === "C") {
      UI.clearAll();
    } else if (content === "CE") {
      UI.clearInput();
    } else if (content === "sqr") {
      UI.square();
    } else if (content === "sqrt") {
      UI.squareRoot();
    } else if (content === "exp") {
      UI.exponent();
    } else if (content === "%") {
      UI.percent();
    } else if (content === "sin" || content === "cos" || content === "tan") {
      UI.sinCosTan(content);
    } else if (content === "ceil" || content === "floor" || content === "rnd") {
      UI.roundNumber(content);
    } else if (content === "( )") {
      UI.parenthesis();
    } else if (content === "DEL") {
      UI.delete();
    } else {
      UI.addInput(content);
    }
  });
});

//NUMPAD FUNCTION

window.onkeydown = function (ev) {
  var e = ev || window.event,
    key = e.keyCode;
  if (e.location === 3) {
    if (key === 96) UI.addInput(0);
    else if (key === 97) UI.addInput(1);
    else if (key === 98) UI.addInput(2);
    else if (key === 99) UI.addInput(3);
    else if (key === 100) UI.addInput(4);
    else if (key === 101) UI.addInput(5);
    else if (key === 102) UI.addInput(6);
    else if (key === 103) UI.addInput(7);
    else if (key === 104) UI.addInput(8);
    else if (key === 105) UI.addInput(9);
    else if (key === 110) UI.addInput(".");
    else if (key === 106) UI.addResult("*");
    else if (key === 107) UI.addResult("+");
    else if (key === 109) UI.addResult("-");
    else if (key === 111) UI.addResult("/");
    else if (key === 13) UI.getResult();
  }
};
