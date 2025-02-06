export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, loginId, email, password } = req.body;

  const response = await fetch("https://api.chat-dash.com/v1/public/clients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CHAT_DASH_API_KEY}`,
    },
    body: JSON.stringify({ name, loginId, email, password }),
  });
console.log("CHAT_DASH_API_KEY:", process.env.CHAT_DASH_API_KEY);
  const data = await response.json();

  if (response.ok) {
    res.status(200).json({ message: "User registered successfully!" });
  } else {
    res.status(400).json({ message: data.message || "Error registering user" });
  }
}
