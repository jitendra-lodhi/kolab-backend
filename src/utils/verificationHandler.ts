class OTPGenerator {
  generateOTP(): string {
    // Generate a random number between 100000 and 999999
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Ensure OTP is exactly 6 digits by padding if necessary
    console.log(otp.padStart(6, "0"))
    return otp.padStart(6, "0");
  }
}

const otpGenerator = new OTPGenerator();
export default otpGenerator;
