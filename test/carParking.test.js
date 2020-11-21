const path = require('path');
const fs = require('fs');

const carParkingHelper = require('../helpers/carParkingHelper');

const outputFilePath = path.resolve(__dirname, './testContainer/mockOutputFile.json');
const mockParkRegister = JSON.parse(fs.readFileSync(outputFilePath, 'utf8'));

const testSlotNumForAge = test('get Slot Num For Age', () => {
    expect(carParkingHelper.getSlotNumForAge("40", mockParkRegister)).toStrictEqual(["3"]);
});

const testSlotNumForCarNum = test('get Slot Num For Car Num', () => {
    expect(carParkingHelper.getSlotNumForCarNum('KA-01-HH-1234', mockParkRegister)).toBe("1");
});


const testCarNumWithAge = test('get Car Num with Age', () => {
    expect(carParkingHelper.getCarNumForAge("39", mockParkRegister)).toStrictEqual(["HR-29-TG-3098"]);
}); 
