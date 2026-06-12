const API_BASE_URL = import.meta.env.VITE_API_URL;
export async function apiPost(endpoint, body) {
  const accessToken = localStorage.getItem("accessToken");

  console.log("TOKEN SENT =>", accessToken);
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
  const errorData = await res.json();
  console.log("BACKEND ERROR:", errorData);

  throw new Error(JSON.stringify(errorData));
}
  return res.json();
}

export async function apiPatch(endpoint, body) {
  const accessToken = localStorage.getItem("accessToken");
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
  const errorData = await res.json();
  console.log("BACKEND ERROR:", errorData);

  throw new Error(JSON.stringify(errorData));
}
  return res.json();
}

export async function apiGet(endpoint) {
  const accessToken = localStorage.getItem("accessToken");

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });

  if (!res.ok) {
  const errorData = await res.json();
  console.log("BACKEND ERROR:", errorData);

  throw new Error(JSON.stringify(errorData));
}

  return res.json();
}

