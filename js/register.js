document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value
    };

    const res = await fetch("${API_BASE}/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    document.getElementById("msg").innerText = result.message;

    if (res.status === 201) {
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    }
});


