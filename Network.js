/*let data;
const form = document.getElementById("form");
const file = document.getElementById("file");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = file.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const text = e.target.result;
        data = csvToArray(text);
        createPerceptron();
    };

    reader.readAsText(input);
});

class Network {
    constructor() {
        this.inputLayer = [],
            this.hiddenLayer = [],
            this.outputLayer = []
    }

    init(inputs, hlcount, olcount) {
        let outputs = [];

        inputs.forEach(input => {
            addNeuron(this.inputLayer, input);
        })
        outputs = getOutputs(this.inputLayer);
        console.log(outputs);
        for (let i = 0; i < hlcount; i++) {
            addNeuron(this.hiddenLayer, outputs);
        }
        outputs = getOutputs(this.hiddenLayer);

        for (let i = 0; i < olcount; i++) {
            addNeuron(this.outputLayer, outputs);
        }
    }
}

function addNeuron(layer, input) {
    const neuron = new NeuronTest(input);
    neuron.init();
    layer.push(neuron);
}

function getOutputs(layer) {
    const outputs = [];
    layer.forEach(neuron => { outputs.push(neuron.output); })
    return outputs;
}

function createPerceptron() {
    let perceptron = new Perceptron();
    let input = [];
    input.push(data[0].slice(0, 10));
    perceptron.init(input, 5, 3);
    console.log(perceptron);
}*/
