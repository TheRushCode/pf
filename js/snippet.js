function showMsg(text, isError = false) {
  const el = document.getElementById("msg");
  if (!el) return;
  el.textContent = text;
  el.className = isError ? "error" : "success";
}

async function uploadSnippet() {
  const token = localStorage.getItem("token");
  if (!token) {
    showMsg("Please login first.", true);
    return;
  }

  const title = document.getElementById("title").value.trim();
  const code  = document.getElementById("code").value.trim();
  const price = document.getElementById("price").value || "0";

  if (!title || !code) {
    showMsg("Title and code are required.", true);
    return;
  }

  const btn = document.querySelector("button[onclick='uploadSnippet()']");
  if (btn) { btn.disabled = true; btn.textContent = "Uploading..."; }

  try {
    const res = await fetch(`${API_BASE}/snippet/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ title, code, price: parseInt(price) })
    });

    const data = await res.json();

    if (res.ok) {
      showMsg("✓ " + data.message);
      document.getElementById("title").value = "";
      document.getElementById("code").value  = "";
      document.getElementById("price").value = "";
    } else {
      showMsg(data.message || "Upload failed.", true);
    }

  } catch (err) {
    showMsg("Network error. Is the server running?", true);
    console.error(err);
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = "Upload Snippet"; }
  }
}

async function loadSnippets() {
  const listEl = document.getElementById("list");
  if (!listEl) return;

  listEl.innerHTML = `<p style="text-align:center;color:var(--text-secondary);padding:40px 0;">Loading snippets...</p>`;

  try {
    const res = await fetch(`${API_BASE}/snippet/list`);

    if (!res.ok) {
      listEl.innerHTML = `<p style="text-align:center;color:var(--danger);padding:40px 0;">Server error (${res.status}). Try again later.</p>`;
      return;
    }

    const snippets = await res.json();

    if (!snippets.length) {
      listEl.innerHTML = `<p style="text-align:center;color:var(--text-secondary);padding:60px 0;">No snippets yet. Be the first to upload one!</p>`;
      return;
    }

    listEl.innerHTML = snippets.map(s => `
      <div class="card">
        <h3 class="card-title">${escapeHtml(s.title)}</h3>
        <pre><code>${escapeHtml(s.code)}</code></pre>
        <div class="card-footer">
          <span class="price">${s.price === 0 ? "Free" : "&#8377;" + s.price}</span>
          <button class="btn-buy" onclick="buySnippet('${s._id}')">
            ${s.price === 0 ? "Get Free" : "Buy Now"}
          </button>
        </div>
      </div>
    `).join("");

  } catch (err) {
    listEl.innerHTML = `<p style="text-align:center;color:var(--danger);padding:40px 0;">Failed to load snippets. Is the backend running?</p>`;
    console.error(err);
  }
}

async function buySnippet(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login to buy snippets.");
    return;
  }
  alert("Payment integration coming soon! Snippet ID: " + id);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
