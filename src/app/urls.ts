import { environment } from "@root/environments/environment";
// URL SECURE
const BASE_URL = environment.url_back;
const VERSION = "v1";
const VERSION2 = "v2";

export default {
    LOGIN: `${BASE_URL}auth/login`,
    ROL: `${BASE_URL}auth/rol`,
};

export const USER = {
    SUB_USERS_FIL: `${BASE_URL}api/${VERSION}/client/$1/subUser`,
    SUB_USERS: `${BASE_URL}api/${VERSION}/client/$1/subUser/`,
    SUB_USER: `${BASE_URL}api/${VERSION}/client/$1/subUser/$2`,
    SUB_USERS_SEARCH: `${BASE_URL}api/${VERSION}/client/$1/subUser/search`,
};

export const MASTER = {
    work: `${BASE_URL}api/${VERSION}/client/$1/work/`,
    product: `${BASE_URL}api/${VERSION2}/order/products`,
    permission: `${BASE_URL}api/${VERSION}/client/master/permission/`,
    ONBOARDING: `${BASE_URL}api/${VERSION2}/onboarding?platform=web`,
};

export const SURVEY = {
    questions: `${BASE_URL}api/${VERSION}/survey/questions`,
};

export const PRODUCT = {
    _: `${BASE_URL}product`,
    TYPE_LIST: `${BASE_URL}product/types_product`,
    MARK_LIST: `${BASE_URL}product/mark_product`,
    STORE_LIST: `${BASE_URL}product/store`,
    CLASIFICATION_LIST: `${BASE_URL}product/clasification_product`,
};

export const MOVEMENTS = {
    _: `${BASE_URL}movements`,
    DASHBOARD :  `${BASE_URL}movements/dashboard`,
};

export const INTERN_SECTION = {
    MARKETING: `${BASE_URL}api/${VERSION2}/marketing?type=intern`,
};

export const PRODUCTS = {
    _: `${BASE_URL}api/${VERSION2}/product`,
};

export const PERMISSION = {
    _: `${BASE_URL}permission`,
};
