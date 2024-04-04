import { osUtil } from "util/osUtil"
import { fakeTeams } from "./helpers/fakeTeams"

describe("Util Tests", () => {




    test("Assign changes", async () => {
        const fakeData = fakeTeams
        const newTeams = osUtil.assignNewRatings(fakeData)

        expect(newTeams[0].players[0].newRating == null).toBe(true)
        expect(newTeams[0].players[0].skill > 53.86).toBe(true)

    })
})