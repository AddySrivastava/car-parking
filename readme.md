## How to run
1. Input file should go into inputContainer folder and the result file should go in the outputContainer.
2. Run `npm start` to run the server and `npm test` to run test cases.
3. Run the following curl to execute the process from terminal, fileName should be without any extension and should be present in the inputContainer
```bash 
curl --location --request POST 'localhost:5000/management/v1/api/manageCarParking' \
--header 'Content-Type: application/json' \
--data-raw '{
    "fileName": "input"
}'
```
4. Your result file will be generated in outPutContainer with name as `fileName_result.json` along with the command line output.
