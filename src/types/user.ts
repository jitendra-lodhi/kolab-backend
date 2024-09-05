export interface SignUp {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  otp: string;
}

export interface VerifyEmail {
  name: string;
  email: string;
}

export interface PersonalInfo {
  address_line1: string;
  address_line2: string;
  post_code: string;
  country_code: string;
  phone_number: string;
  dob: string;
  nhs_number?: string;
  nationality: string;
}

interface Field {
  field_type: string;
  value: string;
}

export interface SurveyValues {
  [key: string]: Field;
}
