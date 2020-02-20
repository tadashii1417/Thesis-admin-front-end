export function removeUndefined(values) {
    return values.filter(val => val !== undefined);
}

export function removeIdNewChoices(choices) {
    for(let choice of choices){
        delete choice.id;
    }
}

export function removeNullId(choices) {
    for(let choice of choices){
        console.log(choice);
        if(choice.id === null) {
            delete choice.id;
        }
    }
}