const getElementById = (id) => document.getElementById(id);
function wireDialogDismissal(dialog, closeButton) {
  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target !== dialog) return;
    const {left, right, top, bottom} = dialog.getBoundingClientRect();
    if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom)
      dialog.close();
  });
}

function collectionButton(parent, label, description, action, id) {
  const button = appendText(parent, "button", label);
  button.type = "button";
  button.setAttribute("aria-label", description);
  button.dataset[action] = id;
  return button;
}
