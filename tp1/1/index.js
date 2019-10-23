const datasets = require("./datasets.json")
const reset = '\x1b[0m'
const bright = '\x1b[1m'

exports = module.exports = {
  name: "Marathon",
  datasets,
  algo: function (input) {
    // YOUR CODE BETWEEN HERE
    let pos = input[0], 
        res = 0;
    for(let i = 1; i < input.length; i++) {
      pos += input[i].split(' ')[0] - input[i].split(' ')[1];
    }
    if(pos <= 100) {
      res += 1000;
    } else if(pos <= 10000) {
      res += 100;
    } else {
      res = 'KO';
    }
    return res;
    // AND HERE
  },
  verify: function (dataset, output) {
    if (dataset.output !== output) {
      throw new Error(`${bright}Got ${output} but expected ${dataset.output}${reset}`)
    } else {
      return true
    }
  }
}