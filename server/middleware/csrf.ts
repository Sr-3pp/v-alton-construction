export default defineEventHandler(async (event) => {

  return 
  if (event.node.req.method !== 'GET' && !event.node.req.url?.includes('/api/content')) {
    const csrfCookie = getCookie(event, 'csrf_token'); // Get the token from the cookie
    const body = await readBody(event); // Read request body
    const csrfHeader = event.node.req.headers['x-csrf-token']; // CSRF header (for AJAX)
    
    // Check if CSRF token is in the body (for form submissions)
    const csrfBody = body?.csrfToken;

    if (!csrfCookie || (csrfHeader !== csrfCookie && csrfBody !== csrfCookie)) {
      throw createError({ statusCode: 403, statusMessage: 'Invalid CSRF token' });
    }
  }
});