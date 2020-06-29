/**
 * This is Auth utils
 */

class Auth {
  private authenticted;

  constructor() {
    this.authenticted = false;
  }

  login(cb) {
    this.authenticted = true;
    cb();
  }

  logout(cb) {
    this.authenticted = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticted;
  }
}

export default new Auth();
