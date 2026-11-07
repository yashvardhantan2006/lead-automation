const WEBHOOK_URL = "https://hook.eu1.make.com/9ln2nmwzd1b9gtms9vp10g82okuvrvfq";

const form = document.getElementById("leadForm");
const statusDiv = document.getElementById("status");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevents the browser page from reloading

  submitBtn.innerText = "Sending...";
  submitBtn.disabled = true;

  // Gather values from the input fields
  const payload = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    requirement: document.getElementById("requirement").value,
    timestamp: new Date().toISOString()
  };

  try {
    // Send data to the Make.com webhook via a POST request
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      statusDiv.style.color = "#4ade80";
      statusDiv.innerText = "Inquiry sent successfully!";
      form.reset();
    } else {
      throw new Error("Server responded with error");
    }
  } catch (error) {
    statusDiv.style.color = "#f87171";
    statusDiv.innerText = "Failed to send. Check console.";
    console.error("Error:", error);
  } finally {
    submitBtn.innerText = "Send Inquiry";
    submitBtn.disabled = false;
  }
});