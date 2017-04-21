
export const required = value =>{
    let error  =  value && value!="" ? undefined : 'Required';
    return error;
}
export const isUrl = value =>{
    if(value && value !="")
    {
        var res = (value+'').match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if(res == null)
            return "Not a valid URL";
        else
            return undefined;
    }
    return undefined;

}
export const corporate_email = value =>{
     if(/@(outlook|yahoo|mail|aol|zoho|yandex|protonmail|gmx|qq|163)\.[a-zA-Z]+$/i.test(value))
        {
            return "Please use a corporate email account.";
        }
     return undefined;
}

export const required_if_creator = (other_condition) =>{

    return (value,allValues)=>{
        if(!other_condition(allValues))//validate only if the other condition is successful.
            return value ? undefined : 'Required';
        else
            return undefined;
    }

}

export const addErrorIfFound = (value,validateFunc,errorObject,attribute)=>
{
    let error_msg = validateFunc(value);
    if(error_msg)
    {
        errorObject[attribute] = error_msg;
        return errorObject;
    }
    else
        return false;

}
export const isImage = value=>{

    // if(value)
    // {
    //     let extension = value.name.match(/\.[^/.]+$/);
    //         extension = (extension+'').replace(/\./,'').toLowerCase();
    //
    //         if(extension != "png" || extension !='jpeg' || extension !='jpg')
    //             return "Only PNG and JPEG are supported";
    //         else
    //             return undefined;
    // }
    return undefined;

}
export const isTelephone = value =>{

    if(!/^\d+[ ]{0,1}[-\(\)\d]+/.test(value))
     {
        return "Required";
     }

  return undefined;
}


export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined

export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

export const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined

export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i.test(value) ?
  'Invalid email address' : undefined

