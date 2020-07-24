var rpn = {
  exp: "",
  answer: "",

  setExpression: function(exp) {
    this.exp = exp;
  },
  
  calculate: function() {

  }

};

var handlers = {
  calculateExp: function() {
    let inputExp = document.getElementById("inputExpression");
    rpn.setExpression(inputExp.value);
    inputExp.value = "";
    rpn.calculate();
    view.display();
  },

  calculateFile: function() {
    debugger;
    this.getFileContent().then(view.display());
  },

  getFileContent: function() {
    return new Promise((resolve, reject) => {
      var inputFileElement = document.getElementById("inputFile");
      const reader = new FileReader();
      var inputFile = inputFileElement.files[0];
      reader.onload = (event) => {
        const res = event.target.result;
        rpn.setExpression(res);
        resolve(res);
      }
      reader.readAsText(inputFile);
      reader.onerror = (e) => {
        console.log(e);
        reject('Unable to load the file.');
      };     
    });    
  }
};

var view = {
  display: function(error=false) {
    if (!error) {
      console.log(rpn.exp);
    }
    else {
      console.log("Unable to upload the file.");
    }
    
  }
};