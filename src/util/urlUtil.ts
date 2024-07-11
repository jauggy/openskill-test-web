function getReplayId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    //Will return empty string if doesn't exist
    return urlParams.get('replay')
}

export const urlUtil = {
    getReplayId: getReplayId
}