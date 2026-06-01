export const isProd = process.env.NODE_ENV === "production";
// export const BASE_URL = "http://dms.test/api";
export const BASE_URL = "http://localhost:3000/service/api";
// export const BASE_URL = "http://localhost:3000/service/api";
export const PROXY_CONFIG = isProd ? {} : {
    '/service/':{
        target: "http://dms-back.test", changeOrigin:true, pathRewrite: {
            '^/service/': ''
        }
    }
};
export const CLIENT_ID = 2
export const CLIENT_SECRET = "RXNc7f8i9y7NFs84gYjQggexBTtWV8ts08QzmbJC"
