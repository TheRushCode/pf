document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("${API_BASE}/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();





        if (!response.ok || data.success === false) {
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
            return;
        } else if (data.role === "buyer") {
            window.location.href = "buyer-dashboard.html";
            return;
        } else {
            alert("Unknown role");
        }

    } catch (error) {
        console.error("REAL ERROR:", error);
        // alert("Server error"); ❌ remove for now
    }
});
