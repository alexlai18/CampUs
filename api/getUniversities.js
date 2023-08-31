"use server"

export const getUniversities = async () => {
  const uniNames = [];
  // Update the universities json
  await fetch("http://universities.hipolabs.com/update");
  // Get all the universities
  await fetch("http://universities.hipolabs.com/search?country=Australia")
    .then(res => res.json())
    .then(data => {
      for (const uni in data) {
        if (!uniNames.includes((data[uni]).name)) {
          uniNames.push(data[uni].name);
        }
      }
    }).catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Error fetching data:', error);
    });
  return uniNames;
}