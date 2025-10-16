import React from "react";
import {FSWatcher} from "node:fs";

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
    iWeight1: number,
    iWght1Unit: number,
    sWeight1: number,
    sWght1Unit: number,
    sLength1: number,
    sLen1Unit: number,
    sWidth1: number,
    sWdth1Unit: number,
    sHeight1: number,
    sHght1Unit: number,
    startDate: Date,
    qualityTests: QualityTest[],
    productionOrderItems: ProductionOrderItem[]
}

export interface ProductionOrderItem {
    itemCode: string;
    suppCatNum: string;
    itemName: string;
    instruction: string;
    remark: string;
}

export interface QualityTest {
    mechanicalTest: boolean;
    visualTest: boolean;
    electricalTest: boolean;
    operationalTest: boolean;
    testResult: boolean;
    serialNo: number;
}

export interface UserProfileToken {
    roles: string[];
    username: string;
    email: string;
    token: string;
}

export interface UserProfile {
    username: string;
    email: string;
    roles: string[];
}

export interface PagedResult<T> {
    results: T[]
    pageCount: number
    totalCount: number
}

export interface State  {
    pageNumber: number,
    pageSize: number,
    pageCount: number,
    searchTerm: string,
    searchValue: string,
    orderBy: string
}

export interface Actions {
    setParams: (params: Partial<State>) => void,
    reset: () => void,
    setSearchValue: (value: string) => void
}

export interface TestCheckboxProps {
    id: string,
    type: string,
    label?: string,
    checked: boolean,
    disabled: FSWatcher | boolean,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    register?: any // Optional react-hook-form register
}

export interface QualityTestItem {
    mechanicalTest: boolean,
    visualTest: boolean,
    electricalTest: boolean,
    operationalTest: boolean,
    testResult: boolean,
    serialNo: number,
}

export interface QualityTestProps {
    items: QualityTestItem[],
    productionorderId: string,
}

export interface AuthContextType {
    user: UserProfile | null;
    token: string | null;
    isLoggedIn: boolean;
    loginUser: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    registerUser: (data: RegistrationData) => Promise<void>;
}

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegistrationData {
    email: string;
    password: string;
    roles: string[];
}