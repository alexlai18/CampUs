"use server"

export const getLanguages = async () => {
  const languages = [];
  // Get all the universities
  await fetch("https://api.languagetoolplus.com/v2/languages")
    .then(res => res.json())
    .then(data => {
      for (const lan in data) {
        if (!languages.includes((data[lan]).code)) {
          languages.push(data[lan].name);
        }
      }
    }).catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Error fetching data:', error);
    });
  return languages;
}
