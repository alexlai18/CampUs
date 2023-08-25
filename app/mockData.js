export const dataStore = {
  "users": {},
  "userdetails": {},
  "groupmates": {"alaiier18@gmail.com":
    [
      {
        "name": "Olivia Martin",
        "email": "olivia.martin@email.com",
        "course": "COMP1531",
        "initials": "OM",
        "ratingGiven": 9.6
      },
      {
        "name": "Jackson Lee",
        "email": "jackson.lee@email.com",
        "course": "COMP1531",
        "initials": "JL",
        "ratingGiven": 9.4
      },
      {
        "name": "Isabella Nguyen",
        "email": "isabella.nguyen@email.com",
        "course": "COMP3231",
        "initials": "IN",
        "ratingGiven": 9.2
      },
      {
        "name": "William Kim",
        "email": "will@email.com",
        "course": "COMP2511",
        "initials": "WK",
        "ratingGiven": 9.0
      },
      {
        "name": "Sofia Davis",
        "email": "sofia.davis@email.com",
        "course": "COMM1180",
        "initials": "SD",
        "ratingGiven": 8.8
      }
    ]
  },
  "userabout": {"alaiier18@gmail.com":
    <>
      Hi! I'm a Computer Science &#40;Co-op&#41; student @ UNSW with internship experience in assurance and cloud engineering. Currently looking for opportunities in the tech industries as a software engineer. Passionate about creating a difference through technology!
      <br/>
      Here are some technologies that I've worked with:
      <br/>
      <br/>
      • Frontend: Javascript, React, React Redux, HTML/CSS, Material UI
      <br/>
      <br/>
      • Backend: Datadog, SQL, NodeJS
      <br/>
      <br/>
      • Tools: Git, Visual Studio, Azure Web Apps, Azure Functions, Oracle Cloud Infrastructure, Jenkins, Jira, Confluence
      <br/>
      <br/>
      • Other languages: Python, C, Java
    </>
  }
}

export const addUser = (email, password) => {
  const emailList = dataStore["users"];
  if (email in emailList) {
    return false;
  }
  dataStore.users[email] = password; 
  return true;
}

export const logUser = (email, password) => {
  const emailList = dataStore["users"];
  if (email in emailList && password === emailList[email]) {
    return true;
  }
  return false;
}

export const addUserDetails = (email, details) => {
  dataStore.userdetails[email] = details;
}

export const getUserDetails = (email) => {
  return dataStore.userdetails[email];
}

export const getUserAbout = (email) => {
  return dataStore.userabout[email];
}

export const getGroupMates = (email) => {
  return dataStore.groupmates[email];
}

export const getAverageRating = (email) => {
  let overallScore = 0
  let numMates = 0
  if (!dataStore.groupmates[email]) {
    return 0;
  }
  (dataStore.groupmates[email]).map((mate) => {
    numMates += 1
    overallScore += mate.ratingGiven;
  })
  return (overallScore / numMates).toFixed(1);
}