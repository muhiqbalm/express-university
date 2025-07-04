# 🎓 University Backend System

A RESTful API built with **Express.js** to manage a university backend system. This system handles entities such as students, lecturers, subjects, users, student details, and study plans.

---

## 📦 Features

- 🔐 Authentication & authorization using JWT
- 👨‍🎓 Manage students (`Student`) and their personal details (`StudentDetail`)
- 👨‍🏫 Manage lecturers (`Lecturer`)
- 📚 Manage subjects (`Subject`)
- 📋 Manage student study plans (`StudyPlan`)
- 👥 User management (`User`) with role-based access (admin, student, lecturer)

---

## 🧱 Entity Structure

### `User`

- `id`
- `username`
- `password` (hashed)
- `role` (admin, user)

### `Student`

- `id`
- `first_name`
- `last_name`
- `email`
- `gender`

### `StudentDetail`

- `id`
- `id_student` → FK to `Student`
- `age`
- `phone_number`
- `address`

### `Lecturer`

- `id`
- `first_name`
- `last_name`
- `email`
- `gender`

### `Subject`

- `id`
- `name`
- `sks`
- `id_lecturer` → FK to `Lecturer`

### `StudyPlan`

- `id`
- `id_student` → FK to `Student`
- `id_subject` → FK to `Subject`
- `semester`

---

## 🚀 Installation

```bash
git clone https://github.com/muhiqbalm/express-university.git
cd express-university
npm install
```
