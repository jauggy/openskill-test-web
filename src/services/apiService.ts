import axios1 from 'axios';
import { showBottomMessage } from 'src/util/bottomMessageUtil';
import { dispatchIsBusy } from 'src/util/busyUtil';

const axios = axios1.create();

//If you set this value it will cause problems because it will send the same request before server finishes processing
//Some requests make take a long time.
axios.defaults.timeout = 0;



let retryAttempts = 0;

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    dispatchIsBusy(true);
    return config;

}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});



// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    retryAttempts = 0;


    console.log("apiService response received")
    dispatchIsBusy(false);

    return response;
}, function (error) {
    dispatchIsBusy(false);
    const status = error.request.status
    console.log("Axios error", error);
    console.log("Status", status)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (status === 500 || status === 504) {
        //Need to log
        showBottomMessage(`API ${status} Error`, 'error')
    } else {
        if (status) {
            const message = `API ${status} Error`
            console.log(message);
            showBottomMessage(message, 'error');
        } else {
            const message = `API Error: ${error.message}`
            console.log(message);

            showBottomMessage(message, 'error');
        }


    }
    return {
        data: null
    };
});


export const post = async (url: string, payload: any) => {

    console.log("apiService post", axios.defaults.baseURL + url);

    const axiosOptions = {
        method: 'post',
        url: url,
        headers: getHeaders(),
        data: payload
    }

    const response = await axios(axiosOptions);
    //console.log("apiService Response.data", response.data);
    return response;
}

/**
 * 
 * @param url prepend trailing slash to the url
 */
export const get = async (url: string) => {
    const config = getAxiosConfig();

    const response = await axios.get(url, config);

    return response;


}

export const test500Error = async () => {
    try {
        const payload = {
            answer_part: "balh",
            category: "single_choice"
        }
        return await post("http://httpstat.us/500", payload);
    } catch {

    }

}

export const patch = async (url: string, payload: any) => {
    console.log("apiService patch", url);
    const config = getAxiosConfig();

    try {
        const response = await axios.patch(url, config);
        console.log("apiService response.data", response.data);
        return response;
    } catch (exception) {
        console.log("Exception", exception);
    }

}

export const setBaseUrl = (url) => {
    axios.defaults.baseURL = url;
}


const getAxiosConfig = () => {


    return {
        headers: getHeaders()
    }
}

const getHeaders = () => {


    return {
        'Content-Type': 'application/json'

    }
}


