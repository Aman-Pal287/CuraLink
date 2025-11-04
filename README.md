# 🧠 MedLink AI – Backend API Documentation

MedLink AI is an AI-powered healthcare platform connecting **patients** and **researchers** by providing personalized access to clinical trials, medical publications, and health experts — with AI-generated summaries & smart tagging.

---

## 🚀 Tech Stack

| Layer | Technology |
|--------|--------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (HTTP-Only Cookies) |
| AI | Google Gemini (GenAI) |
| Utils | CORS, dotenv, cookie-parser |

---

## 📂 Folder Structure

backend/
│── src/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ ├── services/
│ ├── utils/
│ ├── app.js
│── server.js
│── .env
│── package.json

yaml
Copy code

---

## 🔐 Authentication

- JWT is stored in **HttpOnly Cookie**
- Protected Routes require auth
- For Postman/mobile testing add:

Authorization: Bearer <token>

pgsql
Copy code

---

## 🧪 AUTH ROUTES

| Method | Endpoint | Description | Auth |
|--------|------------|-----------------------------|--------|
| POST | `/api/auth/register` | Create account (patient / researcher) | ❌ |
| POST | `/api/auth/login` | Login & sets JWT cookie | ❌ |
| GET | `/api/auth/me` | Get logged-in user profile | ✅ |
| POST | `/api/auth/logout` | Logout user | ✅ |

### ✅ Register Body

```json
{
  "name": "Aman Verma",
  "email": "aman@example.com",
  "password": "123456",
  "role": "patient"
}
✅ Login Body
json
Copy code
{
  "email": "aman@example.com",
  "password": "123456"
}
👩‍⚕️ PATIENT ROUTES
Method	Endpoint	Description
POST	/api/patient/profile	Create/Update patient onboarding profile
GET	/api/patient/dashboard	Personalized dashboard: trials, experts, publications

🧬 Patient Profile Body
json
Copy code
{
  "rawInput": "I have brain tumor and headaches",
  "location": "Delhi, India",
  "conditions": ["brain cancer", "glioma"]
}
🧑‍🔬 RESEARCHER ROUTES
Method	Endpoint	Description
POST	/api/researcher/profile	Create/Update researcher profile
GET	/api/researcher/dashboard	Researcher dashboard data

🔬 Researcher Profile Body
json
Copy code
{
  "affiliation": "AIIMS Delhi",
  "specialties": ["Oncology", "Neurology"],
  "researchInterests": ["Immunotherapy", "Clinical AI"],
  "orcid": "0000-0002-1825-0097",
  "availability": true
}
📚 PUBLICATIONS ROUTES
Method	Endpoint	Description
POST	/api/publications	Add publication (AI summary auto-generated)
GET	/api/publications	Get all publications
GET	/api/publications/:id	Get publication details

➕ Add Publication Body
json
Copy code
{
  "title": "Advances in Brain Cancer Research",
  "authors": ["Dr. Smith", "Aman Verma"],
  "source": "Nature Medicine",
  "link": "https://nature.com/article",
  "abstract": "Brain cancer research has recently shown promising results..."
}
🧪 CLINICAL TRIALS ROUTES
Method	Endpoint	Description
POST	/api/trials	Add clinical trial
GET	/api/trials	List all trials
GET	/api/trials/:id	Trial details

➕ Add Trial Body
json
Copy code
{
  "title": "Glioma Immunotherapy Phase II Trial",
  "phase": "Phase II",
  "status": "Recruiting",
  "location": "Delhi, India",
  "contactEmail": "trial@hospital.org",
  "description": "Testing new immunotherapy treatment for glioma...",
  "criteria": "Age 30-60, Non-smoker",
  "tags": ["glioma", "immunotherapy"]
}
🧠 AI ROUTES
Method	Endpoint	Description
POST	/api/ai/summary	Generate AI summary for given text
POST	/api/ai/tags	Extract medical tags from text

🧠 Body Example
json
Copy code
{
  "text": "Glioma is a type of tumor that occurs in the brain and spinal cord..."
}
👨‍⚕️ EXPERT ROUTES (Dummy or Dynamic)
Method	Endpoint	Description
GET	/api/experts	List experts
GET	/api/experts/:id	Get expert profile

⚙️ ENV SETUP
Create .env file:

ini
Copy code
PORT=5000
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
GEMINI_API_KEY=<your_api_key>
NODE_ENV=development
▶️ Run Project
sh
Copy code
npm install
npm run dev
Seed DB:

sh
Copy code
npm run seed
✅ Success Response Format
json
Copy code
{
  "success": true,
  "data": { }
}
❌ Error Response Format
json
Copy code
{
  "success": false,
  "message": "Invalid credentials"
}
🏁 MVP Feature Status
Feature	Status
Auth with roles	✅
Patient onboarding + dashboard	✅
Researcher onboarding + AI	✅
Publications + AI summary	✅
Clinical Trials + AI summary	✅
Experts	✅
Favorites	❌ Pending
Forums	❌ Pending
Meeting Requests	🚧 In Progress

⭐ Future Enhancements
AI-powered researcher-patient matching

Real-time forum discussions

Save/Favorite system

Appointment/meeting booking

Built with ❤️ to make healthcare research accessible.

yaml
Copy code

---

If you want, I can also generate **Postman Collection** + **Swagger UI Docs** for `/api/docs`.

Should I give:

A) **Postman Collection JSON**  
B) **Swagger API Documentation**  
C) **Both**
