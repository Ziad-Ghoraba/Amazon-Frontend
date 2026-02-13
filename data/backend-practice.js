const xmlReq = new XMLHttpRequest();
xmlReq.addEventListener("load", () => {
  console.log(xmlReq.response);
});
xmlReq.open("GET", "https://supersimplebackend.dev");
xmlReq.send();
