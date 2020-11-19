import { compute } from "../src/compute";
import { Game } from "../src/types";

it("should return 300 on a perfect game", () => {
  const input300: Game = [
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 10, 10],
  ];

  const score = compute(input300);

  expect(score).toBe(300);
});

it("should return 120 on a perfect game", () => {
  const input120: Game = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 10, 10],
  ];

  const score = compute(input120);

  expect(score).toBe(120);
});

it("should return 88 on a perfect game", () => {
  const input88: Game = [
    [5, 0],
    [0, 3],
    [2, 0],
    [10, 0],
    [4, 5],
    [5, 2],
    [10, 0],
    [8, 0],
    [7, 1],
    [9, 0, 0],
  ];

  const score = compute(input88);

  expect(score).toBe(88);
});