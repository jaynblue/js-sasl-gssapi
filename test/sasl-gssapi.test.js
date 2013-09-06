(function(root, factory) {
  if (typeof exports === 'object') {
    // CommonJS
    factory(require('../main'));
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['sasl-gssapi'], factory);
  }
}(this, function(saslgssapi) {

  describe('sasl-gssapi', function() {
    
    it('should export Mechanism', function() {
      expect(saslgssapi.Mechanism).to.be.a('function');
    });
    
    it('should export Mechanism via module', function() {
      expect(saslgssapi).to.equal(saslgssapi.Mechanism);
    });
    
  });
  
  return { name: 'test.sasl-gssapi' };
  
}));
