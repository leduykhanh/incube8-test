
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

