import { osUtil } from "util/osUtil";
const { rate, predictWin } = require('openskill')

const TAU = 0

describe("Os Tests", () => {

    test("Clone user and rate", async () => {
        const result = osUtil.cloneAndRate(20, 2, 2, true, TAU)
        expect(result.skill > 20).toBe(true);
        expect(result.uncertainty < 2).toBe(true);

        const lossResult = osUtil.cloneAndRate(20, 2, 2, false, TAU)
        expect(lossResult.skill < 20).toBe(true);
        expect(lossResult.uncertainty < 2).toBe(true);
    });

    test("Clone user and rate multiple", async () => {
        const numMatches = 10
        const mu = 20
        const sigma = 2
        const result = osUtil.cloneAndRateMultiple(mu, sigma, 2, true, numMatches, TAU)


        const lossResult = osUtil.cloneAndRateMultiple(mu, sigma, 2, false, numMatches, TAU)
        expect(result.mu > mu).toBe(true)
        expect(lossResult.mu < mu).toBe(true)

    });

    test("Win probabilities", () => {
        //This data is from this match
        //https://www.beyondallreason.info/replays?gameId=39096966518c40a66b2130b057864aa5
        const t1 = [
            {
                "mu": 24.98,
                "sigma": 7.93
            },
            {
                "mu": 25,
                "sigma": 8.33
            },
            {
                "mu": 21.3,
                "sigma": 5
            },
            {
                "mu": 10.33,
                "sigma": 5
            }
        ]

        const t2 = [
            {
                "mu": 23,
                "sigma": 5.03
            },
            {
                "mu": 16.79,
                "sigma": 5
            },
            {
                "mu": 12.67,
                "sigma": 5
            },
            {
                "mu": 11.58,
                "sigma": 7.08
            }
        ]

        const predictResult = predictWin([t1, t2])
        expect(predictResult).toEqual([0.8288140989240749, 0.17118590107592516])
    })
})