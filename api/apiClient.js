//////////////////////////////////////////////////////////////
//////////////////////// USER FUNCTIONS //////////////////////
//////////////////////////////////////////////////////////////

// Get all users from the database
export const getUsers = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/users", {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      },
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    return res.json();
  } catch (error) {}
}

// Get users either via their userId or a filtered value
export const getFilterUsers = async (val, id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/users?val=${val}&userId=${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      },
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    return res.json();
  } catch (error) {}
}

// Add a user to the database
export const createUser = async (body) => {
  try {
    const res = await fetch(`http://localhost:3000/api/users`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body),
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    return res.json();
  } catch (error) {}
}

// Get a user using a specific user given a query and value (mainly used for email)
export const getUser = async (query, value) => {
  try {
    const res = await fetch(`http://localhost:3000/api/users?${query}=${value}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      },
      cache: "no-store"
    });
    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return false;
  }
}

// Get a User given the id
export const getUserById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      },
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    return res.json();
  } catch (error) {}
}

// See if a user exists and if the username and password align
export const logUser = async (email, password) => {
  try {
    const res = await fetch(`http://localhost:3000/api/login?email=${email}&password=${password}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      },
      cache: "no-store"
    });
    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return false;
  }
}


/////////////////////////////////////////////////////////////////////
//////////////////////// USER DETAIL FUNCTIONS //////////////////////
/////////////////////////////////////////////////////////////////////

// Get the UserDetails document given the id of such document
export const getUserDetails = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/details?id=${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      },
      cache: "no-store"
    });
    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return false;
  }
}

// Update UserDetail Document
export const updateUser = async (id, body) => {
  try {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body),
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    return res.json();
  } catch (error) {}
}

/////////////////////////////////////////////////////////////////////
//////////////////////// COURSES FUNCTIONS //////////////////////////
/////////////////////////////////////////////////////////////////////

// Get courses given a filter value
export const getCourses = async (body) => {
  try {
    const res = await fetch(`http://localhost:3000/api/course?prefix=${body}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      },
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    return res.json();
  } catch (error) {}
}

// Join or Leave a course given userId, courseCode and isJoining boolean
export const joinCourse = async (userId, courseCode, isJoining) => {
  try {
    const res = await fetch(`http://localhost:3000/api/usercourse`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        "id": userId,
        "courseCode": courseCode,
        "isJoining": isJoining
      }),
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    return res.json();
  } catch (error) {}
}

/////////////////////////////////////////////////////////////////////
//////////////////////// CONNECTIONS FUNCTIONS //////////////////////
/////////////////////////////////////////////////////////////////////

// Get another user given either a filter value and/or email
export const getConnections = async (search, email) => {
  try {
    const res = await fetch(`http://localhost:3000/api/friends?prefix=${search}&email=${email}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      },
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    return res.json();
  } catch (error) {}
}

// Add a friend
export const addConnections = async (body) => {
  try {
    const res = await fetch(`http://localhost:3000/api/friends`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body),
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    return res.json();
  } catch (error) {}
}

// Remove a friend (unfriend)
export const removeConnection = async (body) => {
  try {
    const res = await fetch(`http://localhost:3000/api/friends`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body),
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    return res.json();
  } catch (error) {}
}

/////////////////////////////////////////////////////////////////////
//////////////////////// GROUPS FUNCTIONS ///////////////////////////
/////////////////////////////////////////////////////////////////////

// Create a new group
export const createGroup = async (body) => {
  try {
    const res = await fetch(`http://localhost:3000/api/group`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body),
      cache: "no-store"
    })
    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    return res.json();
  } catch (error) {}
}

// Get a group given its groupId
export const getGroup = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/group?id=${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      },
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    return res.json();
  } catch (error) {}
}

// Get all the groups of a specific course, can also filter this
export const getCourseGroups = async (course, search) => {
  try {
    const res = await fetch(`http://localhost:3000/api/group?course=${course}&prefix=${search}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      },
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    return res.json();
  } catch (error) {}
}

// Get all groups with a filter
export const getFilteredGroups = async (search) => {
  try {
    const res = await fetch(`http://localhost:3000/api/group?prefix=${search}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      },
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    return res.json();
  } catch (error) {}
}

// Delete a group from the database
export const deleteGroup = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/group`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      },
      body: {
        id,
      },
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    return res.json();
  } catch (error) {}
}

// Change the details of a group given information and the groupId
export const updateGroup = async (id, body) => {
  try {
    const res = await fetch(`http://localhost:3000/api/group/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body),
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    return res.json();
  } catch (error) {}
}

// Remove a group member given the groupId and userId
export const removeGroupMember = async (groupId, userId) => {
  try {
    const res = await fetch(`http://localhost:3000/api/group/${groupId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        "userId": userId
      }),
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    return res.json();
  } catch (error) {}
}

// Join a group given groupId and userId
export const addGroupMember = async (groupId, userId) => {
  try {
    const res = await fetch(`http://localhost:3000/api/group/${groupId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        "userId": userId
      }),
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    return res.json();
  } catch (error) {}
}

/////////////////////////////////////////////////////////////////////
////////////////////// NOTIFICATIONS FUNCTIONS //////////////////////
/////////////////////////////////////////////////////////////////////

// Create a notification (should be called upon every interaction)
export const createNotif = async (body) => {
  try {
    const res = await fetch(`http://localhost:3000/api/notifications`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body),
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    return res.json();
  } catch (error) {}
}

// Get the notifs of a user given the email
export const getNotifs = async (email) => {
  try {
    const res = await fetch(`http://localhost:3000/api/notifications?receiver=${email}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      },
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    return res.json();
  } catch (error) {}
}

/////////////////////////////////////////////////////////////////////
//////////////////////// MESSAGE FUNCTIONS //////////////////////////
/////////////////////////////////////////////////////////////////////

export const addMessage = async (body) => {
  try {
    const res = await fetch(`http://localhost:3000/api/message`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body),
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    return res.json();
  } catch (error) {}
}

export const getGroupMessages = async (groupId) => {
  try {
    const res = await fetch(`http://localhost:3000/api/message?groupId=${groupId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      },
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    return res.json();
  } catch (error) {}
}

export const deleteMessage = async (messageId, groupId) => {
  try {
    const res = await fetch(`http://localhost:3000/api/message`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        "messageId": messageId,
        "groupId": groupId
      }),
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    return res.json();
  } catch (error) {}
}

export const editMessage = async (messageId, body) => {
  try {
    const res = await fetch(`http://localhost:3000/api/message?messageId=${messageId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body),
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    return res.json();
  } catch (error) {}
}