# BestellApp – Änderungslog

Dokumentiert Änderungen an der BestellApp, die über den ursprünglichen Figma-Entwurf hinausgehen bzw. ihn ergänzen.

---

## 03.07.2026

### Bestellbestätigung
- Schließt automatisch nach **3 Sekunden** (Timer in `buyNow()`, `script.js`). Manuelles Schließen per ✕ oder Klick auf den Hintergrund geht weiterhin.
- Dialog **vertikal und horizontal zentriert** (Flexbox auf `#confirmation-overlay`) statt festem Abstand von oben.
- Dialog **vergrößert**: Breite 440px, mehr Innenabstand, Icon 68px, Überschrift 32px, Text 18px.

### Warenkorb – Desktop (ab 1001px)
- Standardmäßig **ausgeblendet**; **ploppt automatisch auf**, sobald ein Gericht hinzugefügt wird (Scale-/Fade-Animation `basket-pop`).
- **Sofort fixiert** (`position: fixed` statt `sticky`): klebt ab dem Öffnen rechts unter dem Header, unabhängig von der Scroll-Position; die Gericht-Karten rücken über einen reservierten Rand nach links.
- Bleibt danach offen, damit weiterbestellt werden kann; schließbar über den ✕-Button (jetzt auch auf Desktop sichtbar).
- **Kein** abdunkelndes Overlay auf Desktop, damit das Menü bedienbar bleibt.
- Öffnet sich beim Seiten-Reload automatisch, wenn bereits Artikel im Warenkorb liegen (localStorage).
- Mindesthöhe `calc(100vh - 240px)`, damit die Sidebar von Anfang an lang wirkt (auf Wunsch etwas kürzer als die erste Version).

### Warenkorb – Mobile (bis 1000px)
- Öffnet sich **nur** über das Basket-Symbol in der Bottom-Nav — **nicht** automatisch beim Hinzufügen.
- Basket-Symbol ist ein **Toggle**: erneuter Klick schließt das Panel wieder (`toggleBasket()`).
- Klick/Tipp **neben das Panel schließt es nicht** — schließen nur per ✕ oder Basket-Symbol (Klick-Handler vom Overlay entfernt).
- **ESC-Taste schließt den Warenkorb** (global, wirkt auch auf Desktop).
- **Horizontaler Seiten-Overflow behoben**: Die Hero-Emoji-Reihe war auf schmalen Displays breiter als der Viewport und drückte die Seite auf (Ursache für instabil wirkende `fixed`-Elemente wie die Bottom-Nav beim Scrollen). Jetzt clippt `.hero-emojis` per `overflow: hidden`; verifiziert bei 390px und 320px (`scrollWidth` = Viewport-Breite).
- Panel ist **vom rechten Rand gelöst und zentriert**: schwebendes Panel in der Mitte (horizontal via `left/right` + `margin: auto`, vertikal mittig über der Bottom-Nav), rundum abgerundete Ecken, Scale-/Fade-Einblendung statt Slide-in von rechts.
- Mindesthöhe `min(700px, calc(100vh - 90px))`, damit das Panel auch mit wenig Inhalt lang wirkt; bei viel Inhalt scrollt es intern.
- Bottom-Nav (Home, Menü, Warenkorb) ist `position: fixed` am unteren Rand — bleibt beim Scrollen stehen (per Scroll-Probe verifiziert).

### Layout / Content-Begrenzung
- **Content auf 1440px begrenzt und zentriert** (`--page-max` in `style.css`; gilt für `body` und `.layout`).
- **Full-bleed über die volle Bildschirmbreite** laufen: Header, Hero-Banner, orange Kategorie-Bänder, Footer.
- Der **Inhalt** der full-bleed Balken (Logo + Menü-Icon im Header, Icon + Überschrift der Kategorie-Bänder) ist per dynamischem Padding an der **1440px-Kante ausgerichtet** statt am Bildschirmrand.
- Warenkorb endet an der 1440px-Kante (ragt nicht mehr bis zum Bildschirmrand).
- **Gericht-Karten zentriert** (`.dish-list` mit `margin: 0 auto`); beim Aufploppen des Warenkorbs rücken sie automatisch leicht nach links.

### Code-Struktur
- Neuer Ordner `scripts/` angelegt.
- HTML-Templates aus `script.js` in **`scripts/template.js`** ausgelagert (Trennung Logik/Template): `categoryTemplate`, `dishTemplate`, `emptyBasketTemplate`, `basketItemTemplate`, `basketSummaryTemplate`.
- `dishes.js` nach **`scripts/dishes.js`** verschoben.
- `script.js` (Wurzel) enthält nur noch Logik; Script-Reihenfolge in `index.html`: `scripts/dishes.js` → `scripts/template.js` → `script.js`.

### Arbeitsschritte (chronologisch)
1. **Bestellbestätigung** auf 3-Sekunden-Auto-Schließung umgestellt (`setTimeout` in `buyNow()`); später zentriert (Flexbox-Overlay) und vergrößert.
2. **Warenkorb-Verhalten getrennt**: Desktop öffnet automatisch beim Hinzufügen (`addToBasket` → `openBasket` nur bei >1000px via `matchMedia`), Mobile nur über das Basket-Symbol.
3. **Code-Struktur refaktoriert**: `scripts/`-Ordner angelegt, Template-Funktionen aus `script.js` in `scripts/template.js` ausgelagert, `dishes.js` dorthin verschoben, Script-Tags in `index.html` angepasst.
4. **Gericht-Karten zentriert** (`margin: 0 auto` auf `.dish-list`), damit sie beim Öffnen des Warenkorbs nach links rücken.
5. **Content-Begrenzung 1440px** eingeführt (`--page-max`); nach Feedback in mehreren Runden korrigiert: orange Balken + Hero wieder full-bleed, Layout-Container von 1200px auf 1440px verbreitert, Warenkorb an der 1440px-Kante gestoppt, Balken-Inhalt (Logo, Kategorie-Icon + Titel) per dynamischem Padding an der Content-Kante ausgerichtet.
6. **Mobile-Panel umgebaut**: vom rechten Rand gelöst, zentriert (robust via `left/right` + `margin: auto` statt `100vw`-Rechnung), rundum abgerundet, Scale-/Fade-Einblendung; Mindesthöhe in zwei Schritten auf 700px erhöht.
7. **Desktop-Warenkorb von `sticky` auf `fixed`** umgestellt, nachdem er sich erst beim Scrollen anheftete; Platz für die Karten wird seitdem über einen reservierten Rand freigehalten.
8. **Schließ-Verhalten verfeinert**: Klick neben das Panel schließt nicht mehr (Overlay-Handler entfernt), ESC-Taste schließt den Warenkorb, Basket-Symbol togglet.
9. **Bug "Bottom-Nav verschwindet beim Scrollen" diagnostiziert**: per DOM-Messproben horizontalen Seiten-Overflow gefunden (Hero-Emojis breiter als schmale Viewports) und durch `overflow: hidden` auf der Emoji-Reihe behoben.

### Verifikation
- Layout bei 1920px Breite per Headless-Chrome-Screenshots geprüft (Warenkorb offen und geschlossen): Content-Begrenzung, full-bleed Balken und Balken-Inhaltsausrichtung sitzen korrekt.
- Mobile-Panel-Zentrierung und -Höhe per Screenshot (800px) und DOM-Messung bestätigt (32px links / 31px rechts).
- Fixierung der Bottom-Nav per Scroll-Probe belegt (bei 1500px Scroll-Tiefe exakt am Viewport-Boden); Desktop-Warenkorb bei Scroll 0 und 800px an identischer Position.
- Horizontaler Overflow nach dem Fix bei 390px und 320px Viewport-Breite gemessen: `scrollWidth` = Viewport-Breite, kein Überstand mehr.
