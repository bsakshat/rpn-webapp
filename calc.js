var rpn = {
  exp: "",
  data: [],
  undefinedOps: false,
  
  calculate: function() {
    this.data = [];
    this.exp.split(' ').forEach((element) => {
      if (!isNaN(element)) {
        this.data.push(parseInt(element));
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
    rpn.exp = inputExp.value;
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
    debugger;
    return new Promise((resolve, reject) => {
      var inputFileElement = document.getElementById("inputFile");
      const reader = new FileReader();
      var inputFile = inputFileElement.files[0];
      reader.onload = (event) => {
        if (inputFile.type === "text/plain") {
          const res = event.target.result;
          rpn.exp = res;
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
  display: function(error=false) {
    if (!error) {
      console.log(rpn.exp);
      var answer = rpn.data[0];
      if (!(answer === undefined)) {
        if (rpn.undefinedOps) {
          console.log('Undefined operators present in expression ignored.')
        }
        if (rpn.data.length > 1) {
          console.log("More than one value left in the stack. Not a valid expression.");
          return;
        }
        console.log("Answer =", answer);
      }
      else {
        console.log("Invalid Expression");
      }
    }
    else {
      console.log(error);
    }    
  }
};