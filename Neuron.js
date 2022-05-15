class Neuron {
    constructor(inputs) {
        this.activationFuncton = sigma,
            this.inputs = inputs,
            this.weights = [],
            this.sum = 0,
            this.output = 0
    }

    setActivationFunction(activationFunc) {
        this.activationFuncton = activationFunc;
    }

    setRandomWeights(count) {
        for (let i = 0; i < count; i++) {
            this.weights.push(random(-1, 1));
        }
    }

    calcSum(prevLayer, index) {
        for (let i = 0; i < prevLayer.length; i++) {
            this.sum += prevLayer[i].weights[index] * this.inputs[i];
        }
    }

    calcOutput() {
        if (this.activationFuncton) {
            this.output = this.activationFuncton(this.sum);
        }
    }

    setInputs(inputs) {
        this.inputs = inputs;
    }
}

function sigma(x) {
    return 1 / (1 + Math.pow(Math.E, -x));
}

function random(min, max) {
    return min + Math.random() * (max + 1 - min);
}
