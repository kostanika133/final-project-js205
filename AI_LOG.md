# AI log

Every request made to an AI assistant while building this project, oldest first.

- AI coding agents such as Command Code add entries here by themselves. The rules are in `AGENTS.md`.
- If you use a chat AI in the browser, add the entry yourself, in the same format.
- Do not edit or delete entries. If you did not use AI, leave this file as it is.

AI აგენტი ყველა თქვენს მოთხოვნას აქ თვითონ წერს. თუ ბრაუზერის ჩატს იყენებთ (ChatGPT, Claude, Gemini), ჩანაწერი იმავე ფორმატით თქვენ დაამატეთ. ჩანაწერებს ნუ შეცვლით და ნუ წაშლით.

Format:

    ### 1 · 2026-10-14 19:42
    **Prompt:**
    > your message, word for word
    **Type:** explain | debug | review | plan | code | refused | other
    **What I did:** one or two sentences.
    **Files changed:** `js/api.js`, or "none"

---

### 1 · 2026-10-19 19:08
**Prompt:**
> grade the project based of teachers system dont execute unnesesary commands
**Type:** review
**What I did:** Read SCORING.md, PROJECTS.md and all project files, then graded the app against the rubric.
**Files changed:** none

---

### 2 · 2026-10-19 19:49
**Prompt:**
> can you fix css if anything is wrong? only css no other files
**Type:** code
**What I did:** Fixed two CSS bugs: added #phone-error to the error styling, and wired the dark-mode variables (--bg, --text, --border, --primary, --primary-dark) into body, buttons, inputs and card borders so the theme toggle actually works.
**Files changed:** `style.css`

---

### 3 · 2026-10-19 19:54
**Prompt:**
> also is everything allright in the file? should i finnly push it?
**Type:** review
**What I did:** Reviewed style.css and ran git status; confirmed the CSS is correct and pointed out that style.css and AI_LOG.md are still uncommitted, with the commit/push commands.
**Files changed:** none
