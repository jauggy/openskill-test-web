import * as apiService from './apiService';
import { ReplayResponse } from './types';
const test = async () => {
    return getReplay("773cd06548c8c81e36fc964e1df43f6a");
}

async function getReplay(replayId:string){
       //The url should be something like:
    //https://aws.revolutionsoftware.com.au:446/
    let url;
    url = `https://api.bar-rts.com`


    apiService.setBaseUrl(url)
    try {
        const response = await apiService.get(`/replays/${replayId}`)

        const result = response.data as ReplayResponse;
        if (result) {
            return result;
        } else {
            console.error(result);
        }

    } catch (err: any) {


        return null;

    } 
}

export const replayService = {
    test: test,
    getReplay:getReplay
}