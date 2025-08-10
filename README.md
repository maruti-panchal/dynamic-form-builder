# 📝 Dynamic Form Builder

> A **dynamic, user-friendly form builder** built with **React** and **Redux**. Create, customize, and preview forms in real-time — with your data safely stored in **localStorage**.

🌐 **Live Demo:** [**🚀 View Here**](https://dynamic-form-builder-chi.vercel.app/)

---

## ✨ Features

- 🎯 **Dynamic Form Creation** — Add & arrange fields: `Text`, `Number`, `Textarea`, `Select`, `Radio`, `Checkbox`, `Date`
- 🛠 **Customizable Fields** — Set label, required toggle, and default value
- 🛡 **Advanced Validation** — Not empty, min/max length, email format, custom password rules
- 👀 **Live Preview** — See form updates instantly in a modal
- 💾 **Local Persistence** — Auto-save forms to **localStorage**
- 🎨 **Modern UI/UX** — Responsive design with smooth transitions

---

## 📦 Tech Stack

| **Category**      | **Technologies** |
|-------------------|------------------|
| 🎨 Frontend       | React, TypeScript, Redux Toolkit |
| 🖌 UI Library     | Material UI (MUI) |
| 🌐 Routing        | react-router-dom |
| 📝 Form Handling  | react-hook-form |
| 🛠 Utilities      | date-fns, nanoid |

---

## 🖥️ Usage & Routes

- `/create` ➡️ **Form Builder** — Add, configure, and save forms
- `/myforms` ➡️ **Saved Forms** — View, preview, or delete saved forms
- `/preview/:id` ➡️ **Form Preview** — Display a single form in a separate view

---

## ⚙️ Getting Started

Follow these steps to run the project locally:

```bash
# 1️⃣ Clone the repository
git clone https://github.com/maruti-panchal/dynamic-form-builder

# 2️⃣ Navigate to the project folder
cd form-builder-app

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start the development server
npm start
