import {SubmissionError} from 'redux-form'
import Notification from './notifications'
const error_dict= {
    "CODE_SUCCESS": 'success',
    "ERR_GENERAL": 'An error has occurred while processing your request.',
    "ERR_CREATE_OBJ": 'ERR_CREATE_OBJ',
    "ERR_OBJ_EXIST": 'ERR_OBJ_EXIST',
    "ERR_OBJ_NOT_EXIST":  'ERR_OBJ_NOT_EXIST',
    "ERR_NOT_ALLOWED" : 'ERR_NOT_ALLOWED',
    "ERR_INVALID_PARAMETER": 'ERR_INVALID_PARAMETER',
    "ERR_NO_REQUEST_USER" : 'ERR_NO_REQUEST_USER',
}
export const handleNonFormErrors = (error,dispatch)=>{
    //check if error is of key "error"
    if(error)
    {
        if(error["non_field_errors"]!==undefined)
            Notification.notify_error(dispatch,'Error',error["non_field_errors"]);
        else if (error["exception"]!==undefined && error["exception"])
            Notification.notify_error(dispatch,'Error',map_error(error_dict.ERR_GENERAL));

    }
    else
        Notification.notify_error(dispatch,'Error',map_error(error_dict.ERR_GENERAL));

}
export const handleErrors = (error) =>{
    console.log("handleErrors", error);
    //check if error is of key "error"
    if(error)
    {
        if(error["error"]!==undefined)
            throw new SubmissionError({"_error": error["error"]})
        if (error["exception"]!==undefined && error["exception"])
            throw new SubmissionError({"_error": map_error(error_dict.ERR_GENERAL)})
        else
            throw new SubmissionError(error);
    }
    else
        throw new SubmissionError({"_error": map_error(undefined)})

}

export const map_error = (code)=>{
    let error_code = error_dict[code];
    if(error_code)
        return error_code;
    else
        return error_dict["ERR_GENERAL"];
}