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
export async function loginWithDemo({ email, password, rememberMe, role }) {
  // Simulate a short network delay for realistic UI feedback.
  await new Promise((resolve) => setTimeout(resolve, 350))

  const cleanEmail = (email || '').toLowerCase().trim()
  const resolvedRole = role || (cleanEmail.includes('admin') ? 'admin' : 'user')

  const user = resolvedRole === 'admin'
    ? {
        id: 'ADM-901',
        fullName: 'Admin Operations',
        email: cleanEmail || 'admin.ops@campus-facilities.edu',
        role: 'admin',
        department: 'Central Facilities Management',
      }
    : {
        id: 'USR-1042',
        fullName: 'Alex Morgan',
        email: cleanEmail || 'alex.morgan@campus.edu',
        role: 'user',
        studentId: 'STU-2024-8842',
        department: 'Computer Science & Engineering',
      }

  try {
    localStorage.setItem('fixit_current_user', JSON.stringify(user))
  } catch {
    // Ignore storage restriction if any
  }

  return {
    success: true,
    code: 'DEMO_LOGIN_SUCCESS',
    message: `Authenticated as ${user.fullName}. Redirecting to ${resolvedRole === 'admin' ? 'Admin' : 'User'} Dashboard...`,
    user,
    redirectTo: resolvedRole === 'admin' ? '/admin/dashboard' : '/user/dashboard',
    meta: {
      email: cleanEmail,
      rememberMe: Boolean(rememberMe),
      hasPassword: Boolean(password),
    },
  }
}

/**
 * Frontend demo registration helper.
 * Simulates a successful user registration for demo purposes.
 * Replace this with a real backend API call later
 * (for example: POST /api/auth/register).
 */
export async function registerWithDemo({
  fullName,
  email,
  studentId,
  department,
  phone,
  password,
}) {
  // Simulate a realistic short network delay
  await new Promise((resolve) => setTimeout(resolve, 650))

  return {
    success: true,
    message: 'Your FixIt account has been registered successfully!',
    user: {
      fullName,
      email,
      studentId,
      department,
      phone,
      role: 'user',
      registeredAt: new Date().toISOString(),
    },
    meta: {
      // Password is intentionally not stored or returned in full for security
      hasPassword: Boolean(password),
    },
  }
}

/**
 * Frontend demo password reset request helper.
 * Simulates requesting a password reset email for demo purposes.
 * Replace this with a real backend API call later
 * (for example: POST /api/auth/forgot-password).
 */
export async function requestPasswordResetDemo({ email }) {
  // Simulate a realistic network delay for realistic UI feedback
  await new Promise((resolve) => setTimeout(resolve, 600))

  return {
    success: true,
    message: 'A password reset link has been dispatched to your email address (demo mode).',
    email,
    sentAt: new Date().toISOString(),
  }
}


