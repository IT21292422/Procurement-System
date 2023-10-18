import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Card, Title,} from 'react-native-paper';
import { getPolicyAmount, getPolicyNameForItem } from '../hooks/policyHooks';
import { itemListElementType } from '../../../../config/types';

interface CalculateItemTotalAndStatusProps {
	item: itemListElementType;
}

export default function CalculateItemTotalAndStatus({ item }: CalculateItemTotalAndStatusProps) {
	const [approvalLimit, setApprovalLimit] = useState<number | undefined>(undefined);
	const [isAutoApproved, setIsAutoApproved] = useState<boolean | undefined>(undefined);

	useEffect(() => {
		async function fetchData() {
			const approvalLimit = await getPolicyAmount(await getPolicyNameForItem(item.itemName));
			setApprovalLimit(approvalLimit);
			const itemTotal = item.quantity * item.unitPrice;
			const autoApproved = itemTotal <= approvalLimit;
			setIsAutoApproved(autoApproved);
			console.log(`${item.itemName} al:${approvalLimit} it:${itemTotal} `)
		}
		fetchData();
	}, [item]);

	// to handle a scenario where values have not been set yet
	if (approvalLimit === undefined || isAutoApproved === undefined) {
		return null;
	}

	return (
		<Card>
			<Card.Content>
				<Title>{item.itemName}</Title>
				<Text>{`${item.quantity} units\nTotal: RS: ${item.quantity * item.unitPrice}`}</Text>
				{isAutoApproved ? <Text style={{ color: 'green' }}>Auto Approved</Text> : null}
			</Card.Content>
		</Card>
	);
}