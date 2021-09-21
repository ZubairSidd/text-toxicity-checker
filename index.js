let model;

const startButton = document.querySelector("#startButton");
const checkButton = document.querySelector("#checkButton");
const inputText = document.querySelector("#inputText");
const output = document.querySelector(".output");
const modelSection = document.querySelector(".modelSection");
const loading = document.querySelector(".loading");
const predictionLoading = document.querySelector(".predictionLoading");
const loadModel = async () => {
  model = await toxicity.load();
  console.dir(model);
  hide(loading);
  show(modelSection);
};
const getPrediction = async (text) => {
  show(predictionLoading);
  hide(output);
  checkButton.disabled = true;
  let prediction = await model.classify(text);
  const toxicPredictions = prediction.filter((p) => p.results[0].match);
  // console.log();
  if (toxicPredictions[0]) {
    output.innerText = `It is a Toxic Text`;
  } else {
    output.innerText = `It is not Toxic`;
  }
  hide(predictionLoading);
  show(output);
  checkButton.disabled = false;
};
const startButtonHandler = () => {
  show(loading);
  startButton.classList.add("hide");
  loadModel();
};

const checkButtonHandler = () => {
  let text = inputText.value;
  if (text) {
    getPrediction(text);
  }
};

const show = (item) => {
  item.classList.add("show");
  item.classList.remove("hide");
};
const hide = (item) => {
  item.classList.remove("show");
  item.classList.add("hide");
};
checkButton.addEventListener("click", checkButtonHandler);
startButton.addEventListener("click", startButtonHandler);
