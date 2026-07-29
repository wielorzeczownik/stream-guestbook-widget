<h1 align="center">Stream Guestbook Widget</h1>

<p align="center">
  <a href="https://github.com/wielorzeczownik/stream-guestbook-widget/actions/workflows/release.yml"><picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/actions/workflow/status/wielorzeczownik/stream-guestbook-widget/release.yml?branch=main&style=flat-square&labelColor=2d333b&color=3fb950"/><source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/actions/workflow/status/wielorzeczownik/stream-guestbook-widget/release.yml?branch=main&style=flat-square&color=2ea043"/><img src="https://img.shields.io/github/actions/workflow/status/wielorzeczownik/stream-guestbook-widget/release.yml?branch=main&style=flat-square&labelColor=2d333b&color=3fb950" alt="Build"/></picture></a> <a href="https://github.com/wielorzeczownik/stream-guestbook-widget/releases/latest"><picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/v/release/wielorzeczownik/stream-guestbook-widget?style=flat-square&labelColor=2d333b&color=3fb950"/><source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/v/release/wielorzeczownik/stream-guestbook-widget?style=flat-square&color=2ea043"/><img src="https://img.shields.io/github/v/release/wielorzeczownik/stream-guestbook-widget?style=flat-square&labelColor=2d333b&color=3fb950" alt="Najnowsze wydanie"/></picture></a> <a href="https://github.com/wielorzeczownik/stream-guestbook-widget/blob/main/LICENSE"><picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/License-MIT-3fb950?style=flat-square&labelColor=2d333b"/><source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/License-MIT-2ea043?style=flat-square"/><img src="https://img.shields.io/badge/License-MIT-3fb950?style=flat-square&labelColor=2d333b" alt="Licencja: MIT"/></picture></a>
  <br/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
  <a href="https://github.com/sigma-cw/widget-io"><img src="https://img.shields.io/badge/widget.io-compatible-3fb950?style=flat-square&labelColor=2d333b" alt="widget.io compatible"/></a>
  <img src="https://img.shields.io/badge/StreamElements-FEB800?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDJMMiA3bDEwIDUgMTAtNXoiLz48L3N2Zz4=&logoColor=white" alt="StreamElements"/>
  <img src="https://img.shields.io/badge/Twitch-9146FF?style=flat-square&logo=twitch&logoColor=white" alt="Twitch"/>
  <img src="https://img.shields.io/badge/YouTube-FF0000?style=flat-square&logo=youtube&logoColor=white" alt="YouTube"/>
  <img src="https://img.shields.io/badge/Kick-53FC18?style=flat-square&logo=kick&logoColor=black" alt="Kick"/>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/wielorzeczownik/stream-guestbook-widget/main/assets/demo.webp" alt="Stream Guestbook Widget – animacja nakładki księgi gości w StreamElements" width="600"/>
</p>

<p align="center">🇬🇧 <a href="README.md">English</a> | 🇵🇱 Polski</p>

Darmowy widget do StreamElements dla Twitcha, YouTube i Kicka – widzowie podpisują wirtualną księgę gości komendą na czacie lub poprzez Channel Points. Zlicza wizyty i prowadzi tablicę wyników.

## Jak to działa

Widzowie wpisują komendę na czacie lub realizują nagrodę Channel Points na Twitchu, żeby podpisać księgę. Na ekranie pojawia się animacja otwierającej się książki. Każdy podpis jest zapamiętywany między streamami – widzowie mogą sprawdzić ile razy się podpisali i rywalizować o miejsce na tablicy wyników.

## Funkcje

- **Podpisywanie komendą czatu** lub **Channel Points** (tylko Twitch)
- **Wieloplatformowość** – Twitch, YouTube i Kick
- **Licznik wizyt** – widzowie sprawdzają swój wynik komendą `!visits`
- **Tablica wyników** – wysyłanie rankingu na czat komendą `!top`
- **W pełni konfigurowalny** – odpowiedzi na czacie z placeholderami `{name}`, `{count}`, `{target}`
- **Narzędzia moderatorskie** – reset pojedynczego użytkownika lub wyczyszczenie wszystkich danych
- **Wygląd** – kolor okładki, stron, pieczątki, własne tekstury dla każdego elementu
- **Animacja przewracania** – trzy prędkości, konfigurowalna długość wyświetlania

## Instalacja

Pobierz najnowsze wydanie z [GitHub Releases](https://github.com/wielorzeczownik/stream-guestbook-widget/releases/latest):

| Plik                                                                                                                                 | Dla                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| [guestbook-widgetio.zip](https://github.com/wielorzeczownik/stream-guestbook-widget/releases/latest/download/guestbook-widgetio.zip) | [widget.io](https://github.com/sigma-cw/widget-io) – import bezpośrednio |
| [guestbook.zip](https://github.com/wielorzeczownik/stream-guestbook-widget/releases/latest/download/guestbook.zip)                   | StreamElements custom widget – import ręczny                             |

### [widget.io](https://github.com/sigma-cw/widget-io)

1. Pobierz [guestbook-widgetio.zip](https://github.com/wielorzeczownik/stream-guestbook-widget/releases/latest/download/guestbook-widgetio.zip).
2. W [widget.io](https://github.com/sigma-cw/widget-io) kliknij **Import** i wybierz plik zip.
3. Skonfiguruj i zapisz.

### StreamElements custom widget

1. Pobierz [guestbook.zip](https://github.com/wielorzeczownik/stream-guestbook-widget/releases/latest/download/guestbook.zip) i rozpakuj.
2. Przejdź do **My Overlays** → **New Overlay** → **Add Widget** → **Custom Widget**.
3. Kliknij **Open Editor** i wypełnij każdą zakładkę odpowiednim plikiem z archiwum:
   - **HTML** → `HTML.html`
   - **CSS** → `CSS.css`
   - **JS** → `SCRIPT.js`
   - **Fields** → `FIELDS.json`
4. Kliknij **Done**, skonfiguruj pola widgetu i zapisz.

## Konfiguracja

### Twitch: Channel Points

1. Utwórz nagrodę Channel Points o nazwie dokładnie **Sign Guestbook** (lub zgodnie z ustawieniami widgetu).
2. W ustawieniach widgetu włącz **Enable Channel Points reward**.
3. Wyłącz **Enable sign command on Twitch**, jeśli nie chcesz komendy czatu równolegle.

### Twitch: komenda czatu

Włącz **Enable sign command on Twitch** w ustawieniach widgetu. Widzowie używają `!sign` (lub własnej nazwy komendy) na czacie.

### YouTube / Kick

Komenda czatu jest domyślnie włączona dla platform innych niż Twitch. Nie wymaga dodatkowej konfiguracji.

### Token JWT StreamElements

Widget potrzebuje tokena JWT do wysyłania wiadomości na czat.

1. Przejdź do [StreamElements Dashboard](https://streamelements.com/dashboard/account/channels).
2. Kliknij **Copy** przy tokenie JWT swojego kanału.
3. Wklej go w pole **StreamElements JWT token** w ustawieniach widgetu.

## Ustawienia

Każde ustawienie poniżej jest polem w edytorze widgetu. Wartości spoza dopuszczalnego zakresu są przycinane, a nie odrzucane – widget zawsze się uruchamia.

### General

| Pole                           | Typ    | Domyślnie | Dopuszczalne         | Znaczenie                                                                             |
| ------------------------------ | ------ | --------- | -------------------- | ------------------------------------------------------------------------------------- |
| **StreamElements JWT token**   | tekst  | _(puste)_ | dowolne              | Wymagany do wysyłania wiadomości na czat. Bez niego widget nadal animuje, ale milczy. |
| **Display duration (seconds)** | liczba | `5`       | `1`–`60`             | Jak długo księga pozostaje otwarta. Wartości poniżej `1` są podnoszone do `1`.        |
| **Flip speed**                 | lista  | `Normal`  | Slow / Normal / Fast | Mnożnik czasu animacji: Slow to 2×, Fast to 0,5×.                                     |

### Signing

| Pole                                                       | Typ      | Domyślnie                                            | Dopuszczalne | Znaczenie                                                                             |
| ---------------------------------------------------------- | -------- | ---------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------- |
| **Sign command name**                                      | tekst    | `sign`                                               | dowolne      | Komenda wpisywana przez widzów, bez prefiksu `!`.                                     |
| **Enable sign command on Twitch**                          | checkbox | wyłączone                                            | wł. / wył.   | Domyślnie wyłączone, żeby na Twitchu wyzwalaczem były wyłącznie Punkty Kanału.        |
| **Enable sign command on other platforms (YouTube, Kick)** | checkbox | włączone                                             | wł. / wył.   | Te platformy nie mają Punktów Kanału, więc komenda jest jedynym wyzwalaczem.          |
| **Enable Channel Points reward (Twitch only)**             | checkbox | włączone                                             | wł. / wył.   | Ignorowane na YouTube i Kicku.                                                        |
| **Channel Points reward name (Twitch)**                    | tekst    | `Sign Guestbook`                                     | dowolne      | Musi **dokładnie** odpowiadać nazwie nagrody na Twitchu, łącznie z wielkością liter.  |
| **Enable sign animation**                                  | checkbox | włączone                                             | wł. / wył.   | Wyłączone zachowuje liczniki i odpowiedzi na czacie, ale nic nie pokazuje na ekranie. |
| **Enable sign message in chat**                            | checkbox | włączone                                             | wł. / wył.   | Wymaga tokenu JWT.                                                                    |
| **Sign message**                                           | tekst    | `@{name} signed the Guestbook for the {count} time!` | dowolne      | `{name}` to podpisujący, `{count}` jego nowa suma.                                    |
| **Streak reset after X days without signing**              | liczba   | `7`                                                  | `1`–`365`    | Dni nieobecności kasujące serię widza. Wartości poniżej `1` są podnoszone do `1`.     |

### Reset

| Pole                                 | Typ      | Domyślnie                                       | Dopuszczalne | Znaczenie                                                         |
| ------------------------------------ | -------- | ----------------------------------------------- | ------------ | ----------------------------------------------------------------- |
| **Enable reset command**             | checkbox | wyłączone                                       | wł. / wył.   | Domyślnie wyłączone – reset jest nieodwracalny i tylko dla modów. |
| **Allow users to reset themselves**  | checkbox | wyłączone                                       | wł. / wył.   | Włączone pozwala każdemu widzowi skasować własny wpis.            |
| **Reset command name**               | tekst    | `reset`                                         | dowolne      | Nazwa komendy, bez prefiksu `!`.                                  |
| **Reset message (self)**             | tekst    | `@{name}, your Guestbook entry has been reset!` | dowolne      | `{name}` to widz, który zresetował samego siebie.                 |
| **Reset message (mod resets other)** | tekst    | `@{target}'s Guestbook entry has been reset!`   | dowolne      | `{target}` to zresetowany widz.                                   |
| **Reset message (user not found)**   | tekst    | `@{target} hasn't signed the Guestbook yet!`    | dowolne      | Wysyłane, gdy wskazany widz nie ma wpisu.                         |

### Visits

| Pole                                                 | Typ      | Domyślnie                                               | Dopuszczalne | Znaczenie                                            |
| ---------------------------------------------------- | -------- | ------------------------------------------------------- | ------------ | ---------------------------------------------------- |
| **Enable visits command**                            | checkbox | włączone                                                | wł. / wył.   | Pozwala widzom sprawdzić własną liczbę podpisów.     |
| **Enable visits animation**                          | checkbox | włączone                                                | wł. / wył.   | Wyłączone odpowiada na czacie bez otwierania księgi. |
| **Visits command name**                              | tekst    | `visits`                                                | dowolne      | Nazwa komendy, bez prefiksu `!`.                     |
| **Visits message (signed)**                          | tekst    | `@{name}, you've signed the Guestbook {count} time(s)!` | dowolne      | `{name}`, `{count}`.                                 |
| **Visits message (never signed)**                    | tekst    | `@{name}, you haven't signed the Guestbook yet!`        | dowolne      | `{name}`.                                            |
| **Visits message for mods checking others (signed)** | tekst    | `@{target} has signed the Guestbook {count} time(s)!`   | dowolne      | `{target}`, `{count}`.                               |
| **Visits message for mods checking others (never)**  | tekst    | `@{target} hasn't signed the Guestbook yet!`            | dowolne      | `{target}`.                                          |

### Top

| Pole                                | Typ      | Domyślnie                              | Dopuszczalne | Znaczenie                                  |
| ----------------------------------- | -------- | -------------------------------------- | ------------ | ------------------------------------------ |
| **Enable top command**              | checkbox | włączone                               | wł. / wył.   | Pozwala widzom wysłać ranking na czat.     |
| **Top command name**                | tekst    | `top`                                  | dowolne      | Nazwa komendy, bez prefiksu `!`.           |
| **Number of top visitors to show**  | liczba   | `5`                                    | `1`–`20`     | Wartości poniżej `1` są podnoszone do `1`. |
| **Top message**                     | tekst    | `Top visitors: {list}`                 | dowolne      | `{list}` to wyrenderowany ranking.         |
| **Top message (nobody signed yet)** | tekst    | `Nobody has signed the Guestbook yet!` | dowolne      | Wysyłane, gdy księga gości jest pusta.     |

### Appearance

| Pole                                      | Typ    | Domyślnie | Dopuszczalne  | Znaczenie                                         |
| ----------------------------------------- | ------ | --------- | ------------- | ------------------------------------------------- |
| **Stamps per page**                       | liczba | `6`       | `1`–`50`      | Podpisy rysowane na stronie, zanim się przewróci. |
| **Cover color**                           | kolor  | `#1b1920` | dowolny kolor | Ignorowane, gdy ustawiono teksturę okładki.       |
| **Front cover texture (overrides color)** | obraz  | _(puste)_ | URL lub plik  | Zastępuje kolor przedniej okładki.                |
| **Back cover texture (overrides color)**  | obraz  | _(puste)_ | URL lub plik  | Zastępuje kolor tylnej okładki.                   |
| **Page color**                            | kolor  | `#ffffff` | dowolny kolor | Ignorowane, gdy ustawiono teksturę strony.        |
| **Page texture (overrides page color)**   | obraz  | _(puste)_ | URL lub plik  | Zastępuje kolor strony.                           |
| **Stamp color**                           | kolor  | `#1b1920` | dowolny kolor | Ignorowane, gdy ustawiono teksturę pieczątki.     |
| **Stamp texture (empty = circle)**        | obraz  | _(puste)_ | URL lub plik  | Puste rysuje zwykłe wypełnione koło.              |

## Komendy

| Komenda         | Kto może używać | Co robi                                   |
| --------------- | --------------- | ----------------------------------------- |
| `!sign`         | Wszyscy         | Podpisuje księgę gości                    |
| `!visits`       | Wszyscy         | Pokazuje ile razy użytkownik się podpisał |
| `!visits @user` | Moderatorzy     | Pokazuje liczbę wizyt innego użytkownika  |
| `!top`          | Wszyscy         | Wysyła na czat ranking najlepszych gości  |
| `!reset`        | Moderatorzy     | Resetuje wpis użytkownika w księdze gości |

Wszystkie nazwy komend są konfigurowalne w ustawieniach widgetu.

## Budowanie ze źródeł

Wymagania: [Node.js](https://nodejs.org) 24+.

```bash
git clone https://github.com/wielorzeczownik/stream-guestbook-widget.git
cd stream-guestbook-widget
npm install
npm run build
```

Zbudowane pliki widgetu trafiają do `widget/compiled/`. Paczka gotowa dla StreamElements jest w `widget/dist/`. Eksport dla [widget.io](https://github.com/sigma-cw/widget-io) jest w `widget/export/`.

## Uznania

Animacja przewracania książki jest zaadaptowana z CodePen autorstwa [Nayary Alves](https://codepen.io/diemoritat) – [oryginalny pen](https://codepen.io/diemoritat/pen/LKROYZ).
