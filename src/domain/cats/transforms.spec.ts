import { transformVotesByImageIdAndTally } from "./transforms";
import { Votes } from "./types";

describe("transformVotesByImageIdAndTally", () => {
  it("should return an empty object when given an empty array", () => {
    const votes: Votes[] = [];
    const result = transformVotesByImageIdAndTally(votes);
    expect(result).toEqual({});
  });

  it("should correctly tally votes for a single image with positive votes", () => {
    const votes: Votes[] = [
      { id: 1, image: { id: "img1" }, value: 1 },
      { id: 2, image: { id: "img1" }, value: 1 },
    ];
    const result = transformVotesByImageIdAndTally(votes);
    expect(result).toEqual({
      img1: 2,
    });
  });

  it("should correctly tally votes for a single image with mixed votes", () => {
    const votes: Votes[] = [
      { id: 1, image: { id: "img1" }, value: 1 },
      { id: 2, image: { id: "img1" }, value: -1 },
      { id: 3, image: { id: "img1" }, value: 1 },
    ];
    const result = transformVotesByImageIdAndTally(votes);
    expect(result).toEqual({
      img1: 1, // 1 + (-1) + 1 = 1
    });
  });

  it("should handle multiple images with different vote counts", () => {
    const votes: Votes[] = [
      { id: 1, image: { id: "img1" }, value: 1 },
      { id: 2, image: { id: "img2" }, value: 1 },
      { id: 3, image: { id: "img1" }, value: -1 },
      { id: 4, image: { id: "img2" }, value: 1 },
    ];
    const result = transformVotesByImageIdAndTally(votes);
    expect(result).toEqual({
      img1: 0, // 1 + (-1) = 0
      img2: 2, // 1 + 1 = 2
    });
  });

  it("should handle votes with only negative values", () => {
    const votes: Votes[] = [
      { id: 1, image: { id: "img1" }, value: -1 },
      { id: 2, image: { id: "img1" }, value: -1 },
    ];
    const result = transformVotesByImageIdAndTally(votes);
    expect(result).toEqual({
      img1: -2, // (-1) + (-1) = -2
    });
  });

  it("should correctly tally votes when multiple images are present", () => {
    const votes: Votes[] = [
      { id: 1, image: { id: "img1" }, value: 1 },
      { id: 2, image: { id: "img2" }, value: -1 },
      { id: 3, image: { id: "img1" }, value: 1 },
      { id: 4, image: { id: "img2" }, value: 1 },
    ];
    const result = transformVotesByImageIdAndTally(votes);
    expect(result).toEqual({
      img1: 2, // 1 + 1 = 2
      img2: 0, // -1 + 1 = 0
    });
  });
});
