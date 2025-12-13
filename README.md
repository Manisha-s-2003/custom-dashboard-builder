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

# Development Server Configuration (Required)
PORT=3009
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
| `PORT`                      | Frontend development  | `3009`                      | ✅ Yes   |
|                             | server port           |                             |          |
| `REACT_APP_PRIMARY_COLOR`   | Primary theme color   | `#54bd95`                   | ❌ No    |
| `REACT_APP_SECONDARY_COLOR` | Secondary theme color | `#f44336`                   | ❌ No    |

# Start the frontend development server

```bash
npm start
```

### 3. Verify Setup

1. **Backend Health Check**: Visit `http://localhost:4397/api/health`
2. **Frontend Application**: Visit `http://localhost:3009`
3. **API Connection**: Check browser console for any API errors

## Setup Instructions (command line)

### 1. Clone the project into folder

````bash

git clone https://github.com/Manisha-s-2003/custom-dashboard-builder

### 2. Install the dependency in root Project

```bash

cd custom-dashboard-builder
npm install

### 3. Set up backend and frontend dependency and start application

```bash

npm run setup
````

The application should be running on the `http://localhost:4397`
