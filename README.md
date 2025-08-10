📝 Dynamic Form Builder
This is a dynamic, user-friendly form builder built with React and Redux. It allows users to create and configure custom forms with various field types, set advanced validation rules, and preview how the form will look and behave in real-time. All form configurations are saved and managed in the browser's localStorage.


🚀 Live Demo
You can view a live version of the project here: https://dynamic-form-builder-chi.vercel.app/


✨ Features
Dynamic Form Creation: Add and arrange fields of different types (Text, Number, Textarea, Select, Radio, Checkbox, Date).

Customizable Fields: Configure each field with its own label, required toggle, and default value.

Advanced Validation: Implement not empty, min/max length, email format, and a custom password rule.

Live Preview: View how the form will appear to end-users in a live-updating modal.

Local Persistence: All form schemas are saved and retrieved from localStorage, so your forms are always available.

Modern UI/UX: The application features a clean design with smooth transitions and is fully responsive for all devices.


📦 Tech Stack
Frontend: React, TypeScript, Redux Toolkit

UI Library: Material UI (MUI)

Routing: react-router-dom

Form Handling: react-hook-form

Utility: date-fns, nanoid

🖥️ Usage
The application has three main routes:

/create: This is the form builder interface where you can dynamically add, configure, and save new forms.

/myforms: This page displays a grid of all your previously saved forms. You can click on a card to see a live preview or delete a form.

/preview/:id: This is an internal route used to display a single form in a separate view.

⚙️ Getting Started
To run this project locally, follow these steps:

Clone the repository:
git clone https://github.com/maruti-panchal/dynamic-form-builder

Navigate to the project directory:
cd form-builder-app

Install the dependencies:
npm install

Start the development server:
npm start

The application will open in your browser at http://localhost:3000.
