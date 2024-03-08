// export const backendUrl = 'http://localhost:3001/';
export const backendUrl = 'http://75.119.158.69:3001/'; // PROD
export const apiUrl = backendUrl + 'api/';
export const mediaRoot = backendUrl;

// employees auth endpoints
export const employeesLoginEndpoint = apiUrl + 'auth/login/staff';
export const employeesLogoutEndpoint = apiUrl + 'auth/logout/staff';

//api endpoints
export const employeesEndpoint = apiUrl + 'employees/';
export const usersEndpoint = apiUrl + 'users/';
export const branchesEndpoint = apiUrl + 'branches/';
export const serviceCategoriesEndpoint = apiUrl + 'service-categories/';
export const serviceTypesEndpoint = apiUrl + 'service-types/';
export const serviceRequestsEndpoint = apiUrl + 'service-requests/';
export const promosEndpoint = apiUrl + 'promos/';
export const settingsEndpoint = apiUrl + 'settings/';
export const categoriesEndpoint = apiUrl + 'categories/';
export const productsEndpoint = apiUrl + 'products/';
export const ordersEndpoint = apiUrl + 'orders/';
export const addressesEndpoint = apiUrl + 'addresses/';
export const adsEndpoint = apiUrl + 'ads/';
export const notificationsEndpoint = apiUrl + 'notifications/';
export const chatsEndpoint = apiUrl + 'chats/';
export const walletsEndpoint = apiUrl + 'wallets/';

// admin endpoints
export const adminCompaniesEndpoint = apiUrl + 'admin/companies/';
export const adminUsersEndpoint = apiUrl + 'admin/users/';
