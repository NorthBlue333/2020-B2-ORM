const datasets = require("./datasets.json")
const reset = '\x1b[0m'
const bright = '\x1b[1m'

exports = module.exports = {
  name: "Déménagement",
  datasets,
  algo: function (input) {
    // YOUR CODE BETWEEN HERE
    let ways = 1,
        current_weight = 0;
    for(let i = 1; i < input.length; i++) {
      if(current_weight + input[i] <= 100) {
        current_weight += input[i];
      } else {
        current_weight = input[i];
        ways += 1;
      }
    }
    return ways;
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