var rpn = {
  exp: "",
  data: [],
  
  calculate: function() {
    this.data = [];
    debugger;
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
        console.log("Undefined operator. Ignoring.");
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
      console.log(err);
    });
  },

  getFileContent: function() {
    return new Promise((resolve, reject) => {
      var inputFileElement = document.getElementById("inputFile");
      const reader = new FileReader();
      var inputFile = inputFileElement.files[0];
      reader.onload = (event) => {
        const res = event.target.result;
        rpn.exp = res;
        resolve();
      }
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
      if (rpn.data.length > 1) {
        console.log("More than one value left in the stack. Not a valid expression.");
        return;
      }
      else{
        console.log("Answer =", rpn.data[0]);
      }      
    }
    else {
      console.log("Unable to upload the file.");
    }
    
  }
};