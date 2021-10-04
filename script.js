const tabContainer = document.getElementById("tab-container");
let intervalId;
let olderValue;
let flatTypesCount = 1;

const getElement = (id) => document.getElementById(id);
const totalElement = getElement("overall_total");
const newBtn = getElement("new-btn");
const flatTypes = getElement("flat-types");
const flatType = getElement("flat-type");

// hr-interiors-1 hr_interiors-2 are two inputs for different types

// hr -> highrise
// plt -> row-housing
// ex -> builder floors

const totals = {
  hr_interiors_total: {
    element: getElement("hr_interiors_total"),
    value: 0,
    unitCost: 80,
  },
  hr_exterirors_total: {
    element: getElement("hr_exteriors_total"),
    value: 0,
    unitCost: 1,
  },
  hr_indoor_total: {
    element: getElement("hr_indoor_total"),
    value: 0,
    unitCost: 20,
  },
  plt_elevation_total: {
    element: getElement("plt_elevation_total"),
    value: 0,
    unitCost: 100,
  },
  ex_exteriors_total: {
    element: getElement("ex_exteriors_total"),
    value: 0,
    unitCost: 0.5,
  },
};

const tabTotals = {
  hr_total: {
    element: getElement("hr_total"),
    value: 0,
  },
  plt_total: {
    element: getElement("plt_total"),
    value: 0,
  },
  ex_total: {
    element: getElement("ex_total"),
    value: 0,
  },
};
const inputs = [
  {
    id: "hr_interiors_1",
    element: getElement("hr_interiors_1"),
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

const updateTotals = () => {
  let hr_interiors_total = 0;
  Object.keys(inputValues).forEach((key) => {
    // console.log(key);
    value = inputValues[key];

    if (key.includes("hr_interiors")) {
      if (Number.isNaN(value)) value = 0;
      hr_interiors_total += value;
    } else {
      if (Number.isNaN(value)) value = 0;
      totals[`${key}_total`].value = value * totals[`${key}_total`].unitCost;
      totals[`${key}_total`].element.innerHTML =
        value * totals[`${key}_total`].unitCost + " &#x20b9;";
    }

    // console.log(totals[`${key}_total`]);
  });

  hr_interiors_total *= totals["hr_interiors_total"].unitCost;
  totals["hr_interiors_total"].value = hr_interiors_total;
  totals[
    "hr_interiors_total"
  ].element.innerHTML = `${hr_interiors_total}  &#x20b9; `;
};

const updateTabsTotal = () => {
  tabTotals["hr_total"].value =
    totals["hr_exterirors_total"].value +
    totals["hr_indoor_total"].value +
    totals["hr_interiors_total"].value;
  tabTotals["plt_total"].value = totals["plt_elevation_total"].value;
  tabTotals["ex_total"].value = totals["ex_exteriors_total"].value;

  Object.keys(tabTotals).forEach(
    (key) =>
      (tabTotals[key].element.innerHTML = tabTotals[key].value + " &#x20b9;")
  );
};

const updateOverAllTotal = () => {
  let total = 0;
  Object.keys(totals).forEach((key) => {
    value = totals[key].value;
    if (!Number.isNaN(value)) total += value;
  });

  totalElement.innerHTML = total + " &#x20b9;";
};
const handleInputValueChange = () => {
  updateTotals();
  updateTabsTotal();
  updateOverAllTotal();
};

const onInputFocusIn = (input) => {
  olderValue = NaN;
  intervalId = setInterval(() => {
    let value = input.element.value;
    if (value != olderValue) {
      inputValues[input.id] = parseInt(value);
      olderValue = value;
      handleInputValueChange();
    }
  }, 100);
};

const addNewFlatType = () => {
  let clone = flatType.cloneNode(true);
  let flatTypesInputs = clone.getElementsByTagName("input");
  let newTitle = clone.getElementsByClassName("flat-type-title")[0];
  let newInput = flatTypesInputs[0];

  flatTypesCount++;
  let newId = `hr_interiors_${flatTypesCount}`;
  inputs.push({
    id: newId,
    element: newInput,
  });
  newInput.id = newId;
  newInput.value = "";
  newTitle.innerHTML = `Flat Type ${flatTypesCount}`;
  flatTypes.append(clone);
  addListenersForInputs();
};

tabContainer.addEventListener("click", onTabSelect);

const addListenersForInputs = () => {
  inputs.forEach((input) => {
    input.element.addEventListener("focusin", () => onInputFocusIn(input));
    input.element.addEventListener("focusout", () => clearInterval(intervalId));
  });
};

addListenersForInputs();

newBtn.addEventListener("click", addNewFlatType);
