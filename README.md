# Fitness Tracking App with AI 🏋️♂️🤖

A smart fitness platform that tracks workouts, calculates calories, provides AI-powered insights, and helps users achieve their fitness goals.

![App Architecture](https://i.imgur.com/mXyGdJl.png)

## Features ✨

- **AI-Powered Calorie Calculator**  
  - Personalized MET-based calculations
  - Gender/age-adjusted estimates
  - Activity type recognition

- **Workout Insights**  
  - Streak tracking (current/longest)
  - Workout type/duration breakdowns
  - Best performance day analysis

- **Goal Management**  
  - Calorie/workout/duration targets
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

## Tech Stack 💻

**Backend**
- Node.js/Express
- MongoDB/Mongoose
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

## API Documentation 📚

### Base URL
`{{base_url}}` (Set in Postman environment)

### Authentication 🔐
| Endpoint               | Method | Description                | Auth Required |
|------------------------|--------|----------------------------|---------------|
| `/api/auth/sign-up`    | POST   | User registration          | No            |
| `/api/auth/sign-in`    | POST   | User login                 | No            |
| `/api/auth/sign-out`   | POST   | User logout                | Yes           |
| `/api/auth/get-session`| GET    | Current session status     | Yes           |

### Activities 🏃♀️
| Endpoint          | Method | Description                | Parameters               |
|-------------------|--------|----------------------------|--------------------------|
| `/activity`       | POST   | Create new activity        | type, duration, date     |
| `/activity`       | GET    | Get all user activities    | -                        |
| `/activity/:id`   | GET    | Get specific activity      | activity ID              |
| `/activity/:id`   | PUT    | Update activity            | activity ID, updated data|
| `/activity/:id`   | DELETE | Delete activity            | activity ID              |

### Insights 📊
| Endpoint                                | Method | Description                | Query Params  |
|-----------------------------------------|--------|----------------------------|---------------|
| `/insight/calories/{range}`             | GET    | Calorie timeline           | day/week/month|
| `/insight/workout-type-breakdown`       | GET    | Activity distribution      | range         |
| `/insight/streak`                       | GET    | Current/longest streaks    | -             |
| `/insight/workout-frequency/{range}`    | GET    | Workout consistency        | day/week/month|

### Profile 👤
| Endpoint               | Method | Description                | Body Parameters          |
|------------------------|--------|----------------------------|--------------------------|
| `/user/profile`        | POST   | Create/update profile      | age, weight, goals, etc  |
| `/user/me`             | GET    | Get current user profile   | -                        |

### Goals 🎯
| Endpoint       | Method | Description                | Body                   |
|---------------|--------|----------------------------|------------------------|
| `/goals`      | PUT    | Update fitness goals       | caloriesGoal, durationGoal|

---

## AI Features Implementation 🧠

### Calorie Calculation
``` typescript
// Uses MET values with biometric adjustments
caloriesBurned = (MET × weightKg × durationHours) × genderFactor × ageFactor
Streak Detection Algorithm
javascript
Copy
function calculateStreak(dates) {
  // Tracks consecutive days with activities
  // Uses temporal gap analysis
}
```
Smart Recommendations
python
Copy
# AI Model Pseudocode
def suggest_workout(user_profile):
    analyze(activity_history, goals)
    return personalized_plan
Installation ⚙️
Clone repository

bash
Copy
git clone https://github.com/yourusername/fitness-ai-app.git
Install dependencies

bash
Copy
npm install
Configure environment (.env)

ini
Copy
MONGODB_URI=mongodb://localhost:27017/fitnessdb
JWT_SECRET=your_jwt_secret_key
PORT=3000
AI_MODEL_PATH=./ai-models/main.model
Start server

bash
Copy
npm run dev
Testing 🧪
Import Postman collections from /postman

Set environment variables:

base_url: http://localhost:3000

auth_token: (From login response)

Run collections with Newman:

bash
Copy
newman run Fitness-App-Collections.json
Future Roadmap 🗺️
Social sharing features

Wearable device integration

Advanced AI workout suggestions

Nutrition tracking module

Mobile app development

License 📄
MIT License - See LICENSE for details

Contributing 🤝
Please read CONTRIBUTING.md for development guidelines
