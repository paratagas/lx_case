# Lx case

### Simple app for data rendering

![Lx case](http://i.imgur.com/xtxEfXF.png)

---

### Tech
Lx case uses several open source projects to work properly and for tests:

* [Node.js] - JavaScript runtime built on Chrome's V8 JavaScript engine
* [Express.js] - Node.js web application framework
* [MongoDB] - NoSQL database
* [Handlebars.js] - Semantic template
* [Grunt] - JavaScript task runner

---

### Requirements

* Tested successfully on [Node.js](https://nodejs.org/) v6.9+
* Tested successfully on [MongoDB](https://www.mongodb.com/) v2.6+

---

### Installation

* Download and extract the [latest version of Lx case](https://github.com/paratagas/lx_case)
* Install the dependencies and devDependencies:
```sh
$ cd node_assignment
$ npm install
```

* To install dependencies for making tests run:
```sh
$ npm install -g grunt-cli
$ npm install -g mocha
$ npm install -g jshint
```

---


### Launching
```sh
$ npm start
```

After that your web application is available on:

```sh
http://localhost:3000
```

---

### Development

* To automatically start the server while development run:
```sh
$ nodemon
```

---

### Settings

App settings can be changed in "settings.js"

---

### License

MIT

 [Node.js]: <https://nodejs.org/>
 [Express.js]: <http://expressjs.com/>
 [MongoDB]: <https://www.mongodb.com/>
 [Handlebars.js]: <http://handlebarsjs.com/>
 [Grunt]: <https://gruntjs.com/>
