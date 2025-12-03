document.getElementById("sendBtn").addEventListener("click", addItem);

loadItems();

function loadItems() {
    fetch("get_items.php")
        .then(res => res.json())
        .then(items => {
            const container = document.getElementById("responseContainer");
            container.innerHTML = "";

            items.forEach(i => {
                const box = document.createElement("div");
                box.className = "responseBox";

                const text = document.createElement("div");
                text.className = "responseText";
                text.textContent = i.text;
                box.onclick = () => deleteItem(i.id);

                // Delete button
                const deleteBtn = document.createElement("button");
                deleteBtn.innerHTML = "🗑️ Delete";
                deleteBtn.style.color = "white";
                deleteBtn.className = "delete-btn";
                deleteBtn.style.marginTop = "5px";
                deleteBtn.style.width = "100%";


                box.appendChild(text);
                box.appendChild(deleteBtn);

                container.appendChild(box);
            });
        });
}

function addItem() {
    const text = document.getElementById("message").value.trim();
    if (text === "") return;

    const formData = new FormData();
    formData.append("text", text);

    fetch("add_item.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            document.getElementById("message").value = "";
            loadItems();
        }
    });
}

function deleteItem(id) {
    const formData = new FormData();
    formData.append("id", id);

    fetch("delete_item.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        loadItems();
    });
}

// Auto-refresh items every 3 seconds
setInterval(loadItems, 3000);
