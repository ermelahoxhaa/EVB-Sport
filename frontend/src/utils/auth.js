// metodat e autentikimit dhe autorizimit
export const auth = {
  // shiku nese perdoruesi eshte i kycur
  isLoggedIn() {
    return !!localStorage.getItem('token') && !!localStorage.getItem('user');
  },

  // shiku nese useri eshte admin 
  isAdmin() {
    const user = this.getUser();
    return user && user.role === 1;
  },

  // merre usering aktual nga localStorage
  getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  
  getToken() {
    return localStorage.getItem('token');
  },

  // user login
  async login(email, password) {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    return data;
  },

  // logout
  async logout() {
    try {
      await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
