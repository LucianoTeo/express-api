import { environment } from "@env/index";

const mailConfig = {
  host: environment.EMAIL_PROVIDER_HOST,
  port: 25,
  auth: {
    user: environment.EMAIL_PROVIDER,
    pass: process.env.MAIL_PROVIDER_PASSWORD,
  }
};

export default mailConfig;
