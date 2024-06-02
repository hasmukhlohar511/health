require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const jwtService = require("./services/jwtService");
const routeList = require("./routes/routeList");

const connectToDatabase = require('./config/database');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const routeHandler = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());// Basic CORS setup
app.use(helmet()); // Secure your Express app by using Helmet
app.use(logger('dev')); // Use morgan to log requests to the console
app.use(express.json()); // Middleware to parse JSON
app.use(fileUpload());

app.use(helmet.contentSecurityPolicy()); // Helps prevent cross-site scripting (XSS), clickjacking, and other code injection

// Connect to the database
connectToDatabase();

app.get('/health', (req, res) => {
    const dbState = mongoose.connection.readyState;
    const isDbConnected = dbState === 1; // 1 means connected
    if (isDbConnected) {
        res.status(200).send(`
        <html>
            <body>
                <h1>Health Check</h1>
                <p>Server Status: <strong>UP</strong></p>
                <p>Database Status: <strong>Connected</strong></p>
            </body>
        </html>
        `);
    } else {
        res.status(503).send(`
        <html>
            <body>
                <h1>Health Check</h1>
                <p>Server Status: <strong>DOWN</strong></p>
                <p>Database Status: <strong>Disconnected</strong></p>
            </body>
        </html>
    `);
    }
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/', isAuthenticated(process.env.JWT_SECRET), routeHandler);

function isAuthenticated(secretKey) {

    const PUBLIC_ROUTES = Object.values(routeList).filter(route => route.access === 'public').map(route => route.routeName);

    return async (req, res, next) => {
        // Get the token from the request headers
        const token = req.headers['authorization'];
        const routeName = req.body['routeName'];

        if (routeName && PUBLIC_ROUTES.includes(routeName)) {
            next();
            return;
        }

        // Check if token exists and starts with "Bearer "
        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Extract the token (remove "Bearer " part)
        const tokenValue = token.substring(7);

        jwtService.verify(tokenValue, secretKey).then((res) => {
            req.decodedToken = res
            next();
        }).catch((err) => {
            console.log("/n", err, "/n")
            return res.status(200).json({message: 'Unauthorized', data: null, status:false, code: 401 });
        });
    };
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
