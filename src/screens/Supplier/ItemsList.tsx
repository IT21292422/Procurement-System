import React, { useState } from 'react'
import { itemInterface } from '../../../config/interfaces';


export const ItemsList = ({supplierItems} : any) =>
{
    const [supplierItemsList, setSupplierItemsList] = useState<itemInterface[]>([]);

    return (
        <div>ItemsList</div>
    )
}
