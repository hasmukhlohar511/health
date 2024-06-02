module.exports = {
    successMessages: {
        dataInsert: "Data Inserted successfully",
        dataFound: "Data Retrieved Successfully",
        dataNotFound: "Data not exists",
        dataDelete: "Data Deleted Successfully",
        dataUpdate: "Data Updated Successfully",
        retrievedPositionList: "Successfully retrieved Position list",
        MessageSent: "Message Sent Successfully",
        otpVerification: "OTP Verified Successfully",
        UserExists: "User Is Exists",
        reportRetrieved: "Report retrieved",
        UserLogout: "User Logout Successfully",
    },
    errorMessages: {
        invalidEmail : 'email is not valid',
        invalidMobileNumber : 'mobile number is not valid',
        otpRequired : 'OTP is required',
        invalidOtp : 'OTP is not valid',
        otpNumeric : 'OTP should be numeric',
        tokenRequired : 'token is required',
        roleRequired : "role is required",
        invalidRole : "We only accept roles such as 'AD', 'SAD', 'CR', 'HR', and 'PA'.",
        missingCountryCode : "countryCode is required",
        invalidCountryCode : "Invalid country code",
        subjectRequired : "subject is required",
        commentRequired: "comment is required",
        additionalNoteRequired: "additionalNote is required",
        invalidAttachments : "attachment is not valid",
        attachmentKeyRequired : "attachment Key is Required",
        attachmentFileNameRequired : "attachment FileName is Required",
        submittedOnRequired : "submittedOn is Required",
        submitterIpAdreesRequired : "submitterIpAdrees is Required",  
        submitterDeviceStringRequired : "submitterDevice is Required",
        ticketIdRequired : "ticketId is Required",
        ticketIdMongoId : "ticketId should be mongoId",
        invalidTicketStatus : "We only accept ticket status such as 'OP', 'CL', 'AS', 'WO' and 'RE'.",
        internalNoteRequired : "internalNote is Required", 
        customerRepMongoId :  "customerRep should be mongoId",
        employerIdRequired : "employerId is Required",
        employerIdMongoId : "employerId should be mongoId",
        customerRepIdRequired : "customerRepId is Required",
        customerRepIdMongoId : "customerRepId should be mongoId",
        fileRequired : "file is requried",
        invalidFileType : "We only accept file type such as 'image/jpeg', 'image/png', and 'application/pdf'.",
        invalidFileSize : "File size exceeds the maximum limit of 5 MB.",
        singleFileAccepted : "Please upload only one file.",
        userAgentRequired : "userAgent is Required",
        invalidUserAgent : "userAgent should be string",
        ipAddressRequired : "ipAddress is Required",
        invalidIpAddress: "ipAddress should be string",
        verificationEmailRequired : "verificationEmail is Required",
        invalidVerificationEmail : "verificationEmail should be string",
        timestampsRequired : "timestamps is Required",
        firstNameRequired : "firstName is Requried",
        lastNameRequired : "lastName is Requried",
        invalidBusinessEmail : "businessEmail is not valid",
        invalidPersonalEmail : "personalEmail is not valid",
        invalidCommunicationEmail : "We only accept communicationEmail such as 'BS', 'PR'.",
        invalidDateOfBirth : "dateOfBirth is not valid",
        insuranceProviderRequired : "insuranceProvider is Required",
        primaryProviderNameRequired :  "primaryProviderName is Required",
        groupIdRequired : "groupId is Required",
        patientIdRequired : "patientId is Required",
        patientIdMongoId : "patientId should be mongoId",
        adminIdRequired : "adminId is Required",
        adminIdMongoId : "adminId should be mongoId",
        subAdminIdRequired : "subAdminId is Required",
        subAdminIdMongoId : "subAdminId should be mongoId",
        invalidSpouse : "We only accept spouse such as 'HU', 'WI', 'FA', 'MO', 'FA-IL', 'MO-IL', 'BR', 'SI', 'SO', 'DA', 'SL'.",
        supportTicketIdRequired : "supportTicketId is Required",
        supportTicketIdMongoId : "supportTicketId should be mongoId"
    }
}