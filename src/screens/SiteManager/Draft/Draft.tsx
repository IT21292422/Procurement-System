import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Card, Title, Button, List, Dialog, Portal, ActivityIndicator,} from 'react-native-paper';
import { deleteDraft, existingDraft, getDraftDetails, getExistingDraftId } from '../hooks/draftHools';
import { OrderType, supplier } from '../../../../config/types';
import { getSupplierList } from '../hooks/supplierHooks';
import CalculateItemTotalAndStatus from './draftCalculations';
import { getPolicyAmount, getPolicyNameForItem } from '../hooks/policyHooks';
import { collection, onSnapshot } from 'firebase/firestore';
import { fireStore } from '../../../../config/firebase';
import { createNewOrder } from '../hooks/orderHooks';
import { useFocusEffect } from '@react-navigation/native';
import { getSiteList } from '../hooks/siteHooks';


export default function Draft() {
	const [isDraft, setIsDraft] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [draft, setDraft] = useState<OrderType | undefined>();
	const [supplierList, setSupplierList] = useState<supplier[]>([]);
	const [selectedSupplier, setSelectedSupplier] = useState<supplier | null>(null);
	const [siteList, setSiteList] = useState<string[]>([]);
	const [selectedSite, setSelectedSite] = useState<string | null>(null);
	const [isSupplierModalVisible, setIsSupplierModalVisible] = useState(false);
	const [isSiteModalVisible, setIsSiteModalVisible] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);
	let orderTotal = 0;


	const openSupplierModal = () => {
		setIsSupplierModalVisible(true);
	};

	const closeSupplierModal = () => {
		setIsSupplierModalVisible(false);
	};

	const selectSupplier = (supplier: supplier) => {
		setSelectedSupplier(supplier);
		if (draft) {
			draft.supplierName = supplier.supplierName;
		}
		closeSupplierModal();
	};


	const openSiteModal = () => {
		setIsSiteModalVisible(true);
	};

	const closeSiteModal = () => {
		setIsSiteModalVisible(false);
	};

	const selectSite = (site: string) => {
		setSelectedSite(site);
		if (draft) {
			draft.deliverySite = site;
		}
	};


	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			if (await existingDraft()) {
				const draftId = await getExistingDraftId() || '';
				const newDraft: OrderType = await getDraftDetails(draftId);
				if (newDraft) {
					newDraft.orderId = draftId;
				} else {
					setIsDraft(false);
				}
				setDraft(newDraft);
				setIsDraft(true);
			}

			setSupplierList(await getSupplierList());
			setSiteList(await getSiteList());
			setIsLoading(false);
		}
		fetchData();
	}, [refreshKey]);

	
	// refresh page
	useFocusEffect(
		React.useCallback(() => {
			setRefreshKey((prevKey) => prevKey + 1);
		}, [])
	);


	const handleCreateOrder = async (draft: OrderType) => {
		const newOrder: OrderType = draft;

		// set auto approval
		let isAutoApproved = true;
		for (const item of draft?.itemList || []) {
			const approvalLimit = await getPolicyAmount(await getPolicyNameForItem(item.itemName));
			const itemTotal = item.quantity * item.unitPrice;
			if (itemTotal > approvalLimit) {
				isAutoApproved = false;
				break;
			}
		}
		newOrder.status = isAutoApproved ? 'approved' : 'approval_pending';

		await deleteDraft(draft.orderId);
		await createNewOrder(newOrder as OrderType);
		setRefreshKey((prevKey) => prevKey + 1);
	}

	const handleRefresh = () => {
		 setRefreshKey((prevKey) => prevKey + 1) 
		}


	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
			{isLoading ? (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<ActivityIndicator animating={true} />
				</View>
			) : !isDraft ? (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text>No draft</Text>
				</View>
			) : (
				<>
					{/* show Items */}
					<Card>
						<Card.Content>
							<Title>Items</Title>
							{draft?.itemList.map((item) => (
								<CalculateItemTotalAndStatus key={item.itemName} item={item} />
							))}
						</Card.Content>
					</Card>

					{/* Calculate order total */}
					{draft?.itemList.forEach((item) => {
						const itemTotal = item.quantity * item.unitPrice;
						orderTotal += itemTotal;
					})}

					{/* draft total */}
					<Card>
						<Card.Content>
							<Title>Order Total</Title>
							<Text>{`RS: ${orderTotal}`}</Text>
						</Card.Content>
					</Card>

					{/* select supplier */}
					<Card>
						<Card.Content>
							<Title>Select supplier</Title>
							<Button mode="outlined" onPress={openSupplierModal}>
								{selectedSupplier
									? selectedSupplier.supplierName
									: "Select a Supplier"}
							</Button>
						</Card.Content>
					</Card>

					{/* select site */}
					<Card>
						<Card.Content>
							<Title>Select Site</Title>
							<Button mode="outlined" onPress={openSiteModal}>
								{selectedSite ? selectedSite : 'Select a Site'}
							</Button>
						</Card.Content>
					</Card>

					{/* portal for supplier selection */}
					<Portal>
						<Dialog visible={isSupplierModalVisible} onDismiss={closeSupplierModal}>
							<Dialog.Title>Select a Supplier</Dialog.Title>
							<Dialog.Content>
								<List.Section>
									{supplierList.map((supplier) => (
										<List.Item
											key={supplier.supplierName}
											title={supplier.supplierName}
											onPress={() => selectSupplier(supplier)}
										/>
									))}
								</List.Section>
							</Dialog.Content>
							<Dialog.Actions>
								<Button onPress={closeSupplierModal}>Close</Button>
							</Dialog.Actions>
						</Dialog>
					</Portal>

					{/* portal for site selection */}
					<Portal>
						<Dialog visible={isSiteModalVisible} onDismiss={closeSiteModal}>
							<Dialog.Title>Select a Site</Dialog.Title>
							<Dialog.Content>
								<List.Section>
									{siteList.map((site) => (
										<List.Item
											key={site}
											title={site}
											onPress={() => selectSite(site)}
										/>
									))}
								</List.Section>
							</Dialog.Content>
							<Dialog.Actions>
								<Button onPress={closeSiteModal}>Close</Button>
							</Dialog.Actions>
						</Dialog>
					</Portal>

					{/* refresh button */}
					<Text>{`\n\n`}</Text>
					<Button mode="contained" onPress={() => handleRefresh()} style={{ margin: 16 }}>
						Refresh
					</Button>

					{/* Create Order button */}
					{selectedSupplier && selectedSite ? (
						<>
							<Text>{`\n\n`}</Text>
							<Button mode="contained" onPress={() => handleCreateOrder(draft as OrderType)} style={{ margin: 16 }}>
								Create Order
							</Button>
						</>
					) : null}
				</>
			)}
		</ScrollView>
	);
}
