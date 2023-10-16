export const loadSupplierItems = async (setSupplierItems) => {
    try {
      const itemsSnapshot = await getAllItems();
      const itemsArray = [];
      itemsSnapshot.forEach((doc) => {
        itemsArray.push({ id: doc.id, ...doc.data() });
      });
      setSupplierItems(itemsArray);
    } catch (error) {
      console.log('Error occurred loading data', error);
    }
  };
  
  export const loadItemRequests = async (setItemRequests) => {
    try {
      const requestSnapshot = await getAllItemRequests();
      const requestArray = [];
      requestSnapshot.forEach((doc) => {
        requestArray.push({ id: doc.id, ...doc.data() });
      });
      setItemRequests(requestArray);
    } catch (error) {
      console.log('Error occurred loading item request data', error);
    }
  };

  export const handleUpdateCancel = (setShowUpdateForm) => {
    setShowUpdateForm(false);
  };
  
  export const handleFabPress = (setShowUpdateForm) => {
    setShowUpdateForm(true);
  };
  