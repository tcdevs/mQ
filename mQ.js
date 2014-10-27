/**
 * mQuery wrapped in IIFE
 * @author z3bbster
 * @created 24-10-2014 10:20:00 
 * @param  {window} w window
 * @param  {document} d document
 */
(function (w, d) {
	console.log("%cmQ lib v0.1", "color:red; background:#1b357d; font-size: 14pt");
	console.time('mQ init');
	/**
	 * FFSM - Micro fluent API helper
	 * Tiny helper function to create fluent interfaces/APIs in a somewhat consistent way.
	 * @resource https://github.com/0x01/mu-ffsm
	 */
	var FFSM=function(n){return function(t){var r=n[0]?n[0](t):0,u=function(t){return n[1]?n[1](r,t):r};return Object.keys(n).forEach(function(t){/^\d+$/.test(t)||(u[t]=function(f){return r=n[t](r,f),u})}),u}};
	
	// Framework &Library detection - Easy references
	// IE HACK - Avoid using "!window.framework" since 
	// IE will return the error: framework is 'undefined'
	var	jq = typeof jQuery !== 'undefined', 	// Is jQuery loaded?
		ng = typeof angular !== 'undefined', 	// Is angularJS loaded?
        un = typeof _ !== 'undefined', 			// Is Underscore loaded?
        lo = typeof _ !== 'undefined', 			// Is Lodash loaded?
        NodeJs = typeof module !== 'undefined';	// Is NodeJs loaded?

	/**
	 * mQuery main methods
	 * @type {Object}
	 */
	var mQuery = {
		// Single DOM reference "div.class"
		qs : function (e){ return document.querySelector(e); },
		// Multiple DOM reference "div.note, div.alert"
		qsa : function (e){ return document.querySelectorAll(e); },
		// Single AngularJs DOM reference "div.class"
		ng_qs : function (e){ return angular.element( document.querySelector(e) ); },
		// Multiple AngularJs DOM reference ".note, #alert"
		ng_qsa : function (e){ return angular.element( document.querySelectorAll(e) ); }
	};

	/**
	 * mQ main function
	 * @param  {string} elem target DOM element(s) name
	 * @param  {boolean} select single or multiple targets
	 * @return {HTML} target element(s)
	 */
	var mQ = function (elem, all) {
		// Is angularJS around?
		if (ng) { return  all ? mQuery.ng_qsa(elem): mQuery.ng_qs(elem); }
		// Vanilla JS fallback
		else{ return all ? mQuery.qsa(elem): mQuery.qs(elem);} 
	};

	var Qlite = FFSM({
		0: function (e) { return d.querySelector(e); },
		addClass: function (r, classname) { var cn = r.className; if( cn.indexOf( classname ) != -1 ) return; if( cn != '' ) classname = ' '+classname; r.className = cn+classname; return r; },
		removeClass: function (r, classname) { var cn = r.className, rxp = new RegExp( "\\s?\\b"+classname+"\\b", "g" ); cn = cn.replace( rxp, '' ); r.className = cn; return r; },
		1: function (r, mess) { r.innerHTML += " <b>" + mess + "</b>"; return r;  }
	});

	/**
	 * logMethods - Lightweight Wrapper for console.log, console.info, console.warn, console.error
	 * - Prevent errors if a console isn’t around (i.e. IE)
	 * - Maintain a history of logs, so you can look in the past if your console is added afterwards (e.g. firebug lite)
	 * - Normalize the browser differences in console integration (e.g. when passing multiple arguments into console.log())
	 * - For something you type regularly, make it quicker to type for the lazy among us.
	 * @type {Object}
	 * @author Paul Irish
	 */
	var logMethods = {
		Log: function(){Log.history=Log.history||[];Log.history.push(arguments);if(this.console){console.log(Array.prototype.slice.call(arguments))}},
		Info: function(){Info.history=Info.history||[];Info.history.push(arguments);if(this.console){console.info(Array.prototype.slice.call(arguments))}},
		Warn: function(){Warn.history=Warn.history||[];Warn.history.push(arguments);if(this.console){console.warn(Array.prototype.slice.call(arguments))}},
		Error: function(){Error.history=Error.history||[];Error.history.push(arguments);if(this.console){console.error(Array.prototype.slice.call(arguments))}}
	};

	/**
	 * [storageMethods description]
	 * @type {Object}
	 */
	var storageMethods = {
		setObj: function(key, obj) {return this.setItem(key, JSON.stringify(obj))},
		getObj: function(key) {return JSON.parse(this.getItem(key))},
		remainingSpace: function(key) { return ( 1024 * 1024 * 5 - unescape(encodeURIComponent(JSON.stringify(localStorage))).length ) }
	};

	/**
	 * stringMethods - Some useful additional methods for String.prototype.
	 * @url string.js - James Padolsey - http://james.padolsey.com
	 * @url prototype.js - sstephenson - https://github.com/sstephenson/prototype
	 * @type {Object}
	 */
	var stringMethods = {
		// Checks if the string is empty. Usage: "".empty()
		empty: function() { return this == ''; },
        // Returns a string with all matches of what (regex) removed.
		remove: function( what ) { return this.replace( what || /./g, '' ); },
        // Returns the string, reversed.
        reverse: function() { return this.split('').reverse().join(''); },
        // Shortens the string by the specified amount and appends the token.
        // "this is a long sentance".shorten(10, '...'); => "this is a ..."
        shorten: function( length, token ) { var substrd = this.substring( 0, length || this.length ); return substrd + ( substrd === this ? '' : (token || '') ); },
        //Returns boolean indicating whether or not a substring exists within the string
        contains: function( what ) { what = typeof what === 'string' ? what : what.toString(); return this.indexOf( what ) > -1; },
        // Matches the string against the passed regex and the returns the group specified by _n_
        // E.g. ('hi @boo and @adam').extract(/@(\w+)/g, 1); => ['boo', 'adam']
		// If the regex is global then an array is returned otherwise just the matched group is returned.
        extract: function( regex, n ) { n = n === undefined ? 0 : n; if ( !regex.global ) { return this.match(regex)[n] || ''; }var match,extracted = [];while ( (match = regex.exec(this)) ) { extracted[extracted.length] = match[n] || ''; }; return extracted; },
        // Example: var data = { 'brown': 'red', 'lazy': 'slow'}; 
        // "The quick %{brown} fox jumped over the %{lazy} dog".bindData( data ); => The quick red fox jumped over the slow dog
        bindData: function (data) { var m,ret = this; while ( m = /%\{\s*([^\}\s]+)\s*\}/.exec(ret) ) { ret = ret.replace( m[0], data[m[1]] || '??' ); } return ret; },        
        // Runs the passed function on every character, similar to Array.prototype.forEach
        forEach: function( fn ) { var c, i = -1; while ( (c = this[++i]) ) { fn.call( this, c, i ); } return true; },
        // Runs the passed function on every word, similar to Array.prototype.forEach
        forEachWord: function( fn ) { var string = this, i = -1; string.replace(/\b([\w\-]+)\b/g, function( match, word ){ fn.call( string, word, ++i ); return match; }); return true; },
        // Runs the Array.sort() method on every character of the string.
        sort: function() { return Array.prototype.sort.apply( this.split(''), arguments ).join(''); }
	};

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	var numberMethods = {
		// Returns a random number between min (inclusive) and max (exclusive)
		getRandomArbitrary: function(min, max) { return Math.random() * (max - min) + min; },
		// Returns a random integer between min (included) and max (excluded)
		getRandomInt: function(min, max) { return Math.floor(Math.random() * (max - min)) + min; }
	}

	/**
	 * [FunctionMethods description]
	 * @type {Object}
	 */
    var FunctionMethods = {
    	// https://stackoverflow.com/a/1445840
    	// (function(){alert("Hello World!");}).callAfter(3);
    	callAfter: function(delay) { setTimeout(this, delay*1000); }
    };

	// If you want to modify any type in the JavaScript type system then you'll have to modify the Object prototype
	// http://stackoverflow.com/a/10528549
	// Object.prototype.foo = function () { console.log('foo'); };
	// (1).foo();
	// 'asd'.foo();
	// (true).foo();
	// ({ bar: 'baz' }).foo();


	/**
	 * [ObjectMethods]
	 * @type {Object}
	 */
	var ObjectMethods = {}


    //----------------------------------------------------------------------------------//
    // SETUP PHASE
    //----------------------------------------------------------------------------------//
    
    // Setup mQuery DOM selector
    if (jq) w.mQ = mQ;
    if (!jq || !jq && ng) w.$ = mQ; 

    //tests
    w.Qlite = Qlite;
   
	// Setup internal log methods if they don't exsists yet
	for (var method in logMethods) {
        w[method] = logMethods[method];
    }

    // Setup internal Storage methods if they don't exsists yet
    for (var method in storageMethods) {
        Storage.prototype[method] = Storage.prototype[method] || storageMethods[method];
    }

	// Setup internal String methods if they don't exsists yet
    for (var method in stringMethods) {
        String.prototype[method] = String.prototype[method] || stringMethods[method];
    }

    // Setup internal Object methods if they don't exsists yet
    for (var method in FunctionMethods) {
        Function.prototype[method] = Function.prototype[method] || FunctionMethods[method];
    }

    // Setup internal number methods if they don't exsists yet
    for (var method in numberMethods) {
        //w[method] = w[method] || numberMethods[method];
    }
    console.timeEnd('mQ init');

})(window, document);