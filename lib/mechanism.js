(function(root, factory) {
  if (typeof exports === 'object') {
    // CommonJS
    factory(exports, module, require('kerberos'));
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['exports', 'module', 'kerberos'], factory);
  }
}(this, function(exports, module, kerberos) {
  
  /**
   * GSSAPI `Mechanism` constructor.
   *
   * This class implements the GSSAPI SASL mechanism.
   *
   * References:
   *  - [RFC 4752](http://www.ietf.org/rfc/rfc4752.txt)
   *
   * @api public
   */
  function Mechanism(options) {
    options = options || {};
    this._genNonce = options.genNonce || genNonce(32);
  }
  
  Mechanism.prototype.name = 'GSSAPI';
  Mechanism.prototype.clientFirst = false;
  
  /**
   * Encode a response using given credential.
   *
   * Options:
   *  - `username`
   *  - `password`
   *  - `host`
   *  - `serviceType`
   *  - `authzid`   authorization identity (optional)
   *
   * @param {Object} cred
   * @api public
   */
  Mechanism.prototype.response = function(cred) {
    // TODO: ...
    var uri = cred.serviceType + '/' + cred.host;
    if (cred.serviceName && cred.host !== cred.serviceName) {
      uri += '/' + serviceName;
    }
    var realm = cred.realm || this._realm || ''
      , cnonce = this._genNonce()
      , nc = '00000001'
      , qop = 'auth'
      , ha1
      , ha2
      , digest;
  
    var str = '';
    str += 'username="' + cred.username + '"';
    if (realm) { str += ',realm="' + realm + '"'; };
    str += ',nonce="' + this._nonce + '"';
    str += ',cnonce="' + cnonce + '"';
    str += ',nc=' + nc;
    str += ',qop=' + qop;
    str += ',digest-uri="' + uri + '"';
    
    // if (cred.authzid) {
    //   ha1 = md5(md5(cred.username + ":" + realm + ":" + cred.password, 'binary') + ":" + this._nonce + ":" + cnonce + ":" + cred.authzid);
    // } else {
    //   ha1 = md5(md5(cred.username + ":" + realm + ":" + cred.password, 'binary') + ":" + this._nonce + ":" + cnonce);
    // }
    
    // if (qop == 'auth') {
    //   ha2 = md5('AUTHENTICATE:' + uri);
    // } else if (qop == 'auth-int' || qop == 'auth-conf') {
    //   ha2 = md5('AUTHENTICATE:' + uri + ':00000000000000000000000000000000');
    // }
    
    // digest = md5(ha1 + ":" + this._nonce + ":" + nc + ":" + cnonce + ":" + qop + ":" + ha2);
    // str += ',response=' + digest;
    
    if (this._charset == 'utf-8') { str += ',charset=utf-8'; }
    if (cred.authzid) { str += 'authzid="' + cred.authzid + '"'; }
    
    return str;
  };
  
  /**
   * Decode a challenge issued by the server.
   *
   * @param {String} chal
   * @return {Mechanism} for chaining
   * @api public
   */
  Mechanism.prototype.challenge = function(chal) {
    var dtives = parse(chal);
    
    // TODO: ...
    this._realm = dtives['realm'];
    this._nonce = dtives['nonce'];
    this._qop = (dtives['qop'] || 'auth').split(',');
    this._stale = dtives['stale'];
    this._maxbuf = parseInt(dtives['maxbuf']) || 65536;
    this._charset = dtives['charset'];
    this._algo = dtives['algorithm'];
    this._cipher = dtives['cipher'];
    if (this._cipher) { this._cipher.split(','); }
    return this;
  };
  
  
  /**
   * Parse challenge.
   *
   * @api private
   */
  function parse(chal) {
    var dtives = {};
    var tokens = chal.split(/,(?=(?:[^"]|"[^"]*")*$)/);
    for (var i = 0, len = tokens.length; i < len; i++) {
      var dtiv = /(\w+)=["]?([^"]+)["]?$/.exec(tokens[i]);
      if (dtiv) {
        dtives[dtiv[1]] = dtiv[2];
      }
    }
    return dtives;
  }
  
  /**
   * Return a unique nonce with the given `len`.
   *
   *     genNonce(10)();
   *     // => "FDaS435D2z"
   *
   * @param {Number} len
   * @return {Function}
   * @api private
   */
  function genNonce(len) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      , charlen = chars.length;
  
    return function() {
      var buf = [];
      for (var i = 0; i < len; ++i) {
        buf.push(chars[Math.random() * charlen | 0]);
      }
      return buf.join('');
    }
  }
  


  exports = module.exports = Mechanism;
  
}));
