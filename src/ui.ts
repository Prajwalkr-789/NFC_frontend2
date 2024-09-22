window.openTab = function (evt: Event, tabName: string) {
  if (tabName !== "read") {
    window?.abortController?.abort();
  }
  let i, tabcontent, tablinks;
  tabcontent = document.querySelectorAll<HTMLElement>(".tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.querySelectorAll<HTMLElement>(".tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName)!!.style.display = "block";
  (evt.currentTarget as HTMLElement).className += " active";
};

document.getElementById("defaultOpen")!!.click();
