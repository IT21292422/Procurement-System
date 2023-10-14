import { fireStore } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

const testCreateOrder = async () => {
  const orderData = {
    orderId: "ORD-1617",
    isDraft: false,
    quantity: 75,
    orderTotal: 4000,
    deliverySite: "Construction Site F",
    status: "delivery_pending",
    createdAt: new Date("2023-10-18"),
    purchaseDate: new Date("2023-10-10"),
    supplierId: "supplier-006",
  };

  try {
    const ordersCollection = collection(fireStore, "order");
    const newOrderRef = await addDoc(ordersCollection, orderData);
    console.log(newOrderRef);
    return newOrderRef.id; // Return the ID of the newly created order document
  } catch (error) {
    // Handle any errors that may occur during the creation process
    console.error("Error creating order:", error);
    throw error; // You can choose to throw the error for further handling or handle it here
  }
};

const testCreateItem = async (orderId) => {
  const itemData = {
    orderId: orderId,
    itemId: "item-001",
    itemName: "Cement",
    description: "High-quality cement for construction",
    unit: "per bag",
    unitPrice: 10.99,
    policy: "Standard delivery policy",
  };

  try {
    const ordersCollection = collection(fireStore, "item");
    const newOrderRef = await addDoc(ordersCollection, itemData);
    console.log(newOrderRef);
    return newOrderRef.id; // Return the ID of the newly created order document
  } catch (error) {
    // Handle any errors that may occur during the creation process
    console.error("Error creating order:", error);
    throw error; // You can choose to throw the error for further handling or handle it here
  }
};

const testcreateUser = async () => {
  const userData = {
    userEmail: "procurement_staff@email.com",
    userType: "procurement_staff",
  };

  try {
    const ordersCollection = collection(fireStore, "user");
    const newOrderRef = await addDoc(ordersCollection, userData);
    console.log(newOrderRef);
  } catch (error) {
    console.error("Error creating order:", error);
    throw error; // You can choose to throw the error for further handling or handle it here
  }
};

export { testCreateOrder, testCreateItem, testcreateUser };
