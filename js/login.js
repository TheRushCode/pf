document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Login failed");
            return;
        }

        // ✅ Save token & role
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        alert("Login successful");

        // ✅ ROLE-BASED REDIRECT
        if (data.role === "developer") {
            window.location.href = "developer-dashboard.html";
        } else if (data.role === "buyer") {
            window.location.href = "buyer-dashboard.html";
        } else {
            alert("Unknown role");
        }

    } catch (error) {
        console.error(error);
        alert("Server error");
    }
});
