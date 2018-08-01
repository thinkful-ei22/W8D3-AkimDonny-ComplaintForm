export const required = value => (value ? undefined : 'Required');
export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';

export const length = value =>{
    if( value.length !== 5 ){

        return 'Tracking Number must be 5 numbers long'
    }
    return undefined
}

export const number = value =>{
    if(isNaN(value)){
        return 'Must Be A Number'

    }
    return undefined
}