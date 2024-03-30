


function getReplayId(url: string) {
    try {
        const regex = /gameId=(.+\b)/gm
        const found = regex.exec(url)

        return ((found[1]));
    } catch {
        return null;
    }

}

export const replayUtil = {

    getReplayId: getReplayId
}