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
const allowedOrigins = [ 'http://localhost:5000' ]; // Frontend URL

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Middleware
app.use(express.json());

// serve static files
app.use(express.static('public'));
n
// For profileImages
app.use('/api/profile', profileRoutes);
app.use('/uploads', express.static('uploads')); // Serve static uplaods

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', dashboardRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/transactions', transactionRoutes);
app.use(errorHandler);
module.exports = app;
