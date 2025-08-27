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

function initMenu()
{
   const menu=document.getElementById("menu")
   const close=document.getElementById("close")
   const open=document.getElementById("open")
  if(!menu||!close||!open)
    {
      console.warn(`Some or all menu elements are missing.\n
        menu = ${menu!=null}\n
        close = ${close!=null}\n
        open = ${open!=null}\n
        `);
      return;
    }
    const openedClass=[ "opacity-100", "left-0","opened","pointer-events-auto" ];
    const closedClass=[ "opacity-0", "-left-10","closed","pointer-events-none" ];
    const clickCallback= ()=>{
      if(menu.classList.contains("opened")){
        openedClass.forEach(x=>{menu.classList.remove(x)})
        closedClass.forEach(x=>{menu.classList.add(x)})
      }else
      {
        openedClass.forEach(x=>{menu.classList.add(x)})
        closedClass.forEach(x=>{menu.classList.remove(x)})
      }

    }
    close.addEventListener("click",clickCallback)
    open.addEventListener("click",clickCallback)
}

function onLoad() {
  initializeLanguageCard()
  initMenu()

}

window.addEventListener("DOMContentLoaded", onLoad)
