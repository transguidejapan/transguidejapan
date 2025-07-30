function initializeLanguageCard() {
  Array.from(document.getElementsByClassName("js-langcard"))
    .forEach(x => {
      switch (x.dataset['lang']) {
        case "en":
          x.innerHTML = "English"
          break;
        case "ja":
          x.innerHTML = "日本語"
          break;
        case "default":
          x.innerHTML = x.dataset["lang"]
          break;
      }
    })
}

function onLoad() {
  initializeLanguageCard()

}

window.addEventListener("DOMContentLoaded", onLoad)
