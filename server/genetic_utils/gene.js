export default class Gene {
    constructor(possibleValues) {
        this.possibleValues = possibleValues;

        let idx = Math.floor(Math.random() * this.possibleValues.length)
        this.value = possibleValues[idx];
    }

    getValue() {
        return this.value;
    }
}