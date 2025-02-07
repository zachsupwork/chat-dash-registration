export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, loginId, email, password } = req.body;

  // Validate input
  if (!name || !loginId || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
console.log("Sending request to Chat-Dash with body:", { name, loginId, email, password });
  try {
    const response = await fetch("https://api.chat-dash.com/v1/public/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `CD.630826124fc9cc9f7ff43c18be95942d`,
      },
      body: JSON.stringify({ name, loginId, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ message: data.message || "Error from Chat-Dash API" });
    }

    return res.status(200).json({ message: "User registered successfully!", data });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
}
