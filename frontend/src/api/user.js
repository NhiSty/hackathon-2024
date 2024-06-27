export async function fetchUsersList() {
  const response = await fetch(`http://localhost:8000/api/v1/users`, {
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  return response.json();
}

export async function fetchUser(id) {
  const response = await fetch(`http://localhost:8000/api/v1/users/${id}/messages`);

  if (!response.ok) {
    return Promise.reject(response);
  }

  return response.json();
}
