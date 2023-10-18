import {
    getAllItems,
    getAllItemRequests,
    requestNewItemSupplier,
    getAllOrders,
    getCompletedOrders,
    dateToString,
  } from '../../../utils/dbFunctions'; // Import your functions from the controller file

  import { describe, expect, jest, test, it } from "@jest/globals";

  
  describe('Test cases for Your Controller functions', () => {
    test('getAllItems retrieves a list of items', async () => {
      const itemsSnapshot = await getAllItems();
      const items = itemsSnapshot.docs.map((doc) => doc.data());
  
      expect(Array.isArray(items)).toBeTruthy(); // Ensure it's an array
      expect(items.length).toBeGreaterThan(0); // Ensure items were retrieved
    });
  
    test('getAllItemRequests retrieves a list of item requests', async () => {
      const itemRequestsSnapshot = await getAllItemRequests();
      const itemRequests = itemRequestsSnapshot.docs.map((doc) => doc.data());
  
      expect(Array.isArray(itemRequests)).toBeTruthy(); // Ensure it's an array
      expect(itemRequests.length).toBeGreaterThan(0); // Ensure item requests were retrieved
    });
  
    test('requestNewItemSupplier adds a new item request', async () => {
      // Define your newItem object for testing
      const newItem = {
        description: 'Test description',
        isApproved: true,
        itemName: 'Test Item',
        unitPrice: 100,
      };
  
      // Call the function
      const result = await requestNewItemSupplier(newItem);
  
      expect(result).toBeTruthy(); // Ensure it was successfully added
    });
  
    test('getAllOrders retrieves a list of orders with specific status', async () => {
      // Modify the status as per your data
      const ordersSnapshot = await getAllOrders();
      const orders = ordersSnapshot.docs.map((doc) => doc.data());
  
      expect(Array.isArray(orders)).toBeTruthy(); // Ensure it's an array
      expect(orders.length).toBeGreaterThan(0); // Ensure orders were retrieved
    });
  
    test('getCompletedOrders retrieves a list of completed orders', async () => {
      const completedOrdersSnapshot = await getCompletedOrders();
      const completedOrders = completedOrdersSnapshot.docs.map((doc) => doc.data());
  
      expect(Array.isArray(completedOrders)).toBeTruthy(); // Ensure it's an array
      expect(completedOrders.length).toBeGreaterThan(0); // Ensure completed orders were retrieved
    });
  
    test('dateToString converts Firestore timestamp to formatted string', () => {
      const mockTimestamp = { toDate: () => new Date('2023-10-15T15:30:00') }; // Modify as per your data
      const formattedDate = dateToString(mockTimestamp);
  
      // Define the expected formatted date based on the mockTimestamp
      const expectedFormattedDate = '15/10/2023 15:30';
  
      expect(formattedDate).toBe(expectedFormattedDate); // Ensure it's formatted as expected
    });
  });
  