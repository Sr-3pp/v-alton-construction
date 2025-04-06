import jwt from 'jsonwebtoken';
const { public: config } = useRuntimeConfig();

const secret = config.mail.jwt_secret;

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);

  const mailData: {
    name: string;
    email: string;
    subject: string;
    message: string;
    attachments: {filename: string, data: Buffer}[];
  } = {
    name: '',
    email: '',
    subject: '',
    message: '',
    attachments: []
  };

  data?.forEach((value) => {
    if (value.name! in mailData && value.name !== 'attachments') {
      (mailData as any)[value.name!] = value.data.toString();
    }
  });

  const attachments = data?.find((value) => value.name === 'attachments');
  if (attachments) {
    mailData.attachments.push({
      filename: attachments.filename!,
      data: attachments.data
    });
  }

  const token = jwt.sign({
    name: mailData.name,
    email: mailData.email,
    config: config.mail
  }, secret, { expiresIn: '1h' });

  const res = await $fetch(config.mail.endpoint, {
    method: 'POST',
    body: mailData,
    headers: {
      'sr_token': token
    }
  });

  return res
})