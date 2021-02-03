module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://jaekim@localhost/faithshare', 
    CLIENT_ORIGIN: 'https://faith-share-app.vercel.app/',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '60m',
}




