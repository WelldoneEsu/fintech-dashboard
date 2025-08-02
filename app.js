const express = require('express');
const app = express();
const dotenv = require('dotenv');
// Load environment variables as early as possible
dotenv.config(); 

const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const adminRoutes = require('./routes/adminRoutes');
const profileRoutes = require('./routes/profileRoutes'); 
const errorHandler = require('./middlewares/errorHandler');
const { swaggerUi, swaggerSpec } = require('./swagger');
// Connect DB
connectDB();

//only allow frontend from a specific domain
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:3000',
    'http://localhost:5000' ]; // Frontend URL

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes (origin)) {
            callback(null, true);
        } else {
        callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running sucessfully'})
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Middleware
app.use(express.json());

// serve static files
app.use(express.static('public'));

// For profileImages
app.use('/api/profile', profileRoutes);
app.use('/uploads', express.static('uploads')); // Serve static uplaods


// A simple health check route to confirm the API is live
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: "OK" });
});


// Routes
app.use('/api/auth', authRoutes);
app.use('/api', dashboardRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/transactions', transactionRoutes);
app.use(errorHandler);
module.exports = app;
