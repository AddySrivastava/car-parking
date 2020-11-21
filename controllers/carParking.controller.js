const fs = require('fs');
const path = require('path');
const eventStream = require('event-stream');
const parkingSlotHelper = require('../helpers/carParkingHelper');
const parkingSlotModel = require('../models/carParkingModel');
const { PARK, CAR_NUM_FOR_AGE, CREATE_PARKING, SLOT_NUM_FOR_AGE, SLOT_NUM_FOR_CAR_NUM, LEAVE } = require('../utils/carParkingConstants');

const inputBasePath = path.resolve(__dirname, '../inputContainer');
const outPutBasePath = path.resolve(__dirname, '../outputContainer');


const parseCarParkingSlot = (line, outputFilePath) => {
    let operations = line.split(' ');
    const task = operations[0];
    let parkRegister = null;

    if (!fs.existsSync(outputFilePath) && task == CREATE_PARKING)
        parkingSlotModel.saveFile({}, outputFilePath);
    else (!fs.existsSync(outputFilePath) && task != CREATE_PARKING)
    parkRegister = JSON.parse(fs.readFileSync(outputFilePath, 'utf8'));


    // Run iterations on every operation
    switch (task) {
        case CREATE_PARKING:
            parkingSlotHelper.createParkingLot(operations[1], outputFilePath);
            break;
        case PARK:
            parkingSlotHelper.park(operations[3], operations[1], parkRegister, outputFilePath);
            break;
        case SLOT_NUM_FOR_AGE:
            parkingSlotHelper.getSlotNumForAge(operations[1], parkRegister);
            break;
        case SLOT_NUM_FOR_CAR_NUM:
            parkingSlotHelper.getSlotNumForCarNum(operations[1], parkRegister);
            break;
        case LEAVE:
            parkingSlotHelper.leave(operations[1], parkRegister, outputFilePath);
            break;
        case CAR_NUM_FOR_AGE:
            parkingSlotHelper.getCarNumForAge(operations[1], parkRegister);
            break;
        default:
            break;
    }
}

exports.manageCarParking = (req, res) => {
    const { fileName } = req.body;

    const inputFilePath = path.resolve(`${inputBasePath}/${fileName}.txt`);

    if (!fs.existsSync(inputFilePath)) return res.status(404).json({ err: 'File does not exist, file name should not include extension' });


    const outputFilePath = path.resolve(`${outPutBasePath}/${fileName}_result.json`);

    const s = fs.createReadStream(inputFilePath)
        .pipe(eventStream.split()) // split stream to break on newlines
        .pipe(eventStream.mapSync((line) => {
            s.pause();
            parseCarParkingSlot(line, outputFilePath);
            s.resume();
        })
            .on('error', (err) => {
                console.log(err);
                return res.status(500).json({ msg: 'Something went wrong while managing parking' });
            })
            .on('end', () => {
                return res.status(200).json({ msg: 'Success!! Result file is saved in ' + outputFilePath });
            })
        );
}