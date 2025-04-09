 
const getData = async () => {
  const url=process.env.API_SERVER_MAIN_CUSTOM ||process.env.API_SERVER_MAIN
  const response = await fetch(`${url}/hello`);
     
     const data =await response.json()
    return data
};

const callData = async () => {
  try {
  const url=process.env.API_SERVER_MAIN_CUSTOM ||process.env.API_SERVER_MAIN

    const response = await fetch(`${url}/hello`);
     
    const data =await response.json()
    console.log("API Response:", data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
  
};

module.exports = {
  callData,
  getData
};
