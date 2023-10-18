import {
  loadSupplierItems,
  loadItemRequests,
  handleUpdateCancel,
  handleFabPress,
} from "./supplierUtil";

import {describe, expect, jest, test} from '@jest/globals'

/**
 * This file contains test cases for internal supplier services functions
 * Contains both positive and negative testcases
 *
 * 4 fails, 3 passes defined
 */

describe("loadSupplierItems", () => {
  it("should load supplier items and set the state", async () => {
    const setSupplierItems = jest.fn();
    const itemsSnapshot = [{ id: "1", data: () => ({ itemName: "Item 1" }) }];

    // Mock api
    getAllItems.mockResolvedValue(itemsSnapshot);

    await loadSupplierItems(setSupplierItems);

    expect(setSupplierItems).toHaveBeenCalledWith([
      { id: "1", itemName: "Item 1" },
    ]);
  });

  it("should handle loading when no items are found", async () => {
    const setSupplierItems = jest.fn();

    // for an empty array
    getAllItems.mockResolvedValue([]);

    await loadSupplierItems(setSupplierItems);

    expect(setSupplierItems).toHaveBeenCalledWith([]);
  });

  it("should handle errors when loading items", async () => {
    const setSupplierItems = jest.fn();
    const error = new Error("Loading failed");

    // Gives error
    getAllItems.mockRejectedValue(error);

    await loadSupplierItems(setSupplierItems);

    expect(setSupplierItems).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(
      "Error occurred loading data",
      error
    );
  });
});

describe("handleFabPress", () => {
  it("should set showUpdateForm to true", () => {
    const setShowUpdateForm = jest.fn();

    handleFabPress(setShowUpdateForm);

    expect(setShowUpdateForm).toHaveBeenCalledWith(true);
  });
});

describe("handleUpdateCancel", () => {
  it("should set showUpdateForm to false", () => {
    const setShowUpdateForm = jest.fn();

    handleUpdateCancel(setShowUpdateForm);

    expect(setShowUpdateForm).toHaveBeenCalledWith(false);
  });
});
