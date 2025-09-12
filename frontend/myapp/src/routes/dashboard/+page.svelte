<script lang="ts">
  import { onMount } from 'svelte';

  type Column = { id: number; key: string; label: string; type: 'text' | 'number' | 'date'; ordinal: number };
  type Row = { id: number; data: Record<string, any> };

  const STORAGE_KEY = 'pulsepoint.table.v1';

  let columns: Column[] = [
    { id: 1, key: 'firstName', label: 'First Name', type: 'text', ordinal: 0 },
    { id: 2, key: 'lastName',  label: 'Last Name',  type: 'text', ordinal: 1 },
    { id: 3, key: 'dob',       label: 'DOB',        type: 'date', ordinal: 2 },
  ];
  let rows: Row[] = [
    { id: 1, data: { firstName: 'Maya', lastName: 'Patel', dob: '1982-09-12' } },
    { id: 2, data: { firstName: 'Luis', lastName: 'Romero', dob: '1990-03-05' } },
  ];

  const navLinks = [
    { label: "Home", href: "#top" },
    { label: "Services", href: "#services" },
    { label: "Departments", href: "#departments" },
    { label: "Providers", href: "#providers" },
    { label: "Contact", href: "#contact" }
  ];

  let loading = false; // kept for parity if you ever wire a backend
  let error = '';

  // Optional localStorage persistence
  onMount(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const { columns: c, rows: r } = JSON.parse(raw);
        if (Array.isArray(c) && Array.isArray(r)) {
          columns = c;
          rows = r;
        }
      }
    } catch {}
  });

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ columns, rows }));
    } catch { }
  }

  // --- Row ops ---
  function nextRowId() { return rows.length ? Math.max(...rows.map(r => r.id)) + 1 : 1; }
  function addRow() {
    const blank: Record<string, any> = {};
    for (const c of columns) blank[c.key] = '';
    rows = [...rows, { id: nextRowId(), data: blank }];
    persist();
  }
  function deleteRow(id: number) {
    rows = rows.filter(r => r.id !== id);
    persist();
  }
  function updateCell(row: Row, col: Column, value: string) {
    rows = rows.map(r => r.id === row.id ? { ...r, data: { ...r.data, [col.key]: value } } : r);
    persist();
  }

  // --- Column ops ---
  function nextColId() { return columns.length ? Math.max(...columns.map(c => c.id)) + 1 : 1; }
  let newColLabel = '';
  let newColKey = '';
  let newColType: Column['type'] = 'text';

  function addColumn() {
    if (!newColLabel.trim() || !newColKey.trim()) return;
    if (columns.some(c => c.key === newColKey)) { error = 'Column key must be unique.'; return; }
    const ordinal = columns.length ? Math.max(...columns.map(c => c.ordinal)) + 1 : 0;
    const col: Column = { id: nextColId(), key: newColKey, label: newColLabel, type: newColType, ordinal };
    columns = [...columns, col];
    rows = rows.map(r => ({ ...r, data: { ...r.data, [col.key]: r.data[col.key] ?? '' } }));
    newColLabel = ''; newColKey = ''; newColType = 'text';
    error = '';
    persist();
  }

  function deleteColumn(id: number) {
    const col = columns.find(c => c.id === id);
    if (!col) return;
    columns = columns.filter(c => c.id !== id);
    // Keep row data intact (in case you add the column back). If you want to clean it:
    // rows = rows.map(r => { const { [col.key]: _, ...rest } = r.data; return { ...r, data: rest }; });
    persist();
  }

  function renameColumnLabel(c: Column, label: string) {
    columns = columns.map(col => col.id === c.id ? { ...col, label } : col);
    persist();
  }

  function renameColumnKey(c: Column, key: string) {
    key = key.trim();
    if (!key || key === c.key) return;
    if (columns.some(col => col.key === key)) { error = 'Column key must be unique.'; return; }
    // Update rows to move the data from old key to new key
    rows = rows.map(r => {
      const value = r.data[c.key];
      const { [c.key]: _, ...rest } = r.data;
      return { ...r, data: { ...rest, [key]: value } };
    });
    columns = columns.map(col => col.id === c.id ? { ...col, key } : col);
    error = '';
    persist();
  }

  function changeColumnType(c: Column, type: Column['type']) {
    columns = columns.map(col => col.id === c.id ? { ...col, type } : col);
    persist();
  }

  function moveColumnLeft(c: Column) {
    const idx = columns.findIndex(x => x.id === c.id);
    if (idx <= 0) return;
    const copy = [...columns];
    [copy[idx - 1], copy[idx]] = [copy[idx], copy[idx - 1]];
    // reassign ordinals to keep order stable
    columns = copy.map((col, i) => ({ ...col, ordinal: i }));
    persist();
  }
  function moveColumnRight(c: Column) {
    const idx = columns.findIndex(x => x.id === c.id);
    if (idx === -1 || idx >= columns.length - 1) return;
    const copy = [...columns];
    [copy[idx], copy[idx + 1]] = [copy[idx + 1], copy[idx]];
    columns = copy.map((col, i) => ({ ...col, ordinal: i }));
    persist();
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify({ columns, rows }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'pulsepoint-table.json'; a.click();
    URL.revokeObjectURL(url);
  }
  let importOpen = false;
  let importText = '';
  function doImport() {
    try {
      const obj = JSON.parse(importText);
      if (!Array.isArray(obj.columns) || !Array.isArray(obj.rows)) throw new Error('Invalid format');
      columns = obj.columns; rows = obj.rows; persist(); importOpen = false; importText = '';
    } catch (e) { error = 'Import failed: invalid JSON format.'; }
  }
</script>



<section class="wrap2">
  <h1>Health Records</h1>

  {#if error}<div class="error">{error}</div>{/if}

  <div class="columns-panel">
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th class="idcol">ID</th>
          {#each columns.sort((a,b) => a.ordinal - b.ordinal) as c (c.id)}
            <th>{c.label}</th>
          {/each}
          <th class="idcol"></th>
        </tr>
      </thead>
      <tbody>
        {#each rows as row (row.id)}
          <tr>
            <td class="idcol">{row.id}</td>
            {#each columns.sort((a,b) => a.ordinal - b.ordinal) as c (c.id)}
              <td>
                {#if c.type === 'date'}
                  <input type="date" value={row.data?.[c.key] ?? ''} on:change={(e) => updateCell(row, c, (e.target as HTMLInputElement).value)} />
                {:else if c.type === 'number'}
                  <input type="number" value={row.data?.[c.key] ?? ''} on:change={(e) => updateCell(row, c, (e.target as HTMLInputElement).value)} />
                {:else}
                  <input type="text" value={row.data?.[c.key] ?? ''} on:input={(e) => updateCell(row, c, (e.target as HTMLInputElement).value)} />
                {/if}
              </td>
            {/each}
            <td class="idcol">
              <button class="btn btn--ghost danger" on:click={() => deleteRow(row.id)}>Delete</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>

<style>
  * { box-sizing: border-box; }
  html, body { margin:0; padding:0; scroll-behavior: smooth; }
  body {
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
    color: var(--txt); background: radial-gradient(1200px 600px at 10% -10%, #112 0%, #0b0c10 60%, #090a0f 100%);
    line-height: 1.5;
  }
  .container { width: min(1150px, 90vw); margin: 0 auto; }

  .sr-only { position:absolute; left:-9999px; top:auto; width:1px; height:1px; overflow:hidden; }

  .wrap2 { padding: 24px; max-width: 1100px; margin: 0 auto; }
  h1 { margin: 0 0 6px; }
  .muted { color: var(--muted); margin: 0 0 16px; }
  .error { color:#ff6b6b; margin: 6px 0 12px; }

  .toolbar { display:flex; gap:10px; flex-wrap: wrap; margin: 6px 0 16px; }

  .btn {
    display:inline-flex; align-items:center; justify-content:center;
    padding: 8px 12px; border-radius: 999px; font-weight:700;
    background-image: linear-gradient(90deg, var(--brandA), var(--brandB), var(--brandC));
    background-size: 300% 200%;
    background-position: 10% 50%;
    background-repeat: no-repeat; /* important fix to prevent tiling */
    color:#081018; border: 2px solid transparent;
    transition: background-position .4s ease, transform .15s ease, opacity .3s ease;
  }
  .btn:hover { background-position: 99% 50%; transform: translateY(-1px); }
  .btn:focus-visible { outline: none; box-shadow: 0 0 0 4px var(--ring); }
  .btn--ghost { background: transparent; border: 2px solid rgba(255,255,255,.2); color: var(--txt); }
  .btn--ghost:hover { opacity: .9; }
  .danger { border-color: rgba(255,99,99,.4); }

  .columns-panel {
    margin-bottom: 18px; padding: 12px; border:1px solid rgba(255,255,255,.1);
    border-radius: 12px; background: rgba(255,255,255,.03);
  }

  .col-form { display:flex; gap:8px; flex-wrap:wrap; margin-bottom: 10px; }
  .col-list { list-style:none; padding:0; margin:0; display:grid; gap:8px; }
  .col-item { border:1px solid rgba(255,255,255,.08); border-radius:10px; padding:8px; background: rgba(255,255,255,.02); }
  .col-row { display:grid; grid-template-columns: 1.2fr 1fr auto auto; gap:8px; align-items:center; }
  .col-label, .col-key, .col-row select { width:100%; padding:8px 10px; border-radius:8px; border:1px solid rgba(255,255,255,.15); background: rgba(255,255,255,.06); color: var(--txt); }
  .col-actions { display:flex; gap:6px; justify-self:end; }

  .table-wrap { overflow:auto; border:1px solid rgba(255,255,255,.08); border-radius: 12px; }
  table { width:100%; border-collapse: collapse; }
  thead th { text-align:left; font-weight:800; padding:10px; background: rgba(255,255,255,.05); position: sticky; top: 0; }
  .idcol { width: 72px; }
  tbody td { padding: 8px 10px; border-top: 1px solid rgba(255,255,255,.06); }
  tbody input, tbody select {
    width: 100%; background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.15); color: var(--txt);
    padding: 6px 8px; border-radius: 8px;
  }

  .importer { margin: 10px 0 16px; padding: 10px; border:1px solid rgba(255,255,255,.1); border-radius: 10px; background: rgba(255,255,255,.03); }
  .importer textarea { width:100%; min-height: 160px; resize: vertical; padding: 10px; border-radius:8px; border:1px solid rgba(255,255,255,.15); background: rgba(255,255,255,.06); color: var(--txt); }
  .import-actions { display:flex; gap:8px; margin-top: 8px; }
    .header {
    position: sticky; top:0; z-index: 50;
    background: rgba(10,12,20,0.75);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
</style>
