var rpn = {
  exp: "",
  data: [],
  undefinedOps: false,
  
  calculate: function() {
    debugger;
    this.data = [];
    this.exp.split(' ').forEach((element) => {
      if (!isNaN(element)) {
        this.data.push(parseFloat(element));
      }
      else if (/^[+*/-]$/g.test(element)) {
        var item1 = this.data.pop();
        var item2 = this.data.pop();
        if (element === '+') {
          var result = (item1 + item2);
          this.data.push(result);
        }
        else if (element === '-') {
          var result = (item2 - item1);
          this.data.push(result);
        }
        else if (element === '*') {
          var result = (item2 * item1);
          this.data.push(result);
        }
        else if (element === '/') {
          var result = (item2 / item1);
          this.data.push(result);
        }
      }
      else {
        if (!this.undefinedOps) {
          this.undefinedOps = true;
        }
      }
    });
  }
};


var handlers = {
  calculateExp: function() {
    let inputExp = document.getElementById("inputExpression");
    rpn.exp = inputExp.value.trim();
    inputExp.value = "";
    rpn.calculate();
    view.display();
  },

  calculateFile: function() {
    this.getFileContent().then(function() {
      rpn.calculate();
      view.display();
    }, function(err) {
      view.display(err);
    });
  },

  getFileContent: function() {
    return new Promise((resolve, reject) => {
      var inputFileElement = document.getElementById("inputFile");
      const reader = new FileReader();
      var inputFile = inputFileElement.files[0];
      reader.onload = (event) => {
        if (inputFile.type === "text/plain") {
          const res = event.target.result;
          rpn.exp = res.trim();
          resolve();
        }
        else {
          reject('Not a text file. Unable to load.');
        }        
      };
      reader.readAsText(inputFile);
      reader.onerror = (e) => {
        reject('Unable to load the file.');
      };               
    });    
  }
};


var view = {
  inputDiv: '',
  inputView: '',

  display: function(error=false) {
    debugger;
    this.inputDiv = document.getElementById("input");
    this.inputView = this.inputDiv.cloneNode(true);
    this.inputDiv.innerHTML = "";
    if (!error) {
      var answer = rpn.data[0];
      if (!(answer === undefined || rpn.exp === '')) {
        if (rpn.undefinedOps) {
          this.inputDiv.innerHTML += "Undefined operators present in expression ignored.";
        }
        if (rpn.data.length > 1) {
          this.inputDiv.appendChild(this.createLineElement("More than one value left in the stack. Not a valid expression."));
          return;
        }
        this.inputDiv.appendChild(this.createLineElement("Answer", answer));
      }
      else {
        this.inputDiv.appendChild(this.createLineElement("Invalid Expression"));
      }
    }
    else {
      this.inputDiv.appendChild(this.createLineElement(error));
    }    
  },

  createLineElement: function(message, answer=false) {
    var divElement = document.createElement('div');
    var lineHeadElement = document.createElement('h4');
    var buttonElement = document.createElement('button');
    if (answer) {
      lineHeadElement.textContent = message + " = " + answer;
    }
    else {
      lineHeadElement.textContent = message;
    }
    buttonElement.textContent = "Calculate another expression.";
    buttonElement.id = "resetButton";  
    buttonElement.onclick = () => view.resetView();  
    divElement.appendChild(lineHeadElement);
    divElement.appendChild(buttonElement);
    return divElement;
  },

  resetView: function() {
    this.inputDiv.replaceWith(this.inputView);
  }
};