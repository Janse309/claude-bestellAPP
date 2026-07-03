# BestellApp – BurgerHouse

Eine Bestell-App für den fiktiven Lieferservice **BurgerHouse**, umgesetzt nach Figma-Design mit Vanilla HTML, CSS und JavaScript — ohne Frameworks und ohne Build-Schritt.

## Features

- **Speisekarte** mit drei Kategorien (Burger & Sandwiches, Pizza, Greens), gerendert aus einem Daten-Array
- **Warenkorb** mit Mengensteuerung (+/−), Zwischensumme, Liefergebühr und Gesamtpreis
- **Persistenz**: Der Warenkorb bleibt über `localStorage` auch nach einem Reload erhalten
- **Bestellbestätigung** als zentrierter Dialog, schließt automatisch nach 3 Sekunden
- **Responsive**:
  - *Desktop (ab 1001px)*: Warenkorb ploppt beim Hinzufügen eines Gerichts automatisch als fixiertes Panel rechts auf; die Gericht-Karten rücken dabei nach links
  - *Mobile (bis 1000px)*: Warenkorb öffnet sich nur über das Basket-Symbol in der fixierten Bottom-Nav (Toggle) und erscheint als zentriertes, schwebendes Panel
  - Content auf **1440px** begrenzt und zentriert; Header, Hero, Kategorie-Bänder und Footer laufen full-bleed über die volle Bildschirmbreite
- **Bedienung**: Schließen des Warenkorbs per ✕, erneutem Klick aufs Basket-Symbol oder ESC-Taste

## Starten

Kein Build nötig — einfach `index.html` im Browser öffnen (Doppelklick oder z.B. mit der VS-Code-Erweiterung *Live Server*).

## Projektstruktur

```
bestellapp/
├── index.html            # Seitengerüst (Header, Hero, Menü, Warenkorb, Overlays, Bottom-Nav)
├── style.css             # Komplettes Styling inkl. Responsive-Breakpoints (1000px, 600px)
├── script.js             # Logik: Rendern, Warenkorb-Aktionen, localStorage, Navigation
├── scripts/
│   ├── dishes.js         # Daten: Kategorien, Gerichte, Liefergebühr
│   └── template.js       # HTML-Template-Funktionen (Menü- und Warenkorb-Markup)
├── LOG.md                # Änderungslog mit Arbeitsschritten und Verifikation
└── README.md
```

## Hinweise

- Die Food-Fotos aus dem Figma-Design sind aktuell durch **Emoji-Platzhalter** ersetzt; echte Bilder können später eingebaut werden.
- Bewusste Ergänzungen zum Figma-Entwurf (Warenkorb-Verhalten, Content-Begrenzung, Timings) sind in der [LOG.md](LOG.md) dokumentiert.
