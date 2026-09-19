/* diagram-zoom.js — click a diagram to open it full screen, then zoom and pan.
   Usage: <img src="…" data-diagram-zoom /> and load this file once per page. */
(function () {
  if (window.__pvDiagramZoom) return;
  window.__pvDiagramZoom = true;

  var SEL = '[data-diagram-zoom]';
  var overlay, stage, img, closeBtn, hint, zoomIn, zoomOut;
  var scale = 1, tx = 0, ty = 0, min = 1, max = 6;
  var dragging = false, moved = false, sx = 0, sy = 0, stx = 0, sty = 0;
  var pointers = new Map(), pinchStart = 0, pinchScale = 1;

  function css(el, s) { for (var k in s) el.style[k] = s[k]; }

  function build() {
    overlay = document.createElement('div');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    css(overlay, {
      position: 'fixed', inset: '0', zIndex: '2147483000', display: 'none',
      background: 'rgba(5,5,5,.94)', backdropFilter: 'blur(6px)',
      webkitBackdropFilter: 'blur(6px)', opacity: '0',
      transition: 'opacity .28s cubic-bezier(.32,.72,0,1)',
      fontFamily: "'Readex Pro', sans-serif", touchAction: 'none'
    });

    stage = document.createElement('div');
    css(stage, {
      position: 'absolute', inset: '0', overflow: 'hidden',
      cursor: 'grab', display: 'flex', alignItems: 'center', justifyContent: 'center'
    });

    img = document.createElement('img');
    css(img, {
      maxWidth: '94vw', maxHeight: '88vh', width: 'auto', height: 'auto',
      display: 'block', userSelect: 'none', webkitUserDrag: 'none',
      transformOrigin: 'center center', willChange: 'transform',
      transition: 'transform .22s cubic-bezier(.32,.72,0,1)'
    });
    img.draggable = false;
    stage.appendChild(img);

    var bar = document.createElement('div');
    css(bar, {
      position: 'absolute', top: 'clamp(16px,2vw,26px)', right: 'clamp(16px,2vw,26px)',
      display: 'flex', gap: '12px', alignItems: 'center', zIndex: '2'
    });

    // liquid-glass capsule holding the two zoom controls
    var group = document.createElement('div');
    css(group, {
      display: 'flex', alignItems: 'center', gap: '2px', padding: '4px',
      borderRadius: '26px', background: 'rgba(10,10,10,.55)',
      border: '1px solid rgba(255,255,255,.4)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,.28), 0 10px 30px rgba(0,0,0,.5)',
      backdropFilter: 'blur(20px) saturate(1.6)', webkitBackdropFilter: 'blur(20px) saturate(1.6)'
    });

    function ctrl(label, svg, variant) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', label);
      b.innerHTML = svg;
      var base = variant === 'inverse'
        ? { background: '#F50115', color: '#fff', border: '1px solid #F50115' }
        : { background: 'transparent', color: 'rgba(255,255,255,.58)', border: '1px solid transparent' };
      css(b, {
        width: '44px', height: '44px', borderRadius: '22px', cursor: 'pointer', padding: '0',
        background: base.background, color: base.color, border: base.border,
        fontFamily: "'Readex Pro', sans-serif",
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background .25s cubic-bezier(.32,.72,0,1), color .25s cubic-bezier(.32,.72,0,1), transform .15s cubic-bezier(.32,.72,0,1)'
      });
      b.addEventListener('mouseenter', function () {
        if (variant === 'inverse') { b.style.transform = 'translateY(-2px)'; b.style.background = '#d40113'; b.style.borderColor = '#d40113'; }
        else { b.style.color = '#fff'; }
      });
      b.addEventListener('mouseleave', function () {
        b.style.transform = 'none';
        b.style.background = base.background; b.style.color = base.color; b.style.border = base.border;
      });
      b.addEventListener('mousedown', function () { if (variant === 'inverse') b.style.transform = 'scale(0.97)'; });
      b.addEventListener('mouseup', function () { if (variant === 'inverse') b.style.transform = 'translateY(-2px)'; });
      b.addEventListener('focus', function () { b.style.outline = '2px solid #F50115'; b.style.outlineOffset = '3px'; });
      b.addEventListener('blur', function () { b.style.outline = 'none'; });
      b.addEventListener('pointerdown', function (e) { e.stopPropagation(); });
      return b;
    }

    zoomOut = ctrl('Zoom out', '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>');
    zoomIn = ctrl('Zoom in', '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><line x1="12" y1="5" x2="12" y2="19"/></svg>');
    closeBtn = ctrl('Close', '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>', 'inverse');
    css(closeBtn, { width: '54px', height: '54px', borderRadius: '27px' });

    zoomOut.addEventListener('click', function () { zoomBy(-0.6); });
    zoomIn.addEventListener('click', function () { zoomBy(0.6); });
    closeBtn.addEventListener('click', close);

    var divider = document.createElement('span');
    css(divider, { width: '1px', height: '20px', background: 'rgba(255,255,255,.28)', flex: '0 0 auto' });
    group.appendChild(zoomOut); group.appendChild(divider); group.appendChild(zoomIn);
    bar.appendChild(group); bar.appendChild(closeBtn);

    hint = document.createElement('p');
    css(hint, {
      position: 'absolute', bottom: '18px', left: '0', right: '0', margin: '0',
      textAlign: 'center', color: 'rgba(255,255,255,.72)', fontSize: '12.5px',
      fontWeight: '300', pointerEvents: 'none'
    });
    hint.textContent = 'Scroll or pinch to zoom · drag to pan · Esc to close';

    var scrim = document.createElement('div');
    css(scrim, {
      position: 'absolute', top: '0', left: '0', right: '0', height: '110px',
      background: 'linear-gradient(to bottom, rgba(5,5,5,.75), rgba(5,5,5,0))',
      pointerEvents: 'none', zIndex: '1'
    });

    overlay.appendChild(stage);
    overlay.appendChild(scrim);
    overlay.appendChild(bar);
    overlay.appendChild(hint);
    document.body.appendChild(overlay);

    stage.addEventListener('wheel', onWheel, { passive: false });
    stage.addEventListener('pointerdown', onDown);
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerup', onUp);
    stage.addEventListener('pointercancel', onUp);
    stage.addEventListener('dblclick', function (e) {
      e.preventDefault();
      if (scale > 1.05) reset(); else { scale = 2.4; clampPan(); apply(); }
    });
    stage.addEventListener('click', function (e) { if (e.target === stage && !moved) close(); });
    document.addEventListener('keydown', function (e) {
      if (overlay.style.display === 'none') return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === '+' || e.key === '=') zoomBy(0.6);
      else if (e.key === '-') zoomBy(-0.6);
      else if (e.key === '0') reset();
    });
  }

  function apply() {
    img.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + scale + ')';
    stage.style.cursor = scale > 1.02 ? (dragging ? 'grabbing' : 'grab') : 'zoom-in';
  }
  function clampPan() {
    var r = img.getBoundingClientRect();
    var bw = r.width / (scale || 1), bh = r.height / (scale || 1);
    var mx = Math.max(0, (bw * scale - window.innerWidth) / 2 + 40);
    var my = Math.max(0, (bh * scale - window.innerHeight) / 2 + 40);
    tx = Math.max(-mx, Math.min(mx, tx));
    ty = Math.max(-my, Math.min(my, ty));
  }
  function reset() { scale = 1; tx = 0; ty = 0; apply(); }
  function zoomBy(d) {
    scale = Math.max(min, Math.min(max, scale + d));
    if (scale <= 1.001) { tx = 0; ty = 0; }
    clampPan(); apply();
  }
  function onWheel(e) {
    e.preventDefault();
    var prev = scale;
    var factor = Math.exp(-e.deltaY * 0.0022);
    scale = Math.max(min, Math.min(max, scale * factor));
    var rect = stage.getBoundingClientRect();
    var cx = e.clientX - rect.left - rect.width / 2;
    var cy = e.clientY - rect.top - rect.height / 2;
    var k = scale / prev;
    tx = cx - (cx - tx) * k;
    ty = cy - (cy - ty) * k;
    if (scale <= 1.001) { tx = 0; ty = 0; }
    img.style.transition = 'none';
    clampPan(); apply();
    clearTimeout(onWheel._t);
    onWheel._t = setTimeout(function () { img.style.transition = 'transform .22s cubic-bezier(.32,.72,0,1)'; }, 120);
  }
  function dist() {
    var p = Array.from(pointers.values());
    return Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
  }
  function onDown(e) {
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) { pinchStart = dist(); pinchScale = scale; return; }
    dragging = true; moved = false;
    sx = e.clientX; sy = e.clientY; stx = tx; sty = ty;
    img.style.transition = 'none';
    stage.setPointerCapture && stage.setPointerCapture(e.pointerId);
    apply();
  }
  function onMove(e) {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2 && pinchStart) {
      scale = Math.max(min, Math.min(max, pinchScale * (dist() / pinchStart)));
      moved = true; clampPan(); apply(); return;
    }
    if (!dragging) return;
    var dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved = true;
    tx = stx + dx; ty = sty + dy;
    clampPan(); apply();
  }
  function onUp(e) {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinchStart = 0;
    if (pointers.size === 0) {
      dragging = false;
      img.style.transition = 'transform .22s cubic-bezier(.32,.72,0,1)';
      if (scale <= 1.001) { tx = 0; ty = 0; }
      apply();
      setTimeout(function () { moved = false; }, 60);
    }
  }

  function open(src, alt) {
    if (!overlay) build();
    img.src = src;
    img.alt = alt || '';
    reset();
    overlay.style.display = 'block';
    requestAnimationFrame(function () { overlay.style.opacity = '1'; });
    document.documentElement.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function close() {
    if (!overlay) return;
    overlay.style.opacity = '0';
    document.documentElement.style.overflow = '';
    setTimeout(function () { overlay.style.display = 'none'; img.src = ''; }, 260);
  }

  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest && e.target.closest(SEL);
    if (!el || (overlay && overlay.contains(el))) return;
    e.preventDefault();
    open(el.currentSrc || el.src, el.alt);
  });

  // affordance on the page images (stylesheet rule survives React re-renders)
  var st = document.createElement('style');
  st.textContent = '[data-diagram-zoom]{cursor:zoom-in;}';
  (document.head || document.documentElement).appendChild(st);

  window.PVDiagramZoom = { open: open, close: close };
})();
