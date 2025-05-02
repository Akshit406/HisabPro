export const BASE_URL = "http://localhost:8000"

// api paths
export const API_PATHS = {
    AUTH: {
        LOGIN: '/api/v1/auth/login',
        REGISTER: '/api/v1/auth/register',
        GET_USER_INFO: '/api/v1/auth/getUser',
    },

    IMAGE: {
        UPLOAD_IMAGE : '/api/v1/auth/upload-image'
    },

    INVENTORY: {
        CREATE: '/api/v1/inventory/create',
        GET_ITEMS: '/api/v1/inventory/getItems',
        UPDATE: '/api/v1/inventory/update',
        DELETE: (itemId) => `/api/v1/inventory/${itemId}`,
        DOWNLOAD_INVENTORY: '/api/v1/inventory/downloadexcel',
    },

    SALES: {
        CREATE: '/api/v1/sales/create',
        GET_SALES: '/api/v1/sales/getSales',
        UPDATE:(salesId) => `/api/v1/sales/update/${salesId}`,
        DELETE: (itemId) => `/api/v1/sales/${itemId}`,
        CREATE: '/api/v1/sales/create',
        DOWNLOAD_SALES: '/api/v1/sales/downloadexcel',

    },

    DASHBOARD : {
        GET_DATA: '/api/v1/dashboard'
    }
}