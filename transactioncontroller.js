const Transaction = require("../models/Transaction");
const User = require("../models/User");

exports.createTransaction = async (req, res) => {
  try {
    const { senderId, receiverId, amount } = req.body;

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: "Sender or receiver not found" });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    const transaction = new Transaction({ sender: senderId, receiver: receiverId, amount });
    await transaction.save();

    res.status(201).json({ message: "Transaction successful", transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
