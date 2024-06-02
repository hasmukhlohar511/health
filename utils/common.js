module.exports = {
    generateOtp : () => {
        // Generate a 6-digit OTP
        return Math.floor(100000 + Math.random() * 900000).toString();
    },
    generateOtpExpiry : () => {
        return Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
    },
    convertUTCDateToYYYYMMDD: (date) => {
        const utcDate = new Date(date);
    
        const year = utcDate.getUTCFullYear();
        const month = String(utcDate.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(utcDate.getUTCDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    }
}