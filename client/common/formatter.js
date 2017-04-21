import moment from 'moment'
export const formatDate = (dateString,newFormat)=>
{
    let _date = moment.utc(dateString,"DD-MMM-YYYY HH:mm")
    return _date.format(newFormat)
}
export const isBeforeOrEqual = (dateString1,dateString2,format)=>
{
    let _date1 = parseDateString(dateString1,format);
    let _date2 = parseDateString(dateString2,format);
    return _date1<=_date2;
}


export const isAfter = (dateString1,dateString2,format)=>
{
    let _date1 = parseDateString(dateString1,format);
    let _date2 = parseDateString(dateString2,format);

    return _date1>_date2;
}

export const toDateString = (date,newFormat)=>
{
    let _date = moment(date);
    return _date.format(newFormat)
}

export const parseDateString = (dateString,newFormat)=>
{
    let _date = moment.utc(dateString, newFormat||"DD-MMM-YYYY")
    return _date.toDate()
}
export const parseDateStringNonUTC = (dateString,newFormat)=>
{
    let _date = moment(dateString, newFormat||"DD-MMM-YYYY")
    return _date.toDate()
}

export const timeSince = (date_string)=>{
    let _date = parseDateString(date_string,"DD-MMM-YYYY HH:mm");
    let seconds = Math.floor((new Date() - _date) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
        return interval + " year"+(interval==1?"":"s")+ " ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >=1) {
        return interval + " month"+(interval==1?"":"s")+ " ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >=1) {
        return interval + " day"+(interval==1?"":"s")+ " ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval + " hour"+(interval==1?"":"s")+ " ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval + " minute"+(interval==1?"":"s")+ " ago";
    }
    return Math.floor(seconds) + " seconds";
};

export const displayTimeStrFromNow = (timeStr) => {
    let _time = parseDateString(timeStr,"DD-MMM-YYYY HH:mm");
    let seconds = Math.floor((new Date() - _time) / 1000);
    let interval = Math.floor(seconds / 86400);
    if (interval > 30)  {
        return moment(_time).format("MMM DD");
    }
    if (interval >= 1) {
        return interval + "d";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        if(interval ==1)
            return interval + "hr";
        else
            return interval + "hrs";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        if(interval ==1)
            return interval + "min";
        else
            return interval + "mins";
    }
    return "now";
};

export const formatLocalDate = (dateString,newFormat)=>
{
    let _date = moment.utc(dateString,"DD-MMM-YYYY HH:mm").local();
    return _date.format(newFormat)
}
