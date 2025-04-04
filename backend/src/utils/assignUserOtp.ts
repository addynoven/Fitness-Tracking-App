import Token from "../Models/Mongodb/TokenModel";
import { Iuser } from "../Models/Mongodb/.Mongodb.types";
import generateOTP from "./otpGenerator";

/**
 * Generates and assigns a new OTP to the user.
 * @param user - The user document instance.
 * @returns {Promise<string>}
 */
export const assignUserOtp = async (user: Iuser): Promise<string> => {
  const Gen_OTP = generateOTP(4);
  await Token.deleteOne({ user: user.id }); // Remove old OTP
  const token = await Token.create({ user: user.id, token: Gen_OTP }); // Create new OTP
  user.token = token.id; // Assign new OTP reference
  await user.save();
  return Gen_OTP;
};
