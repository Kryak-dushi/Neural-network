class Normalizer {
    constructor(data) {
        this.data = data,
            this.normal_data = [],
            this.algorithm = minimax
    }

    setData(data) {
        this.data = data;
    }

    setAlgorithm(alg){
        this.algorithm = alg;
    }

    normalize() {
        this.normal_data = this.algorithm(this.data);
    }

    getNormalValueMinimax(value) {
        const max = Math.max(value, ...this.data);
        const min = Math.min(value, ...this.data);
        return (value - min) / (max - min);
    }
}

function minimax(data, range1, range2) {
    let result = [];

    const max = Math.max(...data);
    const min = Math.min(...data);
    const d1 = (range1 !== undefined) ? range1 : 0;
    const d2 = (range2 !== undefined) ? range2 : 1;

    if (max != min) {
        data.forEach(x => {
            result.push((x - min) * (d2 - d1) / (max - min) + d1);
        })
    }

    return result;
}