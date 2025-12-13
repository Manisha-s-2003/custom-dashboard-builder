# Dashboard Application Frontend

A comprehensive dashboard application with configurable widgets, customer order management, and data visualization built with React and Material-UI.

## Features

### 📊 Dashboard
- **Configurable Widgets**: Drag-and-drop widget configuration
- **Date Filtering**: All time, Today, Last 7/30/90 Days
- **Real-time Updates**: Dynamic data visualization
- **Responsive Design**: Works on desktop and mobile devices

### 📋 Customer Orders
- **Order Management**: Create, edit, and delete customer orders
- **Form Validation**: Email and phone number format validation
- **Comprehensive Forms**: Customer and order information
- **Context Actions**: Quick actions for order management

### 🎯 Widget Types
- **KPI Cards**: Display aggregated metrics (Sum, Average, Count)
- **Charts**: Bar, Line, Area, Scatter, and Pie charts with customizable styling
- **Tables**: Advanced filtering, sorting, and pagination
- **Custom Styling**: Configurable colors, fonts, and layouts

## Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Backend API Server** (see backend README)

## Installation

1. **Clone the repository** (if not already done):
```bash
git clone <repository-url>
cd <project-name>/frontend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure environment variables**:
```bash

# Edit the .env file with your configuration
nano .env  # or use your preferred editor
```

## Environment Configuration

### Required Environment Variables

Create a `.env` file in the frontend root directory with the following variables:

```env
# API Configuration (Required)
REACT_APP_API_URL=http://localhost:4397/api

# Development Server Configuration (Required)
PORT=3009
```

### Optional Environment Variables

```env
# Theme Configuration
REACT_APP_PRIMARY_COLOR=#54bd95
REACT_APP_SECONDARY_COLOR=#f44336
```

### Environment Variables Reference

| Variable               | Description       | Default Value              | Required |
|------------------------|-------------------|--------------------------- |----------|
| `REACT_APP_API_  URL`  |Backend API        |`http://localhost:4397/api` | ✅ Yes  |
|                        |  base URL         |                            |          |
| `PORT`                 | Frontend development| `3009`                   | ✅ Yes   |
|                        |   server port       |                          |          |
| `REACT_APP_PRIMARY_COLOR`   | Primary theme color   | `#54bd95`         | ❌ No  |
| `REACT_APP_SECONDARY_COLOR` | Secondary theme color | `#f44336`          | ❌ No  |

## Running the Application

### Development Mode
```bash
npm start
```
- Opens [http://localhost:3009](http://localhost:3009) in your browser
- Hot reload enabled for development
- Source maps enabled for debugging

### Production Build
```bash
npm run build
```
- Creates optimized production build in `build/` folder
- Minified and optimized for performance

### Testing
```bash
npm test
```
- Runs the test suite in interactive watch mode
- Uses Jest and React Testing Library

## Setup Instructions

### 1. Backend Setup (Required)
Before running the frontend, ensure the backend is running:

```bash
# In a separate terminal, navigate to backend directory
cd ../backend

# Install backend dependencies
npm install

# Configure backend .env file
 Configure environment variables:
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

# Start the backend server
npm run dev
```

The backend should be running on `http://localhost:4397`

### 2. Frontend Setup
```bash
# Install frontend dependencies
npm install

# Configure frontend environment
Create a `.env` file in the frontend root directory with the following variables:

```env
# API Configuration (Required)
REACT_APP_API_URL=http://localhost:4397/api

# Development Server Configuration (Required)
PORT=3009
```

### Optional Environment Variables

```env
# Theme Configuration
REACT_APP_PRIMARY_COLOR=#54bd95
REACT_APP_SECONDARY_COLOR=#f44336
```

### Environment Variables Reference

| Variable               | Description       | Default Value              | Required |
|------------------------|-------------------|--------------------------- |----------|
| `REACT_APP_API_  URL`  |Backend API        |`http://localhost:4397/api` | ✅ Yes  |
|                        |  base URL         |                            |          |
| `PORT`                 | Frontend development| `3009`                   | ✅ Yes   |
|                        |   server port       |                          |          |
| `REACT_APP_PRIMARY_COLOR`   | Primary theme color   | `#54bd95`         | ❌ No  |
| `REACT_APP_SECONDARY_COLOR` | Secondary theme color | `#f44336`          | ❌ No  |


# Start the frontend development server
npm start
```

### 3. Verify Setup
1. **Backend Health Check**: Visit `http://localhost:4397/api/health`
2. **Frontend Application**: Visit `http://localhost:3009`
3. **API Connection**: Check browser console for any API errors

## Development Workflow

### 1. Adding New Features
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and test
npm start

# Run tests
npm test

# Build for production
npm run build
```

### 2. Environment-Specific Configuration

#### Development
```env
REACT_APP_API_URL=http://localhost:4397/api
REACT_APP_ENABLE_DEBUG=true
```

#### Staging
```env
REACT_APP_API_URL=https://staging-api.yourdomain.com/api
REACT_APP_ENABLE_ANALYTICS=true
```

#### Production
```env
REACT_APP_API_URL=https://api.yourdomain.com/api
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_DEBUG=false
```

## Project Structure

```
frontend/
├── public/
│   ├── index.html              # HTML template
│   └── favicon.ico             # App icon
├── src/
│   ├── components/
│   │   ├── Button/             # Reusable button component
│   │   ├── Dashboard/          # Dashboard components
│   │   │   ├── WidgetLibrarySidebar.js
│   │   │   └── DashboardGrid.js
│   │   ├── Orders/             # Order management components
│   │   │   ├── OrderForm.js    # Order creation/editing form
│   │   │   ├── OrderDialog.js  # Order modal dialog
│   │   │   └── OrdersTable.js  # Orders data table
│   │   └── WidgetsAction/      # Widget system
│   │       ├── WidgetConfigPanel.js  # Widget configuration
│   │       ├── WidgetRenderer.js     # Main widget orchestrator
│   │       └── widgets/        # Individual widget components
│   │           ├── index.js    # Widget exports
│   │           ├── KPIWidget.js        # KPI metrics widget
│   │           ├── ChartWidget.js      # Chart widgets (Bar, Line, etc.)
│   │           ├── PieChartWidget.js   # Pie chart widget
│   │           ├── TableWidget.js      # Table widget with filtering
│   │           ├── CustomLegendContent.js  # Reusable legend
│   │           └── CustomXAxisTick.js      # Reusable axis labels
│   ├── context/
│   │   ├── DashboardContext.js # Dashboard state management
│   │   └── OrderContext.js     # Order data management
│   ├── data/
│   │   ├── orderData.js        # Sample order data
│   │   └── widgetData.js       # Widget configuration data
│   ├── pages/
│   │   ├── Dashboard.js        # Main dashboard view
│   │   ├── DashboardConfig.js  # Dashboard configuration page
│   │   └── CustomerOrders.js   # Customer orders management
│   ├── App.js                  # Main application component
│   ├── App.css                 # Global styles
│   └── index.js                # Application entry point
├── .env                        # Environment variables
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## Usage Guide

### 🚀 Getting Started

1. **Start the Application**:
```bash
npm start
```

2. **Navigate to Dashboard**: 
   - Visit `http://localhost:3009`
   - Main dashboard displays configured widgets

### 📊 Dashboard Management

#### Creating Widgets
1. **Access Configuration**: Click "Configure Dashboard" button
2. **Add Widgets**: Drag widgets from the left panel to the canvas
3. **Position Widgets**: Drag widgets to desired positions
4. **Resize Widgets**: Drag corners to resize widgets
5. **Save Configuration**: Click "Save Configuration" to apply changes

#### Widget Types & Configuration

##### KPI Widgets
- **Purpose**: Display single metric values
- **Configuration**:
  - Select metric (Total amount, Quantity, etc.)
  - Choose aggregation (Sum, Average, Count)
  - Set data format (Number, Currency)
  - Configure decimal precision

##### Chart Widgets (Bar, Line, Area, Scatter)
- **Purpose**: Visualize data relationships
- **Configuration**:
  - Choose X-Axis data field
  - Choose Y-Axis data field
  - Enable/disable data labels
  - Customize chart colors

##### Pie Chart Widgets
- **Purpose**: Show data distribution
- **Configuration**:
  - Select chart data field
  - Enable/disable legend (default: enabled)
  - Automatic color schemes

##### Table Widgets
- **Purpose**: Display detailed data with filtering
- **Configuration**:
  - Select columns to display
  - Configure sorting options
  - Set pagination (5, 10, 15 rows)
  - Enable advanced filtering
  - Customize font size and header colors

#### Advanced Table Filtering
1. **Enable Filtering**: Check "Apply filter" in widget configuration
2. **Add Filter Rules**: Click "Add filter" button
3. **Configure Filters**:
   - **Choose Attribute**: Select column to filter
   - **Select Operator**: =, ≠, >, >=, <, <=, contains
   - **Enter Value**: Filter value
4. **Multiple Filters**: Add multiple filter rules (AND logic)
5. **Remove Filters**: Click X button on individual filters

### 📋 Order Management

#### Creating Orders
1. **Navigate**: Go to "Customer Orders" page
2. **New Order**: Click "Create Order" button
3. **Fill Form**: Complete customer and order information
4. **Validation**: Form validates email and phone formats
5. **Submit**: Click "Submit" to create order

#### Order Form Validation
- **Email**: Must be valid format (user@example.com)
- **Phone**: Accepts international formats (+1234567890)
- **Required Fields**: All fields marked with * are required
- **Real-time Validation**: Errors clear as you type

#### Managing Orders
- **Edit**: Click edit icon on any order
- **Delete**: Click delete icon to remove order
- **View Details**: Click on order row for details

### 🎨 Customization

#### Theme Configuration
The application supports custom theme colors through environment variables:

```env
# In .env file
REACT_APP_PRIMARY_COLOR=#54bd95    # Green theme (default)
REACT_APP_SECONDARY_COLOR=#f44336  # Red accents (default)
```

**Example Color Schemes:**

```env
# Blue Theme
REACT_APP_PRIMARY_COLOR=#2196f3
REACT_APP_SECONDARY_COLOR=#ff9800

# Purple Theme  
REACT_APP_PRIMARY_COLOR=#9c27b0
REACT_APP_SECONDARY_COLOR=#4caf50

# Dark Theme
REACT_APP_PRIMARY_COLOR=#424242
REACT_APP_SECONDARY_COLOR=#ff5722
```

**What Changes:**
- ✅ **Buttons**: Primary and secondary button colors
- ✅ **Charts**: Default chart colors and color palette
- ✅ **Tables**: Header background colors (when not customized)
- ✅ **Form Elements**: Focus states, checkboxes, text field borders
- ✅ **Icons**: Delete buttons and accent colors
- ✅ **Widgets**: KPI colors and chart themes

#### Widget Styling
- **Table Headers**: Configurable background colors
- **Chart Colors**: Customizable chart color schemes
- **Font Sizes**: Adjustable table font sizes
- **Responsive**: Automatic responsive behavior

## Technologies & Dependencies

### Core Technologies
- **React 19**: Latest React with concurrent features
- **Material-UI v7**: Modern React component library
- **React Router v7**: Client-side routing
- **Context API**: State management

### Data Visualization
- **Recharts 3.5**: Chart library for React
- **React Grid Layout**: Drag-and-drop grid system

### Development Tools
- **React Scripts 5.0**: Build tooling
- **Testing Library**: Component testing
- **ESLint**: Code linting
- **Axios**: HTTP client for API calls

### UI Components
- **Lucide React**: Modern icon library
- **Emotion**: CSS-in-JS styling
- **AG Grid**: Advanced data grid (if needed)

## Troubleshooting

### Common Issues

#### 1. API Connection Errors
```bash
# Check if backend is running
curl http://localhost:4397/api/health

# Verify .env configuration
cat .env
```

#### 2. Port Already in Use
```bash
# Change PORT in .env file
PORT=3010

# Or kill existing process
# Windows: netstat -ano | findstr :3009
# Mac/Linux: lsof -ti:3009 | xargs kill
```

#### 3. Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear React cache
npm start -- --reset-cache
```

#### 4. Environment Variables Not Loading
- Ensure variables start with `REACT_APP_`
- Restart development server after .env changes
- Check for syntax errors in .env file

### Performance Optimization

#### Production Build
```bash
# Create optimized build
npm run build

# Serve build locally for testing
npx serve -s build -l 3009
```

#### Bundle Analysis
```bash
# Install bundle analyzer
npm install --save-dev webpack-bundle-analyzer

# Analyze bundle size
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

## Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

## License

This project is licensed under the ISC License.
