You must add the .env file before starting the project.
Copy .env.example to .env and modify the variables based on your local environment.

## Quick Start (Windows)

1. Clone the repository
2. Copy `.env.example` to `.env` in both the **backend** and **frontend** folders
3. Double-click `start-project.bat`. The ROOT directory dependency will installed.
4. For Install Backend dependency, again Double-click `start-project.bat`.
5. For Install Frontend dependency, again Double-click `start-project.bat`
6. Atlast Again Doulbe-click `start-project.bat`. Backend & Frontend will start automatically

> The script installs dependencies only if missing.


## Setup Instructions (Command line)

### 1. Clone the project into folder
```bash
git clone https://github.com/Manisha-s-2003/custom-dashboard-builder
```

### 2. Configure Environment Variables

###Backend

```bash
cd backend
```
Copy .env.example → .env

Update values if needed

PORT=4397
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/orderdb

###Frontend
```bash
cd ../frontend
```

Copy .env.example → .env

REACT_APP_API_URL=http://localhost:4397/api
PORT=3009

### Optional Environment Variables

```env
# Theme Configuration
REACT_APP_PRIMARY_COLOR=#54bd95
REACT_APP_SECONDARY_COLOR=#f44336
```

### 3. Install the dependency in root Project

```bash

cd custom-dashboard-builder
npm install
```
### 4. Set up backend and frontend dependency and start application

```bash

npm run setup
````

The application should be running
Backend: 'http://localhost:4397'
Frontend: 'http://localhost:3000'


## Setup Instructions (manual set up)

### 1. Backend Setup (Required)

Before running the frontend, ensure the backend is running:

```bash
# In a separate terminal, navigate to backend directory
cd ../backend

# Install backend dependencies
npm install
```

# Configure backend .env file

Configure environment variables:

- Ceate `.env` file and update the values if needed
- Default MongoDB URI: `mongodb://localhost:27017/orderdb`
- Default PORT: `4000`. You may create unique port number like 4397.

## Environment Variables Example

| Variable    | Description        | Default Value           |
| ----------- | ------------------ | ----------------------- |
| PORT        | Server port        | 4000                    |
| NODE_ENV    | Environment        | development             |
| MONGODB_URI | MongoDB connection | mongodb://              |
|             | string             | localhost:27017/orderdb |

---

# Start the backend server

```bash
npm run dev
```

The backend should be running on `http://localhost:4397`

### 2. Frontend Setup

````bash
# Install frontend dependencies
npm install

# Configure frontend environment
Create a `.env` file in the frontend root directory with the following variables:

```env
# API Configuration (Required)
REACT_APP_API_URL=http://localhost:4397/api

````

### Optional Environment Variables

```env
# Theme Configuration
REACT_APP_PRIMARY_COLOR=#54bd95
REACT_APP_SECONDARY_COLOR=#f44336
```

### Environment Variables Reference

| Variable                    | Description           | Default Value               | Required |
| --------------------------- | --------------------- | --------------------------- | -------- |
| `REACT_APP_API_  URL`       | Backend API           | `http://localhost:4397/api` | ✅ Yes   |
|                             | base URL              |                             |          |
| `REACT_APP_PRIMARY_COLOR`   | Primary theme color   | `#54bd95`                   | ❌ No    |
| `REACT_APP_SECONDARY_COLOR` | Secondary theme color | `#f44336`                   | ❌ No    |

# Start the frontend development server

```bash
npm start
```

### 3. Verify Setup

1. **Backend Health Check**: Visit `http://localhost:4397/api/health`
2. **Frontend Application**: Visit `http://localhost:3000`
3. **API Connection**: Check browser console for any API errors

