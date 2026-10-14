`dotmy` скрипт для локальной настройки приложений "в один клик"

`app.js` ищет файлы настроек приложения и  
изменяет в них параметры на заданные в `app.txt`

для использования скрипта пользователю потребуется:  
- скачать и установить `node.js`  
- скачать и запустить в терминале скрипт командой `node app.js`
- вводить номера предлагаемых вариантов и нажимать `enter`

ссылка для скачивания [node.js](https://nodejs.org/en/download)  
ссылки для скачивания скриптов:
- [dotmy](/dotmy.js)
- [Obsidian](/apps/obsidian/obsidian.js)
- next app
- ... 
```shell
[niri](https://github.com/niri-wm/niri/wiki/Configuration%3A-Introduction)
[foot](https://codeberg.org/dnkl/foot)
[alacritty](https://github.com/alacritty/alacritty/blob/master/alacritty/src/config/mod.rs)
[yazi](https://github.com/sxyazi/yazi/blob/main/yazi-config/preset/yazi-default.toml)
[micro](https://github.com/micro-editor/micro/blob/master/runtime/help/options.md)
[zed](https://github.com/zed-industries/zed/blob/main/assets/settings/default.json)
[obsidian](https://github.com/devAItester/dotmyfiles/blob/main/apps/obsidian/obsidian.js)
```

- ...  
<details>
  <summary>🗀 dotmyfiles</summary>
  <br>

```yaml
[root]/
├── apps/                      # Комментарий к первой теме
│   ├── лист-1.md                # Описание листа 1
│   ├── лист-2.md                # Описание листа 2
│   └── подтема/                 # Вложенная подпапка
│       ├── лист-3.md            # Что лежит внутри подтемы
│       └── лист-4.md            # Еще один документ
└── scrypts/                      # Комментарий ко второй теме
    ├── лист-5.md
    └── лист-6.md
```
</details>
<details>
  <summary>🗁 faq</summary>
<details>
  <summary>как скачать Node.JS</summary>
<details">
  <summary>как ...</summary>
</details>
</details>



---
```shell
[niri](https://github.com/niri-wm/niri/wiki/Configuration%3A-Introduction)
[foot](https://codeberg.org/dnkl/foot)
[alacritty](https://github.com/alacritty/alacritty/blob/master/alacritty/src/config/mod.rs)
[yazi](https://github.com/sxyazi/yazi/blob/main/yazi-config/preset/yazi-default.toml)
[micro](https://github.com/micro-editor/micro/blob/master/runtime/help/options.md)
[zed](https://github.com/zed-industries/zed/blob/main/assets/settings/default.json)
[obsidian](https://github.com/devAItester/dotmyfiles/blob/main/apps/obsidian/obsidian.js)
```



# draft:

<details>
  <summary>🗁 faq</summary>
  <br>
<details>
  <summary>как скачать Node.JS</summary>
* [[Лист 5]]
* [[Лист 6]]
  <details">
    <summary>как ...</summary>
* [[Лист 7]]
* [[Лист 8]]
  </details>
</details>


``app.txt`` содержит параметры, которые надо изменить в настройках приложения на машине пользователя  

``key.txt`` содержит список актуальных параметров приложения

---
Linux/macOS:  tree -N  
Windows:      tree /F   

### **FAQ**

<details>
  <summary><b>как скачать Node.JS</b></summary>

  * [[Лист 1]]
  * [[Лист 2]]
  <details style="margin-left: 20px;">
    <summary><b>Подтема</b></summary>
    
    * [[Лист 3]]
    * [[Лист 4]]
  </details>
</details>

<details>
  <summary><b>все скпипты</b></summary>

  * [[Лист 5]]
  * [[Лист 6]]
  <details style="margin-left: 20px;">
    <summary><b>Подтема</b></summary>
    
    * [[Лист 7]]
    * [[Лист 8]]
  </details>
</details>

## 💡 Как это работает:
## 📌 Готовый README.md

---
micro    https://github.com/micro-editor/micro/blob/master/runtime/help/options.md
zed    https://github.com/zed-industries/zed/blob/main/assets/settings/default.json


vscode    https://github.com/microsoft/vscode-docs/blob/main/docs/reference/default-settings.md
neovim    https://neovim.io/doc/user/options.html
helix    https://docs.helix-editor.com/configuration.html



`download → convert-flat → manual-select` 

## 1. IDE и текстовые редакторы

```
ide    zed    https://github.com/zed-industries/zed/blob/main/assets/settings/default.json
ide    vscode    https://github.com/microsoft/vscode-docs/blob/main/docs/reference/default-settings.md
editor    micro    https://github.com/micro-editor/micro/blob/master/runtime/help/options.md
editor    neovim    https://neovim.io/doc/user/options.html
editor    helix    https://docs.helix-editor.com/configuration.html
```

## 2. Терминалы

```
terminal    foot    https://codeberg.org/dnkl/foot
terminal    kitty    https://sw.kovidgoyal.net/kitty/conf/
terminal    alacritty    https://github.com/alacritty/alacritty/blob/master/alacritty/src/config/mod.rs
terminal    wezterm    https://wezfurlong.org/wezterm/config/files.html
```

## 3. Оконный менеджер и композитор

```
compositor    niri    https://github.com/niri-wm/niri/wiki/Configuration%3A-Introduction
compositor    sway    https://man.archlinux.org/man/sway.5.en
compositor    hyprland    https://wiki.hypr.land/Configuring/
```

## 4. Лаунчеры приложений

```
launcher    fuzzel    https://manpages.debian.org/trixie/fuzzel/fuzzel.ini.5.en.html
launcher    rofi    https://github.com/davatorium/rofi/blob/next/CONFIG.md
```

## 5. Файловые менеджеры

```
file-manager    yazi    https://github.com/sxyazi/yazi/blob/main/yazi-config/preset/yazi-default.toml
file-manager    yazi-keymap    https://github.com/sxyazi/yazi/blob/main/yazi-config/preset/keymap-default.toml
file-manager    ranger    https://github.com/ranger/ranger
file-manager    lf    https://github.com/gokcehan/lf
file-manager    nnn    https://github.com/jarun/nnn
```


## 6. Заметки и браузеры

```
notes    obsidian    недоступно
browser    firefox    недоступно
browser    chromium    https://www.chromium.org/developers/
```

## Что я бы взял в первую очередь

| Приоритет | Приложение | Почему                                                                  |
| --------- | ---------- | ----------------------------------------------------------------------- |
| 1         | Zed        | Готовый JSON, удобно конвертировать                                     |
| 2         | VS Code    | Есть полный JSON настроек по умолчанию                                  |
| 3         | Micro      | Простой список параметров и значений                                    |
| 4         | Yazi       | Готовые конфиги, отдельно настройки и клавиши                           |
| 5         | Rofi       | Можно получить конфиг из установленного приложения                      |
| 6         | Niri       | Полезный пример конфигурации в другом формате                           |
| 7         | Foot       | Документация есть, способ извлечения полного списка ещё нужно проверить |




---

zed    ~/.config/zed/settings.json
micro    ~/.config/micro/settings.json
vscode    ~/.config/Code/User/settings.json
neovim    ~/.config/nvim/
helix    ~/.config/helix/config.toml
yazi    ~/.config/yazi/yazi.toml
yazi    ~/.config/yazi/keymap.toml
yazi    ~/.config/yazi/theme.toml
rofi    ~/.config/rofi/config.rasi
niri    ~/.config/niri/config.kdl

---

---
## Obsidian · per-OS settings

[Download the project ZIP](https://github.com/devAItester/dotmyfiles/archive/refs/heads/main.zip) and extract it.

**Requirement:** [Node.js 18 or newer](https://nodejs.org/en/download). No npm packages are required.

Open a terminal in the extracted `dotmyfiles-main` folder and run:

```bash
node main.js
```

### What it does

- Reads enabled task paths from `main.md`; comment out a line to disable that task.
- The Obsidian task reads `apps/obsidian/obsidian.md` and accepts only keys listed in `apps/obsidian/property-obsidian.txt`.
- Finds Obsidian's local registry, lists registered vaults, and asks which one to configure.
- Creates the OS-specific configuration folder (`.obsidian-win`, `.obsidian-arch` or `.obsidian-mac`) by copying `.obsidian` when available.
- Updates only enabled `app.json` keys. Existing `app.json` is backed up before it is changed. The default `.obsidian` folder is not deleted.

The script checks whether Obsidian is running and asks you to close it if needed. It asks for confirmation before writing.

### Finish setup in Obsidian

After the script finishes, open the selected vault and go to **Settings → Files and links → Override config folder**. Enter the reported folder name and restart Obsidian. The script does not change this application-level setting itself.

Do not delete the old `.obsidian` folder until you have confirmed that Obsidian is using the new folder.

---

## Project

The root README is the service front page. `main.md` connects tasks; each task has a Markdown settings source and a same-named JavaScript handler. Shared property registries define which settings can be changed.

Keep the implementation small and split by responsibility. The `web/` directory is reserved for web-facing Markdown if a concrete need appears. Remaining runtime checks and follow-up work are tracked in [TODO.txt](TODO.txt). Automated tests are deferred for now.
