export const en = [
  "Detect scene",
  "Open Setting File",
  "Open Video",
  "Relunch Sheer",
];
export const relate = ["Video", "Setting", "Video", "Application"];
export const relatedistribution = {
  Application: [3],
  Setting: [1],
  Video: [0, 2],
};
export const movtiondistribution = [
  { Detect: 1, start: 0, end: 0 },
  { Open: 2, start: 1, end: 2 },
  { Relunch: 1, start: 3, end: 3 },
];
export const objectdistribution = {
  scene: [0],
  "Setting File": [1],
  Video: [2],
  Sheer: [3],
};
