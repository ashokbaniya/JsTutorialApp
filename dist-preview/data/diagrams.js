// ============================================================
// Diagram library — clean textbook-style SVG illustrations.
// Consistent visual language: white background (via container),
// deep blue ink for structure, dark charcoal for text.
// ============================================================

const INK = '#1E293B';
const BLUE = '#2563EB';
const BLUE_LIGHT = '#EFF6FF';
const BLUE_BORDER = '#93C5FD';
const BORDER = '#CBD5E1';
const MUTED = '#64748B';
const ACCENT_GREEN = '#059669';
const ACCENT_RED = '#DC2626';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function box(x, y, w, h, label, opts = {}) {
  const {
    stroke = BLUE, fill = '#FFFFFF', labelColor = INK, fontSize = 13,
    dashed = false, sub = '', subColor = MUTED, rx = 6,
  } = opts;
  const dash = dashed ? `stroke-dasharray="5 4"` : '';
  const lines = String(label).split('\n');
  const lineH = fontSize + 6;
  const startY = y + h / 2 - ((lines.length - 1) * lineH) / 2 + (sub ? -7 : 0);
  const textEls = lines
    .map((line, i) => `<text x="${x + w / 2}" y="${startY + i * lineH}" text-anchor="middle" font-size="${fontSize}" font-weight="600" fill="${labelColor}" font-family="'JetBrains Mono','IBM Plex Mono',monospace">${esc(line)}</text>`)
    .join('');
  const subEl = sub
    ? `<text x="${x + w / 2}" y="${y + h / 2 + lines.length * lineH - 2}" text-anchor="middle" font-size="${fontSize - 3}" fill="${subColor}" font-family="'Inter','Source Sans Pro',sans-serif">${esc(sub)}</text>`
    : '';
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="1.8" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.03))" ${dash}/>
    ${textEls}
    ${subEl}
  `;
}

function arrowMarkerDefs(id = 'arrow') {
  return `
    <defs>
      <marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,1 L10,5 L0,9 z" fill="${BLUE}" />
      </marker>
    </defs>
  `;
}

function vArrow(x, y1, y2, id = 'arrow') {
  return `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${BLUE}" stroke-width="1.8" stroke-linecap="round" marker-end="url(#${id})" />`;
}

function hArrow(x1, x2, y, id = 'arrow') {
  return `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${BLUE}" stroke-width="1.8" stroke-linecap="round" marker-end="url(#${id})" />`;
}

function label(x, y, text, opts = {}) {
  const { size = 11.5, color = MUTED, anchor = 'middle', italic = false, family = "'Inter','Source Sans Pro',sans-serif", weight = "normal" } = opts;
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" fill="${color}" font-family="${family}" font-weight="${weight}" ${italic ? 'font-style="italic"' : ''}>${esc(text)}</text>`;
}

function svg(viewBox, inner) {
  return `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" width="100%" role="img" style="background: transparent;">${inner}</svg>`;
}

// ---------------------------------------------------------------
// 1. Call Stack — first() calls second()
// ---------------------------------------------------------------
export function callStackStepDiagram(activeIndex) {
  const frames = [
    ['Global'],
    ['Global', 'first()'],
    ['Global', 'first()', 'second()'],
    ['Global', 'first()'],
    ['Global'],
  ][activeIndex] || ['Global'];

  let boxes = '';
  const baseY = 190;
  frames.forEach((f, i) => {
    const y = baseY - i * 52;
    const isTop = i === frames.length - 1;
    boxes += box(220, y, 200, 44, f, { 
      stroke: isTop ? BLUE : BORDER, 
      fill: isTop ? BLUE_LIGHT : '#FFFFFF',
      labelColor: isTop ? BLUE : INK
    });
  });
  return svg('0 0 640 260', `${boxes}${label(320, 238, 'Call Stack — current state', { size: 11, color: MUTED, weight: "500" })}`);
}

export function primitiveValueDiagram() {
  return `
    <svg viewBox="0 0 640 160" xmlns="http://www.w3.org/2000/svg" width="100%">
      ${arrowMarkerDefs('pv_arr')}
      <rect x="40" y="50" width="180" height="60" rx="8" fill="#FFFFFF" stroke="#2563EB" stroke-width="1.8" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.03))"/>
      <text x="130" y="85" text-anchor="middle" font-size="12" font-weight="600" fill="#1E293B" font-family="'JetBrains Mono',monospace">Variable Reference</text>
      
      <rect x="320" y="50" width="180" height="60" rx="8" fill="#EFF6FF" stroke="#2563EB" stroke-width="1.8" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.03))"/>
      <text x="410" y="85" text-anchor="middle" font-size="12" font-weight="600" fill="#2563EB" font-family="'JetBrains Mono',monospace">Primitive Value</text>
      
      <line x1="220" y1="80" x2="318" y2="80" stroke="#2563EB" stroke-width="1.8" stroke-linecap="round" marker-end="url(#pv_arr)"/>
    </svg>
  `;
}

// ---------------------------------------------------------------
// 2. Stack of plates — mental model
// ---------------------------------------------------------------
export function stackOfPlatesDiagram() {
  const plates = ['second()', 'first()', 'Global'];
  let els = '';
  plates.forEach((p, i) => {
    const y = 190 - i * 42;
    els += `<ellipse cx="320" cy="${y}" rx="130" ry="14" fill="#FFFFFF" stroke="${BLUE}" stroke-width="1.8" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.03))"/>`;
    els += label(320, y + 4, p, { size: 11.5, color: INK, family: "'JetBrains Mono',monospace", weight: "600" });
  });
  els += label(320, 252, 'Last plate on, first plate off.', { size: 12, color: MUTED, italic: true });
  return svg('0 0 640 270', els);
}

// ---------------------------------------------------------------
// 3. Closures — outer/inner function boxes
// ---------------------------------------------------------------
export function closureDiagram() {
  return svg('0 0 640 320', `
    ${arrowMarkerDefs('cl')}
    ${box(90, 40, 460, 240, '', { stroke: BORDER, fill: '#F8FAFC', rx: 10 })}
    ${label(120, 68, 'function outer() {', { anchor: 'start', size: 12.5, color: INK, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${label(140, 92, 'let count = 0;', { anchor: 'start', size: 12.5, color: BLUE, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${box(130, 115, 360, 130, '', { stroke: BLUE, dashed: true, fill: '#FFFFFF', rx: 8 })}
    ${label(150, 138, 'function inner() {', { anchor: 'start', size: 12.5, color: INK, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${label(170, 162, 'count++;', { anchor: 'start', size: 12.5, color: BLUE, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${label(150, 186, 'return count;', { anchor: 'start', size: 12.5, color: INK, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${label(150, 210, '}', { anchor: 'start', size: 12.5, color: INK, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${label(120, 258, 'return inner;', { anchor: 'start', size: 12.5, color: INK, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${label(120, 280, '}', { anchor: 'start', size: 12.5, color: INK, family: "'JetBrains Mono',monospace", weight: "600" })}
    <path d="M290,162 C 55,170 55,95 130,92" fill="none" stroke="${BLUE}" stroke-width="1.8" stroke-dasharray="4 4" stroke-linecap="round" marker-end="url(#cl)"/>
    ${label(50, 130, 'inner() keeps a', { anchor: 'start', size: 10.5, color: MUTED, weight: "500" })}
    ${label(50, 144, 'live link to count', { anchor: 'start', size: 10.5, color: MUTED, weight: "500" })}
  `);
}

// ---------------------------------------------------------------
// 4. Event loop
// ---------------------------------------------------------------
export function eventLoopDiagram() {
  return svg('0 0 680 340', `
    ${arrowMarkerDefs('el')}
    ${box(40, 40, 200, 70, 'Call Stack', { stroke: BLUE, fill: '#FFFFFF' })}
    ${box(440, 40, 200, 70, 'Web APIs', { stroke: BORDER, fill: '#F8FAFC', sub: 'timers, fetch, DOM events' })}
    ${box(440, 170, 200, 60, 'Callback Queue', { stroke: BORDER, fill: '#F8FAFC', sub: 'macrotasks' })}
    ${box(440, 250, 200, 60, 'Microtask Queue', { stroke: BLUE, fill: BLUE_LIGHT, sub: 'promises' })}
    ${box(40, 190, 200, 90, 'Event Loop', { stroke: BLUE, fill: BLUE_LIGHT, sub: 'checks: is the stack empty?' })}
    ${hArrow(240, 440, 75, 'el')}
    ${label(340, 65, 'async call', { size: 10.5, weight: "500" })}
    ${vArrow(540, 110, 170, 'el')}
    ${label(555, 145, 'when done', { size: 10.5, anchor: 'start', weight: "500" })}
    <path d="M440,200 C 280,240 280,225 240,225" fill="none" stroke="${BLUE}" stroke-width="1.8" stroke-linecap="round" marker-end="url(#el)"/>
    <path d="M440,280 C 280,290 280,255 240,235" fill="none" stroke="${BLUE}" stroke-width="1.8" stroke-linecap="round" marker-end="url(#el)"/>
    ${label(330, 308, 'pushed onto stack when it is empty', { size: 10.5, weight: "500" })}
    ${vArrow(140, 110, 190, 'el')}
    ${label(152, 150, 'stack empty?', { size: 10.5, anchor: 'start', weight: "500" })}
  `);
}

// ---------------------------------------------------------------
// 5. Scope chain — nested boxes
// ---------------------------------------------------------------
export function scopeChainDiagram() {
  return svg('0 0 640 320', `
    ${arrowMarkerDefs('sc')}
    ${box(40, 30, 560, 260, '', { stroke: BORDER, fill: '#F8FAFC', rx: 10 })}
    ${label(70, 58, 'Global Scope', { anchor: 'start', size: 11, color: BLUE, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${box(90, 75, 440, 180, '', { stroke: BLUE, fill: '#FFFFFF', rx: 8 })}
    ${label(120, 100, 'function outer() {', { anchor: 'start', size: 12, color: INK, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${box(140, 115, 340, 110, '', { stroke: BLUE, dashed: true, fill: BLUE_LIGHT, rx: 6 })}
    ${label(170, 140, 'function inner() {', { anchor: 'start', size: 12, color: INK, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${label(190, 164, 'console.log(x);', { anchor: 'start', size: 12, color: BLUE, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${label(170, 188, '}', { anchor: 'start', size: 12, color: INK, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${label(120, 235, '}', { anchor: 'start', size: 12, color: INK, family: "'JetBrains Mono',monospace", weight: "600" })}
    <path d="M300,164 C 500,164 500,120 500,100" fill="none" stroke="${BLUE}" stroke-width="1.8" stroke-dasharray="4 4" stroke-linecap="round" marker-end="url(#sc)"/>
    ${label(504, 90, 'not found — look up', { anchor: 'start', size: 10, color: MUTED, weight: "500" })}
    <path d="M480,100 C 560,60 560,50 60,50" fill="none" stroke="${BLUE}" stroke-width="1.8" stroke-dasharray="4 4" stroke-linecap="round" marker-end="url(#sc)"/>
    ${label(560, 66, 'x found here', { anchor: 'end', size: 10, color: MUTED, weight: "500" })}
  `);
}

// ---------------------------------------------------------------
// 6. Execution context — creation vs execution phase
// ---------------------------------------------------------------
export function executionContextDiagram() {
  return svg('0 0 640 300', `
    ${arrowMarkerDefs('arrow')}
    ${box(40, 40, 260, 220, '', { stroke: BLUE, fill: '#FFFFFF', rx: 10 })}
    ${label(170, 68, '1. CREATION PHASE', { size: 11, color: BLUE, family: "'JetBrains Mono',monospace", weight: "700" })}
    ${label(60, 98, '• Variable Environment', { anchor: 'start', size: 11.5, color: INK, weight: "500" })}
    ${label(60, 122, '• hoisted vars → undefined', { anchor: 'start', size: 11.5, color: MUTED })}
    ${label(60, 150, '• function declarations', { anchor: 'start', size: 11.5, color: INK, weight: "500" })}
    ${label(60, 174, '• this binding set', { anchor: 'start', size: 11.5, color: INK, weight: "500" })}
    ${label(60, 202, '• outer reference set', { anchor: 'start', size: 11.5, color: INK, weight: "500" })}
    ${label(60, 226, '(scope chain link)', { anchor: 'start', size: 10.5, color: MUTED })}
    
    ${box(340, 40, 260, 220, '', { stroke: BORDER, fill: '#F8FAFC', rx: 10 })}
    ${label(470, 68, '2. EXECUTION PHASE', { size: 11, color: BLUE, family: "'JetBrains Mono',monospace", weight: "700" })}
    ${label(360, 98, '• code runs line by line', { anchor: 'start', size: 11.5, color: INK, weight: "500" })}
    ${label(360, 126, '• variables assigned', { anchor: 'start', size: 11.5, color: INK, weight: "500" })}
    ${label(360, 154, '• real values replace', { anchor: 'start', size: 11.5, color: INK, weight: "500" })}
    ${label(360, 176, '  the undefined placeholders', { anchor: 'start', size: 11.5, color: MUTED })}
    
    ${hArrow(300, 340, 150, 'arrow')}
  `);
}

// ---------------------------------------------------------------
// 7. Heap vs Stack
// ---------------------------------------------------------------
export function heapDiagram() {
  return svg('0 0 640 300', `
    ${arrowMarkerDefs('hp')}
    ${label(150, 30, 'CALL STACK', { size: 11, color: BLUE, family: "'JetBrains Mono',monospace", weight: "700" })}
    ${box(60, 50, 180, 44, "let a = 10;", { stroke: BLUE, fontSize: 11, fill: '#FFFFFF' })}
    ${box(60, 104, 180, 44, "let user = ●", { stroke: BLUE, fontSize: 11, fill: '#FFFFFF' })}
    ${label(450, 30, 'HEAP', { size: 11, color: BLUE, family: "'JetBrains Mono',monospace", weight: "700" })}
    ${box(360, 90, 220, 90, '{ name: "Ana" }', { stroke: BORDER, fontSize: 12, fill: '#F8FAFC' })}
    <path d="M240,126 C 300,126 300,135 360,135" fill="none" stroke="${BLUE}" stroke-width="1.8" stroke-linecap="round" marker-end="url(#hp)"/>
    ${label(320, 215, 'Primitives (numbers, strings…) live directly on the stack.', { size: 11, color: MUTED, weight: "500" })}
    ${label(320, 235, 'Objects live in the heap — the stack only holds a reference.', { size: 11, color: MUTED, weight: "500" })}
  `);
}

// ---------------------------------------------------------------
// 8. Promise states
// ---------------------------------------------------------------
export function promiseStatesDiagram() {
  return svg('0 0 640 260', `
    ${arrowMarkerDefs('pr')}
    ${box(230, 30, 180, 56, 'Pending', { stroke: BLUE, fill: '#FFFFFF' })}
    ${box(60, 160, 200, 56, 'Fulfilled', { stroke: ACCENT_GREEN, sub: 'resolve(value)', fill: '#F0FDF4' })}
    ${box(380, 160, 200, 56, 'Rejected', { stroke: ACCENT_RED, sub: 'reject(error)', fill: '#FEF2F2' })}
    <path d="M280,86 C 220,120 200,140 170,160" fill="none" stroke="${BLUE}" stroke-width="1.8" stroke-linecap="round" marker-end="url(#pr)"/>
    <path d="M360,86 C 420,120 450,140 470,160" fill="none" stroke="${BLUE}" stroke-width="1.8" stroke-linecap="round" marker-end="url(#pr)"/>
    ${label(320, 236, 'A promise settles exactly once — pending moves to one final state.', { size: 11, color: MUTED, weight: "500" })}
  `);
}

export function promiseChainDiagram() {
  return svg('0 0 680 200', `
    ${arrowMarkerDefs('pc')}
    ${box(20, 60, 150, 60, 'fetchUser()', { stroke: BLUE, fill: '#FFFFFF' })}
    ${box(210, 60, 150, 60, '.then(user)', { stroke: BLUE, fill: '#FFFFFF' })}
    ${box(400, 60, 150, 60, '.then(posts)', { stroke: BLUE, fill: '#FFFFFF' })}
    ${box(590, 60, 60, 60, '...', { stroke: BORDER, fill: '#F8FAFC' })}
    ${hArrow(170, 210, 90, 'pc')}
    ${hArrow(360, 400, 90, 'pc')}
    ${hArrow(550, 590, 90, 'pc')}
    ${label(340, 155, 'Each .then() returns a new promise, so calls can chain in order.', { size: 11, color: MUTED, weight: "500" })}
  `);
}

// ---------------------------------------------------------------
// 9. Prototype chain
// ---------------------------------------------------------------
export function prototypeChainDiagram() {
  return svg('0 0 640 260', `
    ${arrowMarkerDefs('pt')}
    ${box(20, 100, 150, 56, 'ana', { stroke: BLUE, sub: 'instance', fill: '#FFFFFF' })}
    ${box(220, 100, 190, 56, 'User.prototype', { stroke: BLUE, fill: '#FFFFFF' })}
    ${box(460, 100, 160, 56, 'Object.prototype', { stroke: BORDER, fill: '#F8FAFC' })}
    ${hArrow(170, 220, 128, 'pt')}
    ${hArrow(410, 460, 128, 'pt')}
    ${label(195, 118, '[[Prototype]]', { size: 10, color: MUTED, weight: "500" })}
    ${label(435, 118, '[[Prototype]]', { size: 10, color: MUTED, weight: "500" })}
    ${label(540, 192, 'null', { size: 12, color: MUTED, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${vArrow(540, 156, 182, 'pt')}
    ${label(320, 235, 'Lookups walk this chain until the property is found — or the chain ends at null.', { size: 11, color: MUTED, weight: "500" })}
  `);
}

// ---------------------------------------------------------------
// 10. `this` — four ways it's determined
// ---------------------------------------------------------------
export function thisQuadrantDiagram() {
  return svg('0 0 640 320', `
    ${box(30, 30, 270, 120, 'Plain function call', { stroke: BLUE, sub: 'this = undefined (strict) / global', fill: '#FFFFFF', rx: 8 })}
    ${box(340, 30, 270, 120, 'Object method call', { stroke: BLUE, sub: 'this = the object before the dot', fill: '#FFFFFF', rx: 8 })}
    ${box(30, 170, 270, 120, 'new Constructor()', { stroke: BLUE, sub: 'this = the newly created object', fill: '#FFFFFF', rx: 8 })}
    ${box(340, 170, 270, 120, 'call / apply / bind', { stroke: BLUE, sub: 'this = whatever you pass in explicitly', fill: '#FFFFFF', rx: 8 })}
  `);
}

// ---------------------------------------------------------------
// 11. Variables — binding in memory
// ---------------------------------------------------------------
export function variableBindingDiagram() {
  return svg('0 0 640 200', `
    ${arrowMarkerDefs('vb')}
    ${box(60, 60, 200, 60, 'score', { stroke: BLUE, sub: 'identifier', fill: '#FFFFFF' })}
    ${box(380, 60, 200, 60, '10', { stroke: BORDER, sub: 'value in memory', fill: '#F8FAFC' })}
    ${hArrow(260, 380, 90, 'vb')}
    ${label(320, 76, 'binds to', { size: 10.5, weight: "500" })}
    ${label(320, 160, 'let score = 10;  —  the name and the value are linked, not fused.', { size: 11.5, color: MUTED, weight: "500" })}
  `);
}

export function blockScopeDiagram() {
  return svg('0 0 640 240', `
    ${box(40, 30, 560, 180, '', { stroke: BORDER, fill: '#F8FAFC', rx: 10 })}
    ${label(70, 58, 'if (true) {', { anchor: 'start', size: 12.5, color: INK, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${box(90, 75, 300, 90, '', { stroke: BLUE, dashed: true, fill: BLUE_LIGHT, rx: 6 })}
    ${label(110, 100, 'let msg = "hi";', { anchor: 'start', size: 12, color: BLUE, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${label(110, 128, 'console.log(msg);', { anchor: 'start', size: 12, color: INK, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${label(430, 100, '✓ visible here', { anchor: 'start', size: 11, color: ACCENT_GREEN, weight: "600" })}
    ${label(70, 190, '}', { anchor: 'start', size: 12.5, color: INK, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${label(430, 128, 'msg does not exist', { anchor: 'start', size: 11, color: ACCENT_RED, weight: "600" })}
    ${label(430, 144, 'outside this block', { anchor: 'start', size: 11, color: ACCENT_RED, weight: "600" })}
  `);
}

export function scopeRelationshipDiagram() {
  return `
    <svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg" width="100%">
      <rect x="20" y="20" width="600" height="180" rx="8" fill="#F8FAFC" stroke="#2563EB" stroke-width="1.8" stroke-dasharray="5 4" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.03))"/>
      <text x="40" y="48" font-size="12" fill="#2563EB" font-family="'JetBrains Mono',monospace" font-weight="700">Global Scope (globalVar)</text>
      
      <rect x="80" y="62" width="480" height="120" rx="6" fill="#EFF6FF" stroke="#2563EB" stroke-width="1.8" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.03))"/>
      <text x="100" y="90" font-size="12" fill="#2563EB" font-family="'JetBrains Mono',monospace" font-weight="700">Outer Function Scope (outerVar)</text>
      
      <rect x="140" y="104" width="360" height="64" rx="6" fill="#FFFFFF" stroke="#2563EB" stroke-width="1.8" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.03))"/>
      <text x="320" y="142" text-anchor="middle" font-size="12" font-weight="600" fill="#1E293B" font-family="'JetBrains Mono',monospace">Inner Function Scope (innerVar & Scope Chain)</text>
    </svg>
  `;
}

export function callStackDiagram() {
  return `
    <svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg" width="100%">
      <rect x="220" y="20" width="200" height="42" rx="6" fill="#FEF2F2" stroke="#DC2626" stroke-width="1.8" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.03))"/>
      <text x="320" y="46" text-anchor="middle" font-size="12" font-weight="700" fill="#DC2626" font-family="'JetBrains Mono',monospace">second() [Top]</text>
      
      <rect x="220" y="74" width="200" height="42" rx="6" fill="#FFFFFF" stroke="#2563EB" stroke-width="1.8" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.03))"/>
      <text x="320" y="100" text-anchor="middle" font-size="12" font-weight="600" fill="#1E293B" font-family="'JetBrains Mono',monospace">first()</text>
      
      <rect x="220" y="128" width="200" height="42" rx="6" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.8" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.03))"/>
      <text x="320" y="154" text-anchor="middle" font-size="12" font-weight="600" fill="#64748B" font-family="'JetBrains Mono',monospace">Global Execution Context</text>
    </svg>
  `;
}

export function iteratorProtocolDiagram() {
  return `
    <svg viewBox="0 0 640 180" xmlns="http://www.w3.org/2000/svg" width="100%">
      ${arrowMarkerDefs('it_arr')}
      <rect x="30" y="60" width="150" height="60" rx="8" fill="#FFFFFF" stroke="#2563EB" stroke-width="1.8" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.03))"/>
      <text x="105" y="95" text-anchor="middle" font-size="12" font-weight="600" fill="#1E293B" font-family="'JetBrains Mono',monospace">Consumer (for...of)</text>
      
      <rect x="460" y="60" width="150" height="60" rx="8" fill="#EFF6FF" stroke="#2563EB" stroke-width="1.8" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.03))"/>
      <text x="535" y="95" text-anchor="middle" font-size="12" font-weight="600" fill="#2563EB" font-family="'JetBrains Mono',monospace">Iterator (.next())</text>
      
      <line x1="180" y1="80" x2="458" y2="80" stroke="#2563EB" stroke-width="1.8" stroke-linecap="round" marker-end="url(#it_arr)"/>
      <text x="320" y="70" text-anchor="middle" font-size="11" font-weight="600" fill="#2563EB" font-family="'JetBrains Mono',monospace">{ value, done }</text>
    </svg>
  `;
}

// ---------------------------------------------------------------
// 12. Hoisting — creation phase vs execution phase
// ---------------------------------------------------------------
export function hoistingDiagram() {
  return svg('0 0 640 320', `
    ${arrowMarkerDefs('ho')}
    ${box(30, 30, 270, 260, '', { stroke: BORDER, fill: '#F8FAFC', rx: 10 })}
    ${label(165, 58, 'AS YOU WRITE IT', { size: 11, color: MUTED, family: "'JetBrains Mono',monospace", weight: "700" })}
    ${label(50, 92, 'console.log(x);', { anchor: 'start', size: 11.5, color: INK, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${label(230, 92, '// undefined', { anchor: 'start', size: 10, color: MUTED })}
    ${label(50, 118, 'greet();', { anchor: 'start', size: 11.5, color: INK, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${label(155, 118, '// "Hi!"', { anchor: 'start', size: 10, color: MUTED })}
    ${label(50, 158, 'var x = 5;', { anchor: 'start', size: 11.5, color: BLUE, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${label(50, 184, 'function greet() {', { anchor: 'start', size: 11.5, color: BLUE, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${label(70, 208, 'return "Hi!";', { anchor: 'start', size: 11.5, color: INK, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${label(50, 232, '}', { anchor: 'start', size: 11.5, color: BLUE, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${label(165, 268, 'top-to-bottom source order', { size: 10, color: MUTED, italic: true })}

    ${hArrow(300, 340, 160, 'ho')}
    ${label(320, 145, 'creation', { size: 10, weight: "600" })}
    ${label(320, 160, 'phase runs', { size: 10, weight: "600" })}
    ${label(320, 175, 'first', { size: 10, weight: "600" })}

    ${box(340, 30, 270, 260, '', { stroke: BLUE, fill: '#FFFFFF', rx: 10 })}
    ${label(475, 58, 'CREATION PHASE (hoisting)', { size: 11, color: BLUE, family: "'JetBrains Mono',monospace", weight: "700" })}
    ${label(360, 92, 'function greet() {', { anchor: 'start', size: 11.5, color: INK, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${label(380, 116, 'return "Hi!";', { anchor: 'start', size: 11.5, color: INK, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${label(360, 140, '}', { anchor: 'start', size: 11.5, color: INK, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${label(360, 160, '— fully usable', { anchor: 'start', size: 10, color: ACCENT_GREEN, weight: "600" })}
    ${label(360, 196, 'var x;', { anchor: 'start', size: 11.5, color: INK, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${label(360, 216, '— set aside, = undefined', { anchor: 'start', size: 10, color: MUTED })}
    ${label(360, 244, '(the "= 5" assignment waits for', { anchor: 'start', size: 10, color: MUTED })}
    ${label(360, 260, 'the execution phase to run)', { anchor: 'start', size: 10, color: MUTED })}
  `);
}

// ---------------------------------------------------------------
// 13. Temporal Dead Zone — timeline within a block
// ---------------------------------------------------------------
export function temporalDeadZoneDiagram() {
  return svg('0 0 640 260', `
    ${label(320, 26, 'let count = 0;   ← block/scope begins', { anchor: 'middle', size: 11.5, color: MUTED, family: "'JetBrains Mono',monospace", weight: "500" })}
    ${box(220, 44, 30, 130, '', { stroke: ACCENT_RED, fill: '#FEF2F2', rx: 4 })}
    ${label(200, 58, 'TDZ', { anchor: 'end', size: 11, color: ACCENT_RED, family: "'JetBrains Mono',monospace", weight: "700" })}
    ${label(260, 70, 'console.log(count); // ReferenceError', { anchor: 'start', size: 11.5, color: ACCENT_RED, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${label(260, 96, 'typeof count;       // also throws here', { anchor: 'start', size: 11.5, color: ACCENT_RED, family: "'JetBrains Mono',monospace", weight: "600" })}
    ${label(260, 140, '(the binding "count" exists, but is', { anchor: 'start', size: 10.5, color: MUTED })}
    ${label(260, 158, 'not yet initialized — touching it throws)', { anchor: 'start', size: 10.5, color: MUTED })}

    <line x1="220" y1="174" x2="600" y2="174" stroke="#64748B" stroke-width="1.5" stroke-dasharray="4 3"/>
    ${label(260, 168, 'let count = 5;   ← declaration line runs', { anchor: 'start', size: 11.5, color: INK, family: "'JetBrains Mono',monospace", weight: "600" })}

    ${box(220, 184, 30, 60, '', { stroke: ACCENT_GREEN, fill: '#F0FDF4', rx: 4 })}
    ${label(200, 200, 'OK', { anchor: 'end', size: 11, color: ACCENT_GREEN, family: "'JetBrains Mono',monospace", weight: "700" })}
    ${label(260, 214, 'console.log(count); // 5 — safe now', { anchor: 'start', size: 11.5, color: ACCENT_GREEN, family: "'JetBrains Mono',monospace", weight: "600" })}

    ${label(320, 250, 'Every let/const/class binding has a TDZ, from the start of its scope to its own declaration line.', { size: 10.5, color: MUTED, weight: "500" })}
  `);
}

export const DIAGRAMS = {
  callStackDiagram, callStackStepDiagram, stackOfPlatesDiagram,
  closureDiagram, eventLoopDiagram, scopeChainDiagram,
  executionContextDiagram, heapDiagram, promiseStatesDiagram,
  promiseChainDiagram, prototypeChainDiagram, thisQuadrantDiagram,
  variableBindingDiagram, blockScopeDiagram, scopeRelationshipDiagram,
  iteratorProtocolDiagram, primitiveValueDiagram, hoistingDiagram,
  temporalDeadZoneDiagram
};