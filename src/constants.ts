export const scaleFactor = 4;

export const dialogueData = {
  pc: "This is my computer",
  tv: "This is where I stay lazy",
  bed: "Honk mimimimimi",
  resume: "All these old papers lying around..",
  projects: "Whoa look at all of this!",
  library: "Maybe one day i'll read these",
  exit: "Are you sure we're done here?",
  "cs-degree": "More paper..",
  "sofa-table": "Shall we take a seat?",
};
export const keyBoardSpeed = (): number => {
  if (window.location.origin === "localhost") {
    return 8;
  } else {
    return 5;
  }
};
