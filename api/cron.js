 
const getData = async () => {
  const response = await fetch('https://linear-ag-diencong-356f02fc.koyeb.app/auth/ping');
     
     const data =await response.json()
    return data
};

module.exports = getData;
