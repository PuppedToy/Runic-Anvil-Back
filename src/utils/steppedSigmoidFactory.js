// steps is an array of elements like this one: [[0, 0], [1, 0.2], [4, 0.5], [10, 0.7], [30, 0.9]]
// sigmoidFactory creates a function that emulates the given steps assuming one integer as input
// In the given example, f(x) would be:
// f(-5) = 0
// f(-4) = 0
// f(-3) = 0
// f(-2) = 0
// f(-1) = 0
// f(0) = 0
// f(1) = 0.2
// f(2) = 0.3
// f(3) = 0.4
// f(4) = 0.5
// f(5) = 0.5333333333333333
// f(6) = 0.5666666666666667
// f(7) = 0.6
// f(8) = 0.6333333333333333
// f(9) = 0.6666666666666666
// f(10) = 0.7
// f(11) = 0.71
// f(12) = 0.72
// f(13) = 0.73
// f(14) = 0.74
// f(15) = 0.75
// f(16) = 0.76
// f(17) = 0.77
// f(18) = 0.78
// f(19) = 0.79
// f(20) = 0.8
// f(21) = 0.81
// f(22) = 0.8200000000000001
// f(23) = 0.8300000000000001
// f(24) = 0.84
// f(25) = 0.85
// f(26) = 0.86
// f(27) = 0.87
// f(28) = 0.88
// f(29) = 0.89
// f(30) = 0.9
// f(31) = 0.9
// f(32) = 0.9
// f(33) = 0.9
// f(34) = 0.9
function steppedSigmoidFactory(steps) {
  // If there are less than 2 steps, return a constant function
  if (steps.length < 2) return () => steps[0][1];

  const methods = [
    [
      steps[0][0],
      () => steps[0][1],
    ],
  ];
  for (let stepIndex = 1; stepIndex < steps.length - 1; stepIndex += 1) {
    const minInput = steps[stepIndex][0];
    const maxInput = steps[stepIndex + 1][0];
    const minOutput = steps[stepIndex][1];
    const maxOutput = steps[stepIndex + 1][1];
    const slope = (maxOutput - minOutput) / (maxInput - minInput);

    methods.push([
      steps[stepIndex][0],
      (number) => minOutput + slope * (number - minInput),
    ]);
  }

  methods.push([
    steps[steps.length - 1][0],
    () => steps[steps.length - 1][1],
  ]);

  return (number) => {
    for (let i = 0; i < methods.length - 1; i += 1) {
      if (number < methods[i + 1][0]) {
        return methods[i][1](number);
      }
    }
    return methods[methods.length - 1][1](number);
  };
}

module.exports = steppedSigmoidFactory;
