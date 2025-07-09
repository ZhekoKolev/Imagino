const http = require('http');

exports.handler = async (event) => {
  console.log("Lambda triggered with event:", JSON.stringify(event));
  const userId = event.queryStringParameters?.user_id;
  if (!userId) {
    console.log("Missing user_id");
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: "Missing user_id query parameter" }),
    };
  }
  
  const apiKey = "358503ff-c3cb-43eb-81bf-6a3620f66a73"; // Keep this secret here
  const options = {
    hostname: 'zheko-sandbox.saas.imagino.com',
    path: `/ucdapi/get_MasterContact/2/Single_Customer_View/${userId}`,
    method: 'GET',
    headers: {
      'X-API-KEY': apiKey,
    },
  };
if (response.ok) {
  const data = await response.json();
  if (data && data.User_ID_string) {
    console.log("email =");
    console.log(data.Email);
    document.getElementById('email').value = data.Email || '';
    document.getElementById('firstName').value = data.First_Name || '';
    document.getElementById('lastName').value = data.Last_Name || '';
    document.getElementById('phone').value = data.Phone || '';
    document.getElementById('address').value = data.Address || '';
  }}

  console.log("Making request to:", options.hostname + options.path);

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      let data = '';
      console.log(`Received response with status code: ${res.statusCode}`);
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          console.log("Parsed response from Imagino:", parsed);

          resolve({
            statusCode: res.statusCode,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(parsed),
          });
        } catch (err) {
          console.error("Failed to parse JSON from Imagino:", err.message);
          resolve({
            statusCode: 502,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: "Invalid JSON from Imagino", raw: data }),
          });
        }
      });
    });

    req.on('error', (err) => {
      console.error("Error during HTTPS request:", err);
      resolve({
        statusCode: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: err.message }),
      });
    });

    req.end();
  });
};
