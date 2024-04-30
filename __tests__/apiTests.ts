import { replayUtil } from "src/util/replayUtil";

describe("Sample Tests", () => {




    test("Get replayId", async () => {
        const replayUrl = "https://www.beyondallreason.info/replays?gameId=2c71ca6504f9e3b5a02732d0fbdcb5bc"
        const id = replayUtil.getReplayId(replayUrl);
        expect(id).toEqual("2c71ca6504f9e3b5a02732d0fbdcb5bc")
    });

    test("Get alt replay id", async () => {
        const replayUrl = "https://bar-rts.com/replays/677a2c66efad6a72cf2215b31251d50c"
        const id = replayUtil.getReplayId(replayUrl);
        console.log(id)
        expect(id).toEqual("677a2c66efad6a72cf2215b31251d50c")
    });
})