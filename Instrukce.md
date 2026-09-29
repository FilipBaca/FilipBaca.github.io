# PROJEKT: Tvorba frontendového UI pro web "Fitko na Hegerce"

## 1. Hlavní pravidla a kontext (CRITICAL)
- **Role:** Chovej se jako expertní frontend developer a UI/UX designer.
- **Cíl:** Vytvořit čistý, moderní a responzivní web pro malé fitness centrum (70m2) s názvem "Fitko na Hegerce".
- **Zákaz generického "AI slopu":** Web musí působit profesionálně a minimalisticky. Nepoužívej přehnané stíny, zbytečné gradienty ani přeplácané animace. Zůstaň u čistých linií a geometrického layoutu.
- **Právní a bezpečnostní rámec:** Kód musí být připraven v souladu s GDPR (formuláře) a základními principy kyberbezpečnosti (obrana proti XSS na frontendu, správné typy inputů, příprava pro bezpečné odesílání dat do backendu).
- **Architektura:** Jedná se striktně o **Multi-page aplikaci (MPA)**. Každá položka v menu musí odkazovat na samostatný soubor (např. `o-nas.html`, `vstupy.html`), **nikoliv** jen scrollovat dolů na jedné stránce (nepoužívat anchor linky typu `href="#onas"`).
- **Technologie:** Čisté HTML, CSS (nebo Tailwind, pokud preferuješ) a Vanilla JavaScript. Žádné složité frameworky typu React pro tuto fázi.

## 2. Grafický manuál (Design System)

### Barvy (Strikně dodržet HEX kódy)
- **Primární akční (Tmavě červená):** `#9B1B22` (Tlačítka, hover efekty, klíčové akcenty).
- **Sekundární (Průmyslová šedá):** `#5C5C5C` (Sekundární tlačítka, okraje, oddělovače).
- **Text (Tmavá břidlicová):** `#1A1A1A` (Veškerá běžná typografie, nepoužívat `#000000`).
- **Pozadí (Čistá bílá):** `#FFFFFF` (Hlavní plochy, aby červená a šedá vynikly).

### Typografie
- **Hlavní font (UI, Tlačítka, Nadpisy):** `Montserrat` (z Google Fonts).
  - Tlačítka v navigaci musí být `text-transform: uppercase`, řez Semi-Bold (600) s mírným rozestupem písmen (`letter-spacing: 0.05em`).
- **Sekundární font (Dlouhé texty):** `Inter` nebo ponechat Montserrat v normálním řezu.

### Logo
- Momentálně neexistuje. V levém horním rohu navigace vytvoř pouze prázdný, sémanticky správný placeholder (např. `<div class="logo-placeholder"></div>`), který bude mít rozměry připravené pro obdélníkové/čtvercové logo.

## 3. Navigace (Navbar)
Navbar musí být přítomný na všech stránkách a obsahovat odkazy na tyto samostatné HTML soubory:
1. **Úvod** (`index.html`)
2. **O nás** (`o-nas.html`)
3. **Vstupy** (`vstupy.html`)
4. **Fitko** (`fitko.html`)
5. **Přihlásit** (`login.html`)
6. **Vytvořit účet** (`registrace.html`) - zobrazeno jako primární akční tlačítko (červené `#9B1B22`).

## 4. Specifické stránky a jejich obsah

### Stránka "Fitko" (`fitko.html`)
- Místo pro galerii. Zatím zde nebudou reálné fotky, ale musíš vytvořit přesné **placeholdery** (šedé obdélníky s popiskem uvnitř, ideálně přes CSS aspect-ratio).
- Požadované placeholdery:
  - 1x Fotka šaten
  - 2x Fotka prostorů fitka (stroje)
  - 1x Fotka celé budovy zvenku

### Stránka "Vytvořit účet" (`registrace.html`)
- Formulář musí být designově čistý a připravený na budoucí POST request do backendu/databáze (všechny inputy musí mít `name` a `id`).
- **Požadovaná pole:**
  - Jméno (`type="text"`)
  - Příjmení (`type="text"`)
  - Telefonní číslo (`type="tel"`)
  - E-mailová adresa (`type="email"`)
  - Datum narození (`type="date"`)
  - Heslo (`type="password"`, min. 8 znaků)
  - Kontrola hesla (`type="password"`)
- **Funkcionalita hesla (JavaScript):** Tlačítko/ikonka (např. oko), která umožní přepínat mezi zobrazením hesla jako teček (výchozí) a normálního textu. Obě pole hesla musí reagovat správně.

## 5. Patička (Footer)
Musí být na všech stránkách. Bude obsahovat kontaktní údaje, které musí být **klikací se správnými HTML protokoly**:
- **E-mail:** `filipbaca01@gmail.com` -> odkaz musí mít formát `href="mailto:filipbaca01@gmail.com"`.
- **Telefon:** `+420 778 437 692` -> odkaz musí mít formát `href="tel:+420778437692"`.
- **Adresa:** `Polička: Sídl. Hegerova 1019` -> odkaz musí vést na Google Maps (např. `href="https://www.google.com/maps/search/?api=1&query=Sídl.+Hegerova+1019,+Polička"`), aby uživatele hned hodil do navigace.

## 6. Technické & Bezpečnostní požadavky
- **Security-first Frontend:** Ačkoli je obrana proti DDoS věcí backendu (např. Cloudflare, Rate Limiting na serveru), frontend na to musí být připraven. Tlačítka formulářů by po kliknutí (odeslání) měla mít stav `disabled`, aby uživatel nemohl formulář odeslat stokrát za vteřinu (client-side prevence spamu).
- **Validace:** Použij striktní HTML5 validaci (`required`, `minlength="8"` u hesla, `pattern` pro telefonní číslo), aby do backendu neodcházela nesmyslná data.
- **Bezpečná hesla:** Neukládej nic do LocalStorage. Formulář použije metodu `POST` (připraveno v HTML `<form method="POST">`).
- **Responsivita:** Vše musí dokonale fungovat na mobilním telefonu (hamburger menu pro navigaci atd.).