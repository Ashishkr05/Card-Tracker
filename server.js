const express = require('express'); 
const connectDB = require('./db');
const importData = require('./dataProcessor');
const CardStatus = require('./models/CardStatus');
const moment = require('moment');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());

const statusPriority = {
    'RETURNED': 3,
    'EXCEPTION': 2,
    'DELIVERED': 1,
    'PICKED_UP': 0,
};

const normalizeInput = (input) => {
    return input ? input.replace(/"/g, '').trim().replace(/^0+/, '') : null;
};

app.get('/get_card_status', async (req, res) => {
    const { phone, cardID } = req.query;

    const normalizedPhone = normalizeInput(phone);
    const normalizedCardID = normalizeInput(cardID);

    if (!normalizedPhone && !normalizedCardID) {
        return res.status(400).json({ error: "Please provide a phone number or card ID." });
    }

    try {
        const query = normalizedPhone ? { userMobile: normalizedPhone } : { cardID: normalizedCardID };
        const cardStatuses = await CardStatus.find(query).sort({ timestamp: -1 });

        if (!cardStatuses.length) {
            return res.status(404).json({ message: "No status found for the provided information." });
        }

        let finalStatus = null;
        let highestPriority = -1;

        for (const status of cardStatuses) {
            const currentPriority = statusPriority[status.status];
            if (currentPriority > highestPriority) {
                highestPriority = currentPriority;
                finalStatus = status;
            }
        }

        if (finalStatus) {
            finalStatus.timestamp = moment(finalStatus.timestamp).format('DD-MM-YYYY HH:mm');
            return res.json(finalStatus);
        } else {
            return res.status(404).json({ message: "No valid status found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
});

const startServer = async () => {
    await importData();
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer();
