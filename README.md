``dotmyfiles`` сервис для настройки приложений на машине пользователя "в один клик"

``àpp.js`` находит файл настроек приложения и изменяет на заданные в ``app.txt`` параметры

для использования скрипта пользователю потребуется:  
- скачать и установить ``Node.JS``  
- скачать скрипт и запустить его в терминале командой ``node àpp.js``
- вводить номера предлагаемых вариантов и нажимать ``Enter``

страница для скачивания [Node.JS](https://nodejs.org/en/download)  
страницы для скачивания скриптов:  
- [Obsidian](https://github.com/devAItester/dotmyfiles/blob/main/apps/obsidian/obsidian.js)
- next app
- ...



---
# draft:

``app.txt`` содержит параметры, которые надо изменить в настройках приложения на машине пользователя  

``key.txt`` содержит список актуальных параметров приложения

---
<details>
  <summary>📂 <b>структура</b></summary>
  <br>

```yaml
мой-проект/
├── тема 1/                      # Комментарий к первой теме
│   ├── лист-1.md                # Описание листа 1
│   ├── лист-2.md                # Описание листа 2
│   └── подтема/                 # Вложенная подпапка
│       ├── лист-3.md            # Что лежит внутри подтемы
│       └── лист-4.md            # Еще один документ
└── тема 2/                      # Комментарий ко второй теме
    ├── лист-5.md
    └── лист-6.md
```

</details>

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

* <details> — создает сам скрытый блок.
* <summary> — это заголовок, на который пользователь будет нажимать для раскрытия списка.
* style="margin-left: 20px;" — сдвигает вложенную подтему вправо, чтобы визуально сохранить дерево.
* Если вы хотите, чтобы какая-то тема была открыта по умолчанию, добавьте атрибут open в тег: <details open>.

---
Для отображения структуры файлов и папок (дерева репозитория) в README с комментариями лучше всего использовать блок кода с синтаксисом yaml или text, обернутый в уже знакомый вам тег <details> для сворачивания.
GitHub отлично рендерит такую комбинацию, и дерево будет интерактивным.
## 📌 Готовый шаблон для README.md
Скопируйте этот код в ваш файл:

<details>
  <summary>📂 <b>Посмотреть структуру проекта (нажмите, чтобы развернуть)</b></summary>
  <br>

```yaml
мой-проект/
├── тема 1/                      # Комментарий к первой теме
│   ├── лист-1.md                # Описание листа 1
│   ├── лист-2.md                # Описание листа 2
│   └── подтема/                 # Вложенная подпапка
│       ├── лист-3.md            # Что лежит внутри подтемы
│       └── лист-4.md            # Еще один документ
└── тема 2/                      # Комментарий ко второй теме
    ├── лист-5.md
    └── лист-6.md
```

</details>

------------------------------
## 🛠 Как это сделать быстро (без ручного рисования стрелочек):
Если у вас большой проект и вы не хотите рисовать символы ├── вручную, используйте консоль:

   1. Если у вас Linux/macOS (или Git Bash на Windows), введите в терминале команду в корне проекта:
   
   tree -N
   
   (Флаг -N нужен, чтобы кириллица в названиях папок отображалась корректно, а не кракозябрами).
   2. Если у вас обычная Windows-консоль (CMD):
   
   tree /F
   
   3. Скопируйте результат из терминала, вставьте в README внутрь блоков ```yaml и просто допишите свои комментарии через знак # или пробелы.

## ✨ Почему используется подсветка yaml?
Если указать ```yaml, GitHub красиво подсветит комментарии после знака # серым или зеленым цветом (в зависимости от темы пользователя), а само дерево останется нейтральным. Это делает структуру максимально читаемой.
Если у вас в проекте слишком много временных файлов (например, node_modules или .git), которые засоряют дерево команды tree, сказать вам, как отфильтровать лишние папки при генерации?





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
