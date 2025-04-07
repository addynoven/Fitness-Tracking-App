# Fitness Tracking App with AI

A smart fitness platform that tracks workouts, calculates calories, provides AI-powered insights, and helps users achieve their fitness goals.

![App Architecture](https://lh3.googleusercontent.com/pw/AP1GczMq75zYT3hROgFZ_2jrHXJ9DWsBkzZzN_GTyy2J6YjmYec2V1SAVJNoavCQNVxCJDDU0wTfYb7dJhloCMUHnanqUHWJpvWHJq7t4OnVCRAOKM3ncrg1-zEjUbX-zyPMHJimwTGVLexQBVHq48G6EUS8GA=w880-h880-s-no-gm?authuser=0)

---

## ✨ Features

- **AI-Powered Calorie Calculator**
  - Personalized MET-based calculations
  - Gender/age-adjusted estimates
  - Activity type recognition

- **Workout Insights**
  - Streak tracking (current & longest)
  - Workout type/duration breakdowns
  - Best performance day analysis

- **Goal Management**
  - Calorie, workout, and duration targets
  - Progress visualization
  - Adaptive recommendations

- **User Profile**
  - Body metrics tracking
  - Fitness level customization
  - Dietary preferences

- **Social Features**
  - Public heatmaps (opt-in)
  - Achievement sharing
  - Community challenges

---

## 💻 Tech Stack

**Backend**
- Node.js / Express
- MongoDB / Mongoose
- JWT Authentication
- TypeScript

**AI Components**
- MET-based calorie algorithm
- Streak prediction model
- Workout pattern recognition

**Tools**
- Postman (API testing)
- Newman (Collection runner)
- Swagger (Documentation)

---

## 📚 API Documentation

### Base URL

```
{{base_url}}
```
*(Set in Postman environment)*

---

### 🔐 Authentication

| Endpoint                 | Method | Description            | Auth Required |
|--------------------------|--------|------------------------|---------------|
| `/api/auth/sign-up`      | POST   | User registration      | No            |
| `/api/auth/sign-in`      | POST   | User login             | No            |
| `/api/auth/sign-out`     | POST   | User logout            | Yes           |
| `/api/auth/get-session`  | GET    | Current session status | Yes           |

---

### 🏃‍♀️ Activities

| Endpoint         | Method | Description             | Parameters               |
|------------------|--------|-------------------------|--------------------------|
| `/activity`      | POST   | Create new activity     | type, duration, date     |
| `/activity`      | GET    | Get all activities      | -                        |
| `/activity/:id`  | GET    | Get activity by ID      | activity ID              |
| `/activity/:id`  | PUT    | Update activity         | activity ID, data        |
| `/activity/:id`  | DELETE | Delete activity         | activity ID              |

---

### 📊 Insights

| Endpoint                                | Method | Description               | Query Params       |
|-----------------------------------------|--------|---------------------------|--------------------|
| `/insight/calories/{range}`             | GET    | Calorie timeline          | day/week/month     |
| `/insight/workout-type-breakdown`       | GET    | Activity distribution     | range              |
| `/insight/streak`                       | GET    | Current/longest streaks   | -                  |
| `/insight/workout-frequency/{range}`    | GET    | Workout consistency       | day/week/month     |

---

### 👤 Profile

| Endpoint         | Method | Description             | Body Parameters           |
|------------------|--------|-------------------------|---------------------------|
| `/user/profile`  | POST   | Create/Update profile   | age, weight, goals, etc.  |
| `/user/me`       | GET    | Get current user info   | -                         |

---

### 🎯 Goals

| Endpoint     | Method | Description         | Body                          |
|--------------|--------|---------------------|-------------------------------|
| `/goals`     | PUT    | Update fitness goals| caloriesGoal, durationGoal    |

---

## 🧠 AI Features

### Calorie Calculation

```ts
// Uses MET values with biometric adjustments
caloriesBurned = (MET × weightKg × durationHours) × genderFactor × ageFactor;
```

### Streak Detection

```js
function calculateStreak(dates) {
  // Tracks consecutive days with activities
  // Uses temporal gap analysis
}
```

### Smart Recommendations

```python
# AI Model Pseudocode
def suggest_workout(user_profile):
    analyze(activity_history, goals)
    return personalized_plan
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/fitness-ai-app.git
```

### Install Dependencies

```bash
npm install
```

### Configure Environment (`.env`)

```ini
MONGODB_URI=mongodb://localhost:27017/fitnessdb
JWT_SECRET=your_jwt_secret_key
PORT=3000
AI_MODEL_PATH=./ai-models/main.model
```

### Start Server

```bash
npm run dev
```

---

## 🧪 Testing

- Import Postman collections from `/postman`
- Set environment variables:

```env
base_url = http://localhost:3000
auth_token = (From login response)
```

- Run collections with Newman:

```bash
newman run Fitness-App-Collections.json
```

---

## 🗺️ Future Roadmap

- Social sharing features
- Wearable device integration
- Advanced AI workout suggestions
- Nutrition tracking module
- Mobile app development

---

## 📄 License

MIT License – See `LICENSE` file for full details

---

## 🤝 Contributing

We welcome contributions!  
Please read `CONTRIBUTING.md` for development guidelines.
