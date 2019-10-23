const datasets = require("./datasets.json")
const reset = '\x1b[0m'
const bright = '\x1b[1m'

exports = module.exports = {
  name: "Salle au trésor",
  datasets,
  algo: function (input) {
    // YOUR CODE BETWEEN HERE
    let current_pos = [0, 0],
        coins = [],
        bonus = [],
        final = '';
    console.log(input)
    for(i = 1; i < input.length; i++) {
      for(l = 0; l < input[i].length - 1; l++) {
        if(input[i][l] == '*') {
          bonus += [i, l];
        } else if (input[i][l] == 'o') {
          coins.push([i, l]);
        }
      }
    }
    coins.forEach(function(pos) {
      y = pos[0] - current_pos[0];
      x = pos[1] - current_pos[1];
      if(x > 0) {
        final += '>'.repeat(x);
      } else if (x < 0) {
        final += '<'.repeat(-x);
      }
      if(y > 0) {
        final += 'v'.repeat(y);
      } else if (y < 0) {
        final += '^'.repeat(-y);
      }
      console.log(pos)
      console.log(final)
    });
    // AND HERE
  },
  verify: function (dataset, output) {
    const outputArray = output.split('')
    dataset.input.shift();
    const inputMatrix = dataset.input.map(row => row.split(''))
    let score = 0
    let position = {
      x: 0,
      y: 0
    }
    for (const outputChar of outputArray) {
      switch (outputChar) {
        case 'x':
          const currentChar = inputMatrix[position.y][position.x]
          if (currentChar === 'o') {
            score++
          } else if (currentChar === '*') {
            score = score * 2
          } else {
            throw new Error('Invalid move, nothing to grab !')
          }
          break
        case '>':
          if (!inputMatrix[position.y][position.x + 1]) {
            throw new Error('Invalid move, out of matrix !')
          } else {
            position.x++
          }
          break
        case '<':
          if (!inputMatrix[position.y][position.x - 1]) {
            throw new Error('Invalid move, out of matrix !')
          } else {
            position.x--
          }
          break
        case 'v':
          if (!inputMatrix[position.y + 1][position.x]) {
            throw new Error('Invalid move, out of matrix !')
          } else {
            position.y++
          }
          break
        case '^':
          if (!inputMatrix[position.y - 1][position.x]) {
            throw new Error('Invalid move, out of matrix !')
          } else {
            position.y--
          }
          break
        default:
          throw new Error(`Invalid character ${outputChar} !`)
      }
    }
    if (dataset.output !== score) {
      throw new Error(`${bright}Got ${score} but expected ${dataset.output}${reset}`)
    } else {
      return true
    }
  }
}