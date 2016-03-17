export default class Gene {
    constructor(possibleValues, value = null) {
        this.possibleValues = possibleValues;

        if(value) {
            this.value = value;
        } else {
            let idx = Math.floor(Math.random() * this.possibleValues.length)
            this.value = possibleValues[idx];
        }
    }

    getValue() {
        return this.value;
    }
}