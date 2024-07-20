class CheckboxList {
  constructor(element) {
    // This would be the element containing a checkboxList target. Accepting this as a constructor parameter allows us
    // to use this for as many lists as we want in a page (implementation inspired by @hotwire/stimulus)
    this.element = element;
    this.checkboxListTarget = this.element.querySelector(
      '[data-checkbox-list-target="checkboxList"]'
    );
    this.checkAllTarget = this.element.querySelector(
      '[data-checkbox-list-target="checkAll"]'
    );
    this.baseName = this.element.dataset.checkboxBaseNameValue || "checkbox";
    this.count = this.element.dataset.checkboxCountValue || 0;
    this.checkAllLabel = this.element.dataset.checkAllLabel || null;

    this.initializeCheckboxes();
  }

  initializeCheckboxes() {
    if (this.checkAllLabel) {
      const checkboxIdentifier = this.checkAllLabel
        .replaceAll(/\w+/g, "_")
        .toLowerCase();
      const wrapper = document.createElement("div");
      const check = this.#makeCheckbox(
        wrapper,
        checkboxIdentifier,
        this.checkAllLabel
      );
      const checkAllToggle = check.querySelector('input[type="checkbox"]');
      checkAllToggle.addEventListener("change", (ev) => {
        const checkboxes = this.element.querySelectorAll(
          'input[type="checkbox"]'
        );
        checkboxes.forEach((check) => (check.checked = ev.target.checked));
      });
      this.checkAllTarget.insertAdjacentElement("beforeend", check);
    }
    for (let i = 0; i < this.count; i++) {
      const checkboxIdentifier = `${this.baseName}_${i + 1}`;
      const labelText = `${this.#capitalize(this.baseName)} ${i + 1}`;
      const wrapper = document.createElement("li");
      const check = this.#makeCheckbox(wrapper, checkboxIdentifier, labelText);
      this.checkboxListTarget.insertAdjacentElement("beforeend", check);
    }
  }

  #makeCheckbox(wrapper, checkboxIdentifier, labelText) {
    wrapper.className = "card__item";

    const label = document.createElement("label");
    label.setAttribute("for", checkboxIdentifier);
    label.textContent = labelText;

    const checkbox = document.createElement("div");
    checkbox.className = "checkbox";

    const nativeCheck = document.createElement("input");
    nativeCheck.type = "checkbox";
    nativeCheck.className = "checkbox__native";
    nativeCheck.id = checkboxIdentifier;
    nativeCheck.name = checkboxIdentifier;

    const checkDisplay = document.createElement("div");
    checkDisplay.className = "checkbox__display";

    const checkSVG = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    checkSVG.setAttribute("aria-hidden", true);
    checkSVG.setAttribute("focusable", false);
    checkSVG.setAttribute("width", 17);
    checkSVG.setAttribute("height", 13);
    checkSVG.setAttribute("viewbox", "0 0 17 13");
    checkSVG.setAttribute("fill", "none");

    const checkPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    checkPath.setAttribute(
      "d",
      "M0.680176 6.59202L6.22897 11.5272C6.24943 11.5454 6.28072 11.5437 6.29916 11.5235L16.3202 0.52002"
    );
    checkPath.setAttribute("pathLength", 1);

    checkSVG.insertAdjacentElement("beforeend", checkPath);

    checkDisplay.insertAdjacentElement("beforeend", checkSVG);

    checkbox.insertAdjacentElement("beforeend", nativeCheck);
    checkbox.insertAdjacentElement("beforeend", checkDisplay);

    wrapper.insertAdjacentElement("beforeend", label);
    wrapper.insertAdjacentElement("beforeend", checkbox);

    return wrapper;
  }

  #capitalize(str) {
    // Getting the ASCII value of the first character
    const firstChar = str.codePointAt(0);

    // We shouldn't perform the capitalization if the first char is not a small letter of the english alphabet.
    if (firstChar < 97 || firstChar > 122) return str;

    // Subtracting 32 from small letters results in the capital equivalent (ASCII table)
    return String.fromCharCode(firstChar - 32) + str.slice(1);
  }
}

const checkboxLists = document.querySelectorAll(
  '[data-controller="checkboxList"]'
);
if (checkboxLists) {
  checkboxLists.forEach((checkboxList) => {
    new CheckboxList(checkboxList);
  });
}
