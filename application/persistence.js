let applicationState = createFreshState(),
  loadWarning = "";
try {
  let raw = localStorage.getItem("kincaidV71"),
    parsedState = raw ? JSON.parse(raw) : null;
  if (parsedState) {
    const migrateId = id => (id === "cat" || id === "spider") ? id + "-2024" : id;
    const known = parsedState.knownFormIds;
    const migrated = parsedState.activeFormId !== migrateId(parsedState.activeFormId) ||
      (Array.isArray(known) && known.some(id => id !== migrateId(id)));
    if (migrated) {
      parsedState.activeFormId = migrateId(parsedState.activeFormId);
      if (Array.isArray(known)) parsedState.knownFormIds = [...new Set(known.map(migrateId))];
    }
    let normalized = normalizeState(parsedState);
    applicationState = normalized.state;
    if (migrated) {
      try {
        localStorage.setItem("kincaidV71", JSON.stringify(applicationState));
      } catch (_) {
        loadWarning = "The updated form selections could not be saved.";
      }
    }
    if (normalized.repaired)
      loadWarning =
        "Saved state contained invalid or contradictory values and was repaired.";
  }
} catch (error) {
  loadWarning = "Saved state could not be loaded. A fresh state is displayed.";
  try {
    let raw = localStorage.getItem("kincaidV71");
    if (raw) localStorage.setItem("kincaidV71_recovery", raw);
  } catch (_) {}
  applicationState = createFreshState();
}
applicationState.noticeMessage = loadWarning;
syncDerivedState();
const clone = (x) => JSON.parse(JSON.stringify(x));
function messageLines(...parts) {
  return parts
    .flat(Infinity)
    .filter((x) => x !== null && x !== undefined && String(x).trim())
    .map((x) =>
      String(x)
        .trim()
        .replace(/[ \t\f\v]+/g, " ")
    )
    .join("\n");
}
function castMessage(name, level, spend, selfTarget, healing, ritual) {
  return messageLines(
    ritual ? `${name} cast as a ritual.` : `${name} cast.`,
    selfTarget ? "Target: Kincaid." : "",
    healing ? `Healing rolled: ${healing} HP.` : "",
    spend && level ? `Level ${level} slots · ${applicationState.spellSlots[level]}/${kincaid.spellSlotMaximums[level]} remaining.` : ""
  );
}
const undoLabels = new WeakMap();
function captureUndoSnapshot() {
  let q = clone(applicationState);
  q.undoHistory = [];
  applicationState.undoHistory = applicationState.undoHistory.slice(-9);
  applicationState.undoHistory.push(q);
  return q;
}
function save(msg = "") {
  applicationState.noticeMessage = messageLines(msg);
  localStorage.setItem("kincaidV71", JSON.stringify(applicationState));
  render();
}
function change(fn, msg = "") {
  const wasIncapacitated = conditionModifiers().incapacitated;
  const snapshot = captureUndoSnapshot();
  const trigger = document.activeElement;
  fn();
  if (!wasIncapacitated && conditionModifiers().incapacitated) {
    endConc();
    if (applicationState.draconicFlightState === "active") applicationState.draconicFlightState = "spent";
  }
  const message = typeof msg === "function" ? msg() : msg;
  const label = message.split(/[·\n]/)[0].replace(/\.$/, "").trim() ||
    trigger?.getAttribute("aria-label") || trigger?.closest("button")?.textContent || "Last change";
  undoLabels.set(snapshot, label);
  save(message);
}
function showNotice(msg) {
  applicationState.noticeMessage = messageLines(msg);
  render();
}
function undo() {
  if (!applicationState.undoHistory.length)
    return showNotice("Nothing to undo.");
  let q = applicationState.undoHistory.pop(),
    h = applicationState.undoHistory;
  applicationState = { ...q, undoHistory: h, lightThemeEnabled: applicationState.lightThemeEnabled };
  save("Undone.");
}
function readAmount() {
  return Math.max(0, +elements.amount.value || 0);
}
