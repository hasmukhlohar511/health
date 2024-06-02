module.exports = {
    sanitizeMasterProfileData : (user) => {
        console.log("sanitizeMasterProfileData",user)
        return {
            _id: user._id,
            name : user.name,
            email: user.email,
            mobileNumber: user.mobileNumber,
            countryCode: user.countryCode,
            dateOfBirth : user.dateOfBirth,
            masterProfileId : user.masterProfileId,
            role : user.role
        };
    }
}