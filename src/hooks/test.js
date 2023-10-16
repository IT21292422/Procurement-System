import { fireStore } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const testCreateOrder = async () => {
  const orderData = {
    orderId: "your_order_id",
    isDraft: false,
    itemList: [
      { itemName: "Item 1", unitPrice: 10, quantity: 2 },
      { itemName: "Item 2", unitPrice: 15, quantity: 3 },
    ],
    orderTotal: 70,
    deliverySite: "Delivery Site Name",
    status: "approval_pending",
    createdAt: new Date(),
    purchaseDate: new Date(),
    supplierName: "Supplier Name",
    estimatedDeliveryDate: new Date(),
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

const testcreateUserOnAuth = async () => {
  const userData = {
    userEmail: "procurement_staff@email.com",
    password: "12345678",
    userType: "procurement_staff",
  };

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, userData.userEmail, userData.password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      console.log(error);
    });

  const userDataOnDataBase = {
    userEmail: userData.userEmail,
    userType: userData.userType,
  };
  try {
    const ordersCollection = collection(fireStore, "user");
    const newOrderRef = await addDoc(ordersCollection, userDataOnDataBase);
    console.log(newOrderRef);
    return newOrderRef.id; // Return the ID of the newly created order document
  } catch (error) {
    // Handle any errors that may occur during the creation process
    console.error("Error creating order:", error);
    throw error; // You can choose to throw the error for further handling or handle it here
  }
};

export {
  testCreateOrder,
  testCreateItem,
  testcreateUser,
  testcreateUserOnAuth,
};
