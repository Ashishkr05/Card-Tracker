const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const CardStatus = require('./models/CardStatus');
const moment = require('moment');

const processCSV = async (filePath, type) => {
    const results = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
            const cardID = data['Card ID'].replace(/"/g, '').trim();
            const userMobile = (data['User Mobile'] || data['User contact'] || '').replace(/"/g, '').trim().replace(/^0+/, '');
            const parsedDate = moment(data['Timestamp'], 'DD-MM-YYYY hh:mm A').isValid() ? moment(data['Timestamp'], 'DD-MM-YYYY hh:mm A').toDate() : new Date(data['Timestamp']);

            results.push({
                cardID: cardID,
                userMobile: userMobile,
                timestamp: parsedDate,
                status: type,
                comment: data['Comment'] || null,
            });
        })
        .on('end', async () => {
            await CardStatus.insertMany(results);
            console.log(`${type} data processed and saved.`);
        });
};

const importData = async () => {
    await processCSV('data/pickup.csv', 'PICKED_UP');
    await processCSV('data/delivered.csv', 'DELIVERED');
    await processCSV('data/Delivery-exceptions.csv', 'EXCEPTION');
    await processCSV('data/returned.csv', 'RETURNED');
};

module.exports = importData;
