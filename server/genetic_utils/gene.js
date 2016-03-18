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

    mutate(p = 0.02) {
        if(Math.random() < p) {
            let newPossibles = this.possibleValues.filter(val => (val != this.value));
            this.value = newPossibles[Math.floor(Math.random() * newPossibles.length)];
        }
    }
}