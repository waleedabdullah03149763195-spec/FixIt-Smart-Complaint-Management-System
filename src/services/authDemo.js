/**
 * Frontend demo authentication helper.
 * Replace this with a real backend API call later
 * (for example: POST /api/auth/login).
 *
 * Expected future response shape:
 * { success: true, user: { id, email, role }, token }
 *
 * Roles in the final system:
 * - user (Student/User)
 * - admin
 * - technician
 * - manager
 *
 * Public registration will only create "user" accounts.
 * Admin, Technician, and Manager accounts will be created
 * by authorized administration only.
 */
export async function loginWithDemo({ email, password, rememberMe }) {
  // Simulate a short network delay for realistic UI feedback.
  await new Promise((resolve) => setTimeout(resolve, 450))

  // No backend authentication is configured in this demo build.
  return {
    success: false,
    code: 'DEMO_AUTH_NOT_CONFIGURED',
    message:
      'Demo authentication is not configured yet. Your details were validated on the frontend only and were not sent to a server.',
    meta: {
      email,
      rememberMe: Boolean(rememberMe),
      // password is intentionally not returned or stored
      hasPassword: Boolean(password),
    },
  }
}
