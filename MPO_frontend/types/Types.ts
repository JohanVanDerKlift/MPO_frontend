export interface ProductionOrder {
    id: string,
    docNum: number,
    itemCode: string,
    itemName: string,
    quantity: number,
    cardCode: string,
    cardName: string,
    instruction: string,
    instructionFile: string,
    whsName: string,
    productionText: string,
    comment: string,
    testInstruction: string,
    photo: boolean,
    logo: string,
    startDate: Date,
    serialNumbers: SerialNumber[],
    productionOrderItems: ProductionOrderItem[]
}

export interface ProductionOrderItem {
    itemCode: string;
    suppCatNum: string;
    itemName: string;
    instruction: string;
    remark: string;
}

export interface SerialNumber {
    Id: string;
    ProductionNumber: string;
    SerialNo: number;
    ProductionOrderID: string;
}

export interface UserProfileToken {
    username: string;
    email: string;
    token: string;
};

export interface UserProfile {
    username: string;
    email: string;
};

export interface PagedResult<T> {
    results: T[]
    pageCount: number
    totalCount: number
}