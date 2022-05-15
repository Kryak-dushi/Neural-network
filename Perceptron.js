let perceptron;

let data;
const form = document.getElementById("form");
const file = document.getElementById("file");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = file.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const text = e.target.result;
        data = csvToArray(text);
        start();
    };
    reader.readAsText(input);
});

let testdata;
const formm = document.getElementById("test");
const filee = document.getElementById("testfile");

formm.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = filee.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const text = e.target.result;
        testdata = csvToArray(text);
        test();
    };
    reader.readAsText(input);
});

class Perceptron {
    constructor() {
        this.learlingRate = 0.1,
            this.inputLayer = [],
            this.hiddenLayer = [],
            this.outputLayer
    }

    create(inputs, hcount) {
        const normalizer = new Normalizer(inputs);
        normalizer.normalize();
        let data = normalizer.normal_data;

        for (let i = 0; i < data.length; i++) {
            let neuron = new Neuron([data[i]]);
            neuron.setRandomWeights(hcount);
            neuron.sum = data[i];
            neuron.calcOutput();
            this.inputLayer.push(neuron)
        }

        let input = [];

        for (let i = 0; i < hcount; i++) {
            for (let j = 0; j < this.inputLayer.length; j++) {
                input.push(this.inputLayer[j].output);
            }

            let neuron = new Neuron(input);
            neuron.setRandomWeights(1);
            neuron.calcSum(this.inputLayer, i);
            neuron.calcOutput();
            this.hiddenLayer.push(neuron);
        }

        input = [];

        for (let i = 0; i < this.hiddenLayer.length; i++) {
            input.push(this.hiddenLayer[i].output);
        }

        this.outputLayer = new Neuron(input);
        this.outputLayer.setRandomWeights(1);
        this.outputLayer.calcSum(this.hiddenLayer, 0);
        this.outputLayer.calcOutput();
    }

    setInputs(inputs) {
        const normalizer = new Normalizer(inputs);
        normalizer.normalize();
        let data = normalizer.normal_data;

        for (let i = 0; i < this.inputLayer.length; i++) {
            this.inputLayer[i].setInputs([data[i]]);
            this.inputLayer[i].sum = data[i];
            this.inputLayer[i].calcOutput();
        }

        let input = [];

        for (let i = 0; i < this.hiddenLayer.length; i++) {
            for (let j = 0; j < this.inputLayer.length; j++) {
                input.push(this.inputLayer[j].output);
            }

            this.hiddenLayer[i].setInputs(input);
            this.hiddenLayer[i].calcSum(this.inputLayer, i);
            this.hiddenLayer[i].calcOutput();
            input = [];
        }

        input = [];

        for (let i = 0; i < this.hiddenLayer.length; i++) {
            input.push(this.hiddenLayer[i].output);
        }

        this.outputLayer.setInputs(input);
        this.outputLayer.calcSum(this.hiddenLayer, 0);
        this.outputLayer.calcOutput();
    }

    train(data) {
        this.setInputs(data.slice(0, 10));
        const error = this.outputLayer.output - data[10];
        const sigmas = [[], []];

        for (let i = 0; i < this.hiddenLayer.length; i++) {
            sigmas[1].push(this.hiddenLayer[i].weights[0] * error);
        }

        for (let i = 0; i < this.inputLayer.length; i++) {
            let sig = 0;
            for (let j = 0; j < this.hiddenLayer.length; j++) {
                sig += this.inputLayer[i].weights[j] * sigmas[1][j];
            }
            sigmas[0].push(sig);
        }

        for (let i = 0; i < this.inputLayer.length; i++) {
            for (let j = 0; j < this.hiddenLayer.length; j++) {
                this.inputLayer[i].weights[j] += this.learlingRate * sigmas[0][i] * sigmaDerivative(this.inputLayer[i].output) * this.inputLayer[i].output;
            }
        }

        for (let i = 0; i < this.hiddenLayer.length; i++) {
            this.hiddenLayer[i].weights[0] += this.learlingRate * sigmas[0][i] * sigmaDerivative(this.inputLayer[i].output) * this.hiddenLayer[i].output;
        }
    }

    getOutput() {
        return this.outputLayer.output;
    }
}

function sigmaDerivative(x) {
    const sig = sigma(x);
    return sig * (1 - sig);
}

function start() {
    perceptron = new Perceptron();
    console.log(perceptron);
    perceptron.create(data[0].slice(0, 10), 5);

    data.forEach(item => {
        if (item != undefined) {
            perceptron.train(item);
            //console.log(perceptron);
        }
    })
}

function test() {
    for (let i = 0; i < 40; i++) {
        perceptron.setInputs(testdata[i].slice(0, 10));
        console.log(perceptron.outputLayer.output);
    }
}
