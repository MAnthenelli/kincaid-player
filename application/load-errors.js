window.addEventListener(
  "error",
  (event) => {
    const file = event.target?.src || event.target?.href;
    if (!file && !event.message) return;
    const notice = document.getElementById("loadError");
    if (notice) {
      notice.hidden = false;
      notice.textContent = file ? "Could not load " + file : event.message;
    }
  },
  true
);
