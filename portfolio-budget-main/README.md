# personal-budget

Simple Node/Express API to manage a portfolio budget using a budget envelope strategy. Users can create, read, update, and delete envelopes.

## Running the app
To run locally, run `npm install`, then `npm run start`

Once the app is running locally, you can access the API at `http://localhost:3000/`

## Testing with Swagger
Swagger documentation and testing available at `http://localhost:3000/api-docs`

To test with Swagger:
 - Retrieve envelopes using `GET /api/envelopes`
 - Retrieve a single envelope using `GET /api/envelopes/{id}`
 - Create an envelope using `POST /api/envelopes`
 - Update an envelope using `PUT /api/envelope/{id}`
 - Delete an envelope using `DELETE /api/envelope/{id}`
 - Transfer money between envelopes using `POST /api/envelope/{fromId}/transfer/{toId}`