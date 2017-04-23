
export const prepare_url_params = (url,params)=>{
    let final_url = url;
    if(params)
    {
        let params_arr=[];
        for(let v of Object.keys(params))
        {
            params_arr = params_arr.concat(v+"="+params[v]);
        }
        final_url +="?"+params_arr.join("&");
    }
    return final_url;

}

export const getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d.toFixed(1);
}

export const deg2rad = (deg) => {
  return deg * (Math.PI/180)
}