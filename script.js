const URL = "https://script.google.com/macros/s/AKfycbwfZnbZqV2xkJZm2LEkXeLiAjXvxY4Ri4gdJD2o8koX8vlG80e-ICltYmVg4GV_IefE/exec";

const get = id => document.getElementById(id);

get("quantity").addEventListener("input", () => {
  get("total").textContent =
    Number(get("quantity").value) * 59;
});

get("orderForm").addEventListener("submit", async e => {
  e.preventDefault();

  const button = e.target.querySelector("button");
  button.disabled = true;
  get("message").textContent = "กำลังส่งคำสั่งซื้อ...";

  const data = {
    name: get("name").value,
    phone: get("phone").value,
    address: get("address").value,
    sku: get("sku").value,
    quantity: Number(get("quantity").value)
  };

  try {
    await fetch(URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain"
      },
      body: JSON.stringify(data)
    });

    get("message").textContent =
      "ส่งข้อมูลแล้ว กรุณารอการยืนยันคำสั่งซื้อ";
  } catch (error) {
    get("message").textContent =
      "ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่";
  } finally {
    button.disabled = false;
  }
});
