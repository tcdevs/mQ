#mQ.js

Super small mini Javascript "framework" with a bunch of tools!

- Handly AngularJs or Vanilla Javascript DOM selector for single or multiple targets.
- Custom Log, Info, Warn, Error functions
- 3 new methods LocalStorage
- 10 extra String methods
- 2 Real random Number methods
- 1 Function method

## Get started

Include the `mQ.js` in your HTML file.
`<script src="mQ.js"></script>`

Usage with AngularJS standalone:
```
$('.par, .par1, #hdr').addClass('red').append( "<strong>Hello</strong>" );
$( '#checkin' ).bind( "click", function() {
	alert( "User clicked on 'foo.'" );
});
$( "b" ).append( $( "b" ).clone().prepend(' - ') );
```

Usage with AngularJS AND jQuery:
```
$$('.par, .par1, #hdr').addClass('red').append( "<strong>Hello</strong>" );
$$( '#checkin' ).bind( "click", function() {
	alert( "User clicked on 'foo.'" );
});
$$( "b" ).append( $( "b" ).clone().prepend(' - ') );
```

Usage with Vanilla Javascript:
```$('.par').innerHTML ="HELLO WORLD FROM <b>MQUERY</b>!";```

## Bug tracker

Have a bug, enhancement, idea or question? Please create an issue here on GitHub!

https://github.com/tcdevs/mQ/issues

## Authors

**tcdevs**

+ http://github.com/tcdevs

## Contributing

1. Fork it
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Create new Pull Request

## Copyright and license

Code and documentation copyright 2014 tcdevs. Code released under the [MIT license](https://github.com/tcdevs/ng-Q/blob/master/LICENSE). 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.