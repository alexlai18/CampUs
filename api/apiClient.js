// User methods
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


// User Detail methods
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

// Connections methods
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

export const addConnections = async (body) => {
  try {
    const res = await fetch(`http://localhost:3000/api/friends`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body,
      cache: "no-store"
    })

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    return res.json();
  } catch (error) {}
}