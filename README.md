Dynamic Form Builder
This is a dynamic, user-friendly form builder built with React and Redux. It allows users to create and configure custom forms with various field types, set advanced validation rules, and preview how the form will look and behave in real-time. All form configurations are saved and managed in the browser's local storage.

✨ Features
Dynamic Form Creation: Add and arrange fields of different types (Text, Number, Textarea, Select, Radio, Checkbox, Date).

Customizable Fields: Configure each field with a label, required toggle, and default value.

Advanced Validation: Set rules for minimum/maximum length, email format, and a custom password rule.

Live Preview: View how the form will appear to end-users in a live-updating modal.

Form Persistence: All form schemas are saved and retrieved from localStorage, so your forms are always available.

Clean UI/UX: The application features a modern, responsive design with smooth animations.

🚀 Tech Stack
Frontend: React, TypeScript, Redux Toolkit

UI Library: Material UI (MUI)

Routing: react-router-dom

Form Handling: react-hook-form

Utility: date-fns, nanoid

📦 Getting Started
To get the project running on your local machine, follow these steps:

Clone the repository:
git clone <repository-url>

Navigate to the project directory:
cd form-builder-app

Install the dependencies:
npm install

Start the development server:
npm start

The application will open in your browser at http://localhost:3000.

🖥️ Usage
The application has three main routes:

/create: The form builder interface where you can add, configure, and save new forms.

/myforms: Displays a grid of all your saved forms. Click on a card to see a live preview or delete a form.

/preview/:id: (Internal route) Used to display a single form in a separate view.