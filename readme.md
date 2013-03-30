# Mathenticate

## Simple math based form validation

jQuery Mathenticate adds a math based CAPTCHA to a HTML form. 

Math based validation is more logical and easier to read than image based CAPTCHAs.

Mathenticate requires no setup although it does provide some customization. Once initialized, Mathenticate will generate a random equation, create an authorization box, insert the authorization box into the form, and listen for a submit event to test the answer provided against the generated answer. 

**Current Version - 0.2.1**

3.6K full  
1.8K min  
892 bytes min + gzipped

## Example Use

	$('form').mathenticate()

or

	$('form').mathenticate({
	  	bounds: [1, 10],
	  	insertWhere: 'submit',
	  	insertHow: 'before',
		operator: 'add'
	});

## jQuery Validation

Added in v0.2.1, Mathenticate can be integrated with the [jQuery Validation plugin](http://bassistance.de/jquery-plugins/jquery-plugin-validation/).

### Example Validation

	<form id="form">
  		<input type="text" name="first_name" placeholder="First Name" class="required" /> <br>
  		<input type="text" name="last_name" placeholder="Last Name" class="required" /> <br>
  	
  		<br>
  		<div class="auth" style="border: 1px solid red; display: inline-block;"></div>
  		<input type="submit" name="submit" />
  	</form>
  	
&nbsp;

	$('#form')
		.mathenticate({
			bounds: [2, 8],
			insertWhere: '.auth',
			insertHow: 'into',
			operator: 'add',
			validate: true
		})
		.validate({
			rules: {
				mathenticate: {
		  			required: true,
		  			mathenticate: true
				}
			}
		});
	
## Mathenticate Properties

###`attrs`

Pass any key:value pairs that you want to be attributes for the mathenticate element.

	attrs: {
		class: 'text input',
		id: 'mathenticate-box'
	}

###`bounds`

Upper and lower bounds for the equation constants to be randomly chosen from. By default 2 numbers will be randomly chosen between 1 and 10.

###`insertWhere`

Sibling element where the auth box should be inserted. The default `submit` will look for a submit button (ie: `<input type="submit" />` or `<button type="submit">`).

Mathenticate also accepts (ie: `#some-div`, `.text-box`)

###`insertHow`

Insert auth box `before` or `after` the `insertWhere` element. Default is `before`.

###`operator`

Math operation to generate (ie: `add`, `subtract`, `multiply`, or `divide`). Also accepts any of the following: `+ - * / plus minus`.

You can also choose `random` in with Mathenticate will choose an operator randomly at initialization.

###`validate`

Set to `true` to use with the jQuery Validate plugin. Default is `false`.