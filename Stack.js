class Stack {
  constructor() {
    this.data = [];
    this.top = 0;
  }
}

Stack.prototype.push = function(node) {
  this.data.push(node);
  this.top = node;
}

Stack.prototype.pop = function() {
  item = this.data.pop();
  this.top = this.data[this.data.length];
  return item;
}

Stack.prototype.peek = function() {
  return this.data[this.data.length];
}

Stack.prototype.print = function() {
  this.data.forEach((d) => console.log(d));
}