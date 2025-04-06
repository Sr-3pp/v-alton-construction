import { randomUUID } from 'crypto';

export default defineEventHandler((event) => {
  let csrfToken = getCookie(event, 'csrf_token');

  if (!csrfToken) {
    csrfToken = randomUUID();
    setCookie(event, 'csrf_token', csrfToken, {
      httpOnly: true, // Secure against JavaScript access
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', // Prevent CSRF attacks
      path: '/',
    });
  }

  return { csrfToken };
});