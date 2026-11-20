// Exported assets supply identity and typed traits. Rules enrich an asset or
// introduce a standalone definition. References always use stable IDs.
const statusById = new Map();
const statusByName = new Map();
function loadStatusCatalog() {
  for (const records of [STATUS_ASSETS, STATUS_RULES]) {
    const seen = new Set();
    for (const record of records) {
      if (!/^[a-z0-9-]+$/.test(record.id) || seen.has(record.id))
        throw new Error("Invalid or duplicate effect ID: " + record.id);
      seen.add(record.id);
      statusById.set(record.id, {...statusById.get(record.id), ...record});
    }
  }
  for (const record of statusById.values()) {
    if (!record.name || !record.group || statusByName.has(record.name) || record.name === "Custom")
      throw new Error("Invalid or duplicate effect name: " + record.name);
    statusByName.set(record.name, record);
    for (const id of [...(record.grants || []), ...(record.immunity ? [record.immunity] : [])])
      if (!statusById.has(id)) throw new Error(record.id + " references unknown effect " + id);
  }
}
loadStatusCatalog();
for (const owner of [kincaid, ...Object.values(WILD_SHAPE_FORMS)])
  for (const id of owner.grants || [])
    if (!statusById.has(id)) throw new Error((owner.name || "Kincaid") + " references unknown effect " + id);


// A source must be evaluated before anything it grants or suppresses.
// Reject circular dependencies when loading a pack, before restoring play.
const orderedStatuses = [];
{
  const done = new Set(), pending = new Set();
  function visit(record) {
    if (done.has(record.id)) return;
    if (pending.has(record.id)) throw new Error("Circular effect reference: " + record.id);
    pending.add(record.id);
    for (const id of [...(record.grants || []), ...(record.immunity ? [record.immunity] : [])])
      visit(statusById.get(id));
    pending.delete(record.id);
    done.add(record.id);
    orderedStatuses.push(record);
  }
  for (const record of statusById.values()) visit(record);
  orderedStatuses.reverse();
}

function effectReminder(record) {
  if (!record) return "";
  if (record.immunity) return "Immune to " + statusById.get(record.immunity).name + ".";
  if (record.resistance || record.vulnerability) return record.name + ".";
  return record.reminder || record.defenseNote || record.movement || "Use the note for the source, rule, and duration.";
}
