import { replayUtil } from "src/util/replayUtil";

describe("Sample Tests", () => {




    test("Get replayId", async () => {
        const replayUrl = "https://www.beyondallreason.info/replays?gameId=2c71ca6504f9e3b5a02732d0fbdcb5bc"
        const id = replayUtil.getReplayId(replayUrl);
        expect(id).toEqual("2c71ca6504f9e3b5a02732d0fbdcb5bc")
    });
})