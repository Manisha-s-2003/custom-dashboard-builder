# Order Management API Server

Backend API server for the Order Management System built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Navigate to the server directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Ceate `.env` file and update the values if needed
   - Default MongoDB URI: `mongodb://localhost:27017/orderdb`
   - Default PORT: `4000`. You may create unique port number like 4397.

## Environment Variables Example

| Variable    | Description        | Default Value          |
|-------------|--------------------|------------------------|
| PORT        | Server port        | 4000                   |
| NODE_ENV    | Environment        | development            |
| MONGODB_URI | MongoDB connection | mongodb://             |
|             |  string            |localhost:27017/orderdb |
-------------------------------------------------------------

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:4000`

## MongoDB Setup

### Option 1: Local MongoDB
1. Install MongoDB on your machine
2. Start MongoDB service:
   - Windows: `net start MongoDB`
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

### Option 2: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env` file:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/orderdb
```

## API Endpoints

### Health Check
- **GET** `/api/health` - Check if server is running

### Orders
- **POST** `/api/orders` - Create a new order
- **GET** `/api/orders` - Get all orders (with pagination)
- **GET** `/api/orders/:id` - Get order by ID
- **PATCH** `/api/orders/:id` - Update order
- **PUT** `/api/orders/:id` - Update order
- **DELETE** `/api/orders/:id` - Delete order

## Project Structure

```
server/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   └── orderController.js # Order business logic
│   └── dashboardcontroller.js #dashboard business logic
├── models/
│   └── Order.js           # Order schema
│   └── Dashboard.js       # Dashboard schema
├── routes/
│   └── orderRoutes.js     # API routes
│   └── dashboardRoutes.js     # API routes
├── utils/
│   └── idGenerator.js     # ID generation utilities
├── .env                   # Environment variables
├── .gitignore            # Git ignore file
├── server.js               # Server entry point
├── package.json          # Dependencies
└── README.md             # This file
```

## Testing the API

### Using curl:
```bash
# Health check
curl http://localhost:3000/api/health

# Create order
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ORD-1001",
    "customerId": "CUST-001",

    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phoneNumber": "1234567890",

    "streetAddress": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA",

    "product": "Product A",
    "quantity": 2,
    "unitPrice": 29.99,
    "totalAmount": 59.98,

    "status": "Pending",
    "createdBy": "admin"
  }'


# Get all orders
curl http://localhost:3000/api/orders
```

### Using Postman:
Import the API endpoints and test them using Postman or any API testing tool.

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check the connection string in `.env`
- Verify network connectivity

### Port Already in Use
- Change the PORT in `.env` file
- Or kill the process using the port:
  - Windows: `netstat -ano | findstr :3000` then `taskkill /PID <PID> /F`
  - Mac/Linux: `lsof -ti:3000 | xargs kill`

### CORS Issues
- The server is configured to allow all origins
- For production, update CORS settings in `main.js`

## License

ISC
