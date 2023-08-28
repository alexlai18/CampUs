export const dataStore = {
  "users": {"olivia.martin@email.com": "password123"},
  "courses": [
    {
      "code": "COMP1531",
      "perGroup": 2,
    },
    {
      "code": "COMM1180",
      "perGroup": 4,
    },
    {
      "code": "COMP2521",
      "perGroup": 1,
    },
  ],
  "userdetails": {
    "olivia.martin@email.com": {
      "email": "olivia.martin@email.com",
      "fname": "Olivia",
      "lname": "Martin",
      "grade": 3,
      "uni": "University of New South Wales",
      "currentGroups": [
        {
          "course": "COMP1531",
          "name": "Three Wise Monkeys"
        },
        {
          "course": "COMP2521",
          "name": "Study Buddies"
        },
      ],
      "pastGroups": [
        {
          "course": "COMP1511",
          "name": "Big Man Ting"
        }
      ],
    }
  },
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
    "Hi! I'm a Computer Science (Co-op) student @ UNSW with internship experience in assurance and cloud engineering. Currently looking for opportunities in the tech industries as a software engineer. Passionate about creating a difference through technology!\nHere are some technologies that I've worked with:\n\n • Frontend: Javascript, React, React Redux, HTML/CSS, Material UI \n\n • Backend: Datadog, SQL, NodeJS \n\n • Tools: Git, Visual Studio, Azure Web Apps, Azure Functions, Oracle Cloud Infrastructure, Jenkins, Jira, Confluence \n\n • Other languages: Python, C, Java"
  },
  "notifications": {"alaiier18@gmail.com":
    [
      {
        "sender": "alaiier18@gmail.com",
        "action": "messaged",
        "message": "Remember to save your progress!"
      },
      {
        "sender": "olivia.martin@email.com",
        "action": "reacted",
      },
      {
        "sender": "olivia.martin@email.com",
        "action": "messaged",
        "message": "Hurry tf up"
      },
      {
        "sender": "olivia.martin@email.com",
        "action": "bumped",
        "message": "Hurry tf up",
      }
    ]
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

export const getNotifications = (email) => {
  return dataStore.notifications[email];
}

export const getCourses = (prefix) => {
  const res = [];
  dataStore.courses.map((course) => {
    if ((course.code.toLowerCase()).includes(prefix.toLowerCase())) {
      res.push(course);
    }
  })
  return res;
}

export const getUsers = (prefix) => {
  const res = [];
  Object.values(dataStore.userdetails).forEach((value) => {
    if ((value.fname + value.lname).toLowerCase().includes(prefix.toLowerCase()) && value.email !== sessionStorage.getItem("email")) {
      res.push(value);
    }
  });
  return res;
}

export const getCurrentGroups = (email, prefix) => {
  const res = [];
  const user = dataStore.userdetails[email];
  
  if (!user || !user.currentGroups) {
    return res;
  }
  
  if (user.currentGroups.length === 0) {
    return res;
  }
  user.currentGroups.map((group) => {
    if ((group.course.toLowerCase()).includes(prefix.toLowerCase())) {
      res.push(group);
    }
  })
  return res;
}

export const getPastGroups = (email, prefix) => {
  const res = [];
  const user = dataStore.userdetails[email];

  if (!user || !user.pastGroups)  {
    return res;
  }

  if (user.pastGroups.length === 0) {
    return res;
  }
  user.pastGroups.map((group) => {
    if ((group.course.toLowerCase()).includes(prefix.toLowerCase())) {
      res.push(group);
    }
  })
  return res;
}

export const setNewAbout = (email, input) => {
  dataStore.userabout[email] = input;
  return true;
}