# SASL : GSSAPI

This module is a JavaScript implementation of the GSSAPI Kerberos v5 SASL mechanism,
which plugs into the [SASL](https://github.com/jaredhanson/js-sasl) framework.

## Install

##### npm

    $ npm install sasl-gssapi

##### volo

    $ volo add sineer/js-sasl-gssapi sasl-gssapi

For more information on using volo to manage JavaScript modules, visit [http://volojs.org/](http://volojs.org/).

## Usage

Register the GSSAPI mechanism.

```javascript
factory.use(require('sasl-gssapi'));
```

Send an authentication response with necessary credentials.

```
var mech = factory.create(['GSSAPI']);
var resp = mech.challenge('realm="elwood.innosoft.com",nonce="OA6MG9tEQGm2hh",qop="auth",algorithm=md5-sess,charset=utf-8')
               .response({ username: 'chris', password: 'secret', host: 'elwood.innosoft.com', serviceType: 'imap' });
```

## Compatibility

##### Browser

This module is [AMD](https://github.com/amdjs/amdjs-api)-compliant, and can be
loaded by module loaders such as [RequireJS](http://requirejs.org/).

This module is optimized for use with [Anchor](https://github.com/anchorjs/anchor).

##### Node

This module is compatible with [Node](http://nodejs.org/).

## Tests

##### Browser

To run tests in a browser, execute the Make target for the desired browser:

    $ make test-chrome
    $ make test-firefox
    $ make test-safari

##### PhantomJS

To run headless tests from a terminal using [PhantomJS](http://phantomjs.org/):

    $ make test-phantomjs

##### Node

To run tests in Node:

    $ make test-node
    
##### Status

[![Travis CI](https://secure.travis-ci.org/sineer/js-sasl-gssapi.png)](http://travis-ci.org/sineer/js-sasl-gssapi)

## Credits

  - [Jeremie Plante](http://github.com/sineer)

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2013 Jeremie Plante <[http://sin.io/](http://sin.io/)>
