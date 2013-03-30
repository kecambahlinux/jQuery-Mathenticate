;(function($, window, document, undefined){

	// Create the defaults once
	var pluginName = 'mathenticate',
			defaults = {
				attrs: {
					'class': 'mathenticate'
				},
				bounds: [1, 10],
				insertWhere: 'submit',
				insertHow: 'before',
				operator: '+',
				validate: false
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
			_validate(this);
			
			var self = this;
			this.$element.on('submit', function(e){
				if( ! self.isValid() )
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
      
      hint = first + ' ' + operator + ' ' + second + ' = ?';
      this.$auth.attr('placeholder', hint);
      
      _constants.first = first;
      _constants.second = second;
		},
		
		isValid: function()
		{
			return parseInt(this.$auth.val()) === _answer;
		}
		
	};
	
	// Private Methods
	_createBox = function(self)
	{
		self.$auth = $('<input type="text" name="mathenticate" />');
		$.each(self.options.attrs, function(index, value){
			self.$auth.attr(index, value);
		});
	};
	
	_insertBox = function(self)
	{
		var submits, $el = $(self.options.insertWhere);
		if( self.options.insertWhere === 'submit' )
		{
			submits = self.$element.find(':submit');
			$el = $(submits[submits.length - 1]);
		}
		
		switch(self.options.insertHow)
		{
			case 'into' :
				self.$auth.appendTo($el);
				break;
			case 'after' :
				self.$auth.insertAfter($el);
				break;
			case 'before' :
			default :
				self.$auth.insertBefore($el);
				break;
		}
	};
	
	_validate = function(self)
	{
		if( self.options.validate && $.validator !== undefined )
		{
			$.validator.addMethod('mathenticate', function(value, element, params){
				return self.isValid();
			}, 'Please solve for the equation.');
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