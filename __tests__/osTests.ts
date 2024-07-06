import { osUtil } from "util/osUtil";

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
})