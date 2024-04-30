


function getReplayId(url: string) {
    try {
        const regex = /gameId=(.+\b)/gm
        const found = regex.exec(url)

        if (found?.length > 0) {
            return ((found[1]));

        } else {
            const regex2 = /replays\/([A-Za-z\d]+)$/gm
            const found2 = regex2.exec(url)
            return ((found2[1]));
        }

    } catch {
        return null;
    }

}

export const replayUtil = {

    getReplayId: getReplayId
}