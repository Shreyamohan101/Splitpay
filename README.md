## 💰 SplitPay – Smart Bill Splitter  

SplitPay is a smart expense management system that helps users split bills seamlessly and settle payments with WhatsApp notifications.  

---

## 📌 Features  
-  **WhatsApp Notifications** – Get instant updates on expense settlements  
-  **UPI Payment Links** – Quick & easy payments via QR codes  
-  **Expense Sharing** – Split expenses among multiple users  
-  **Real-time Updates** – Track settlements effortlessly  

---

## 🔧 API Endpoints  

### 1️⃣ Create Expense (POST `/api/expenses`)  
Creates a new expense entry.  

**📍 Example Request (JSON):**  
```json
{
  "title": "Dinner Party",
  "amount": 1200,
  "paidBy": {
    "_id": "payerUserId",
    "name": "Sam"
  },
  "participants": [
    { "_id": "userId1", "name": "Tom", "paid": false },
    { "_id": "userId2", "name": "Anaya", "paid": true }
  ]
}
```

### 2️⃣ Get Expenses (GET `/api/expenses`)  
Fetches all expenses.  

**📍 Example Response (JSON):**  
```json
[
  {
    "_id": "expense123",
    "title": "Dinner Party",
    "amount": 1200,
    "paidBy": {
      "_id": "payerUserId",
      "name": "Sam"
    },
    "participants": [
      { "_id": "userId1", "name": "Tom", "paid": false },
      { "_id": "userId2", "name": "Anaya", "paid": true }
    ]
  }
]
```
### 3️⃣ Settle Expense (POST `/api/expenses/settle/:expenseId`)  
Marks an expense as paid once the participant completes the UPI transaction.  

**📍 Example Request (JSON):**  
```json
{
  "userId": "userId1"
}
```
**📍 WhatsApp Confirmation Message Sent:**  
```text
✅ Payment Received!  
Tom, your ₹600 payment for "Dinner Party" is marked as settled.
```

###  Clone the Repository  
Run the following commands to clone the project and install dependencies:  

```bash
git clone https://github.com/Shreyamohan101/Splitpay.git
cd Splitpay
npm install
```

## 📌 Future Enhancements  
🚀 **Frontend Dashboard** – Interactive UI to manage and view expenses  
🚀 **Payment Status Auto-Detection** – Integrate UPI webhooks for real-time payment tracking  
🚀 **Multi-Currency Support** – Enable transactions beyond INR for global usability  

---

## 🙌 Contact  
👨‍💻 **Developed by:** [Shreya Mohan]  
📧 **Email:** [MY EMAIL](shreyamohan.me@gmail.com)  
🔗 **LinkedIn:** [ShreyaMohan](https://www.linkedin.com/in/shreya-mohan-b6a369287/)  

⭐ **Like this project? Give it a star on GitHub!** ⭐  

🔗 **GitHub Repository:** [SplitPay](https://github.com/Shreyamohan101/Splitpay)  

