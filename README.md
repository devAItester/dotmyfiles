``dotmyfiles`` сервис для настройки приложений на машине пользователя "в один клик"

``àpp.js`` находит файл настроек приложения и изменяет на заданные в ``app.txt`` параметры

для использования скрипта пользователю потребуется:  
- скачать и установить ``Node.JS``  
- скачать скрипт и запустить его в терминале командой ``node àpp.js``
- вводить номера предлагаемых вариантов и нажимать ``Enter``

страница для скачивания Node.JS  
страницы для скачивания скриптов:  
- Obsidian
- next app
- ...



---


``app.txt`` содержит параметры, которые надо изменить в настройках приложения на машине пользователя  


``key.txt`` содержит список актуальных параметров приложения


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
