/* 
 * jQuery Mathenticate - v0.1.0 
 * https://github.com/stevenwadejr/jquery-mathenticate 
 * 
 * @author Steven Wade 
 * http://stevenwade.name 
 */

;(function($, window, document, undefined){

	// Create the defaults once
	var pluginName = 'mathenticate',
			defaults = {
				bounds: [1, 10],
				insertWhere: 'submit',
				insertHow: 'before',
				operator: '+'
			},
			_answer,
			_constants = {
				first: 0,
				second: 0
			},
			_randomOperators = ['+', '-', '*', '/'],
			_insertBox, _createBox, _randomNumber;
	
	function Mathenticate(element, options)
	{
		this.element = element;
		this.$element = $(this.element);
	
		if( options !== undefined && options.operator === 'random' )
		{
			options.operator = _randomOperators[Math.floor(Math.random()*_randomOperators.length)];
		}
		
		this.options = $.extend({}, defaults, options);
		
		this._defaults = defaults;
		this._name = pluginName;
		
		this.init();
	}
	
	Mathenticate.prototype = {
	
		init: function()
		{
			_createBox(this);
			this.generate();
			_insertBox(this);
			
			var self = this;
			this.$element.on('submit', function(e){
				if( self.$auth.val() != _answer )
				{
					e.preventDefault();
					return false;
				}
			});
		},
		
		// Generates equation and answer
		generate: function()
		{
			var first, second, hint, operator, bounds = this.options.bounds;
			first = _randomNumber(bounds[0], bounds[1]);
      second = _randomNumber(bounds[0], bounds[1]);
      
      switch(this.options.operator)
			{
				case 'add' :
				case 'plus' :
				case '+' :
					operator = '+';
					_answer = first + second;
					break;
				case 'subtract' :
				case 'minus' :
				case '-' :
					if( first < second )
					{
						var firstBak = first;
						first = second;
						second = firstBak;
					}
					operator = '-';
					_answer = first - second;
					break;
				case 'multiply' :
				case '*' :
					operator = 'x';
					_answer = first * second;
					break;
				case 'divide' :
				case '/' :
					if( first < second )
					{
						var firstBak = first;
						first = second;
						second = firstBak;
					}
					operator = '/';
					_answer = first / second;
					break;
			}
      
      hint = first + ' ' + operator + ' ' + second;
      this.$auth.attr('placeholder', hint);
      
      _constants.first = first;
      _constants.second = second;
		}
		
	};
	
	// Private Methods
	_createBox = function(self)
	{
		self.$auth = $('<input type="text" name="mathenticate" />');
	};
	
	_insertBox = function(self)
	{
		var submits, $el = $(self.options.insertWhere);
		if( self.options.insertWhere === 'submit' )
		{
			submits = self.$element.find('input[type="submit"], button[type="submit"]');
			$el = $(submits[submits.length - 1]);
		}
		
		if( self.options.insertHow === 'before' )
		{
			self.$auth.insertBefore($el);
		}
		else
		{
			self.$auth.insertAfter($el);
		}
	};
	
	_randomNumber = function(to, from)
	{
		return Math.floor(Math.random() * (to - from + 1) + from);
  };
	
	$.fn[pluginName] = function(options){
		return this.each(function () {
			if( ! $.data(this, 'plugin_' + pluginName) )
			{
				$.data(this, 'plugin_' + pluginName, new Mathenticate(this, options));
			}
		});
	};

})(jQuery, window, document);