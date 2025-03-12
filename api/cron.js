 
const getData = async () => {
  const response = await fetch('https://linear-ag-diencong-356f02fc.koyeb.app/auth/ping');
     
     const data =await response.json()
    return data
};

const callData = async () => {
  try {
    const response = await fetch('https://linear-ag-diencong-356f02fc.koyeb.app/auth/ping');
     
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
