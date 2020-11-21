const fs = require('fs');
const path = require('path');
const carParkingModel = require('../models/carParkingModel');


exports.createParkingLot = (size, outputFilePath) => {
    // initialize the parking slot with size as available size and bookedSlots which represent total slots available
    let bookedSlots = {};
    for (let slot = 1; slot <= size; slot++) {
        bookedSlots[slot] = null;
    }
    try {
        carParkingModel.saveFile({ size, bookedSlots }, outputFilePath);
        console.log('Created parking of ' + size + ' slots');
    } catch (err) {
        console.error(err);
        throw err;
    }
}

exports.park = (driver_age, car_num, parkRegister, outputFilePath) => {
    // Return if all slots are full
    if (parkRegister.size <= 0) {
        console.log('All parking spots are full');
        return;
    }

    const { bookedSlots } = parkRegister;

    let acquiredSpot = null;

    for (const [spot, cars] of Object.entries(bookedSlots)) {
        // check for first available spot and break once we get the spot
        if (!cars) {
            bookedSlots[spot] = {
                driver_age,
                car_num
            }
            acquiredSpot = spot;
            break;
        }
    }

    parkRegister['size'] -= 1;

    try {
        carParkingModel.saveFile(parkRegister, outputFilePath);
        console.log('Car with vehicle registration number ' + car_num + ' has been parked at slot num ' + acquiredSpot);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

exports.getSlotNumForAge = (age, parkRegister) => {
    const desiredSpotsForAge = [];
    for (const [spots, cars] of Object.entries(parkRegister['bookedSlots'])) {
        if (cars && (cars['driver_age'] === age)) {
            desiredSpotsForAge.push(spots);
        }
    }
    if (desiredSpotsForAge.length > 0) console.log(...desiredSpotsForAge)
    else console.log(null);
    return desiredSpotsForAge;
}

exports.getSlotNumForCarNum = (car_num, parkRegister) => {
    let slotNum = null;
    for (const [spots, cars] of Object.entries(parkRegister['bookedSlots'])) {
        if (cars && (cars['car_num'] === car_num)) {
            slotNum = spots;
            break;
        }
    }
    console.log(slotNum);
    return slotNum;
}

exports.leave = (spot, parkRegister, outputFilePath) => {
    let vehicle = null;
    if (!parkRegister.bookedSlots[spot]) {
        console.log('Parking spot not valid');
        return;
    }

    vehicle = parkRegister.bookedSlots[spot];
    parkRegister.bookedSlots[spot] = null;
    parkRegister.size += 1;

    try {
        carParkingModel.saveFile(parkRegister, outputFilePath);
        console.log('Slot number ' + spot + ' vacated, the car with vehicle registration number ' + vehicle.car_num + ' left the space, the driver of the car was of age ' + vehicle.driver_age);
    } catch (err) {
        console.error(err);
        throw err;
    }
}


exports.getCarNumForAge = (age, parkRegister) => {
    const carNum = [];
    for (const [spots, cars] of Object.entries(parkRegister['bookedSlots'])) {
        if (cars && (cars['driver_age'] === age)) {
            carNum.push(cars['car_num']);
        }
    }
    if (carNum.length > 0) console.log(...carNum)
    else console.log(null);
    return carNum;
}