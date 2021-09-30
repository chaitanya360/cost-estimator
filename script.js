const tabContainer = document.getElementById("tab-container");
let intervalId;
let olderValue;

const getElement = (id) => document.getElementById(id);
const totalElement = getElement("overall_total");

const inputs = [
  {
    id: "hr_interiors",
    element: getElement("hr_interiors"),
  },

  {
    id: "hr_exterirors",
    element: getElement("hr_exteriors"),
  },

  {
    id: "hr_indoor",
    element: getElement("hr_indoor"),
  },
  {
    id: "plt_elevation",
    element: getElement("plt_elevation"),
  },
  {
    id: "ex_exteriors",
    element: getElement("ex_exteriors"),
  },
];

const inputValues = {
  ex_exteriors: 0,
  hr_exterirors: 0,
  hr_interiors: 0,
  hr_indoor: 0,
  plt_elevation: 0,
};

const tab0 = {
  id: "tab0",
  tabHeader: getElement("tab0"),
  body: getElement("tab0-body"),
};
const tab1 = {
  id: "tab1",
  tabHeader: getElement("tab1"),
  body: getElement("tab1-body"),
};
const tab2 = {
  id: "tab2",
  tabHeader: getElement("tab2"),
  body: getElement("tab2-body"),
};

const tabs = [tab0, tab1, tab2];

const selectedTabIndex = 0;

const handleTabClicked = (clickedTabId) => {
  tabs.forEach((tab) => {
    if (tab.id == clickedTabId) {
      tab.tabHeader.className = "tab tab-active";
      tab.body.className = "tab-body tab-body-active";
    } else {
      tab.tabHeader.className = "tab";
      tab.body.className = "tab-body";
    }
  });
};

const onTabSelect = (e) => {
  const clickedTabId = e.target.id;
  handleTabClicked(clickedTabId);
};

const handleInputValueChange = () => {
  console.log(inputValues);
  let total = 0;
  Object.keys(inputValues).forEach((key, idx) => {
    value = inputValues[key];
    if (!Number.isNaN(value)) total += value;
  });

  totalElement.innerHTML = total + " &#x20b9;";
};

const onInputFocusIn = (input) => {
  console.log(input.id);

  intervalId = setInterval(() => {
    let value = input.element.value;
    if (value != olderValue) {
      inputValues[input.id] = parseInt(value);
      olderValue = value;
      handleInputValueChange();
    }
  }, 100);
};

tabContainer.addEventListener("click", onTabSelect);
console.log(inputs[0].element);

inputs.forEach((input) => {
  input.element.addEventListener("focusin", () => onInputFocusIn(input));
  input.element.addEventListener("focusout", () => clearInterval(intervalId));
});
