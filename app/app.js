//TODO : Storing data inside a controller isn't my idea of a "good idea" move it out of here when you understand AngularJS :)
// (function ()
	// {
		var app = angular.module('flashcards', ['ngRoute','angular.filter']);
		
		app.active_card = 0;
		app.selected_quizzes = [];
		app.activedeck='';
		app.controller('CardController', function(){
			this.deck = deck;
			this.colorsArray = ["Red","Green","Lellow"];
			this.available_books = [];
			this.available_questions = [];
			this.available_decks = [{"code":"LTLL-2015-BB","label":"LTLL 2015"}];
			this.selected_deck = "LTLL-2015-BB";
			this.chosen_book_chapters = [];
			this.chosen_set = "";
			this.active_card = 0;
			this.books_to_iterate = [];
			this.card = this.available_questions[this.active_card];
			this.get_next_card = function() {
				// if( this.card.SEQUENCE < this.deck.length ) {
				// 	this.active_card = this.active_card + 1;
				// 	this.card = this.deck[this.active_card];
				// };
				if( this.active_card < this.available_questions.length - 1 ) {
					this.active_card = this.active_card + 1;
					this.card = this.available_questions[this.active_card];
				}
				
			};
			this.get_previous_card = function() {
				// if( this.card.SEQUENCE > 1 ) {
				// 	this.active_card = this.active_card - 1;
				// 	this.card = this.deck[this.active_card];
				// };
				if( this.active_card > 0 ) {
					this.active_card = this.active_card - 1;
					this.card = this.available_questions[this.active_card];
				}
			};
			this.apply_configuration = function() {
			};
			
			this.update_books = function() {
				var lookup = {};
				var items = this.deck;
				var result = [];

				for (var item, i = 0; item = items[i++];) {
				  var book = {
					    "BOOK":item.BOOK,
					    "BOOK_NUMBER":item.BOOK_NUMBER,
					  	"CHAPTER":item.CHAPTER
					  }

				  if (!(book.BOOK+book.CHAPTER in lookup)) {
				    lookup[book.BOOK+book.CHAPTER] = 1;
				    result.push(book);
				  }
				}
				this.available_books = result;
			}
			
			this.tear_down_quizzes = function(){
				this.available_questions = [];
				this.active_card = 0;
				
			}
			
			this.add_to_quizzes = function(quizset, booknum, chapter){

				console.log( "Handling: set: " + quizset + " Book Number: " + booknum + " Chapter: " + chapter );
				//get all of the questions for this book and chapter.
				var lookup = {};
				var items = this.deck;
				var result = [];
				var counter = 0;
				for (var item, i = 0; item = items[i++];) {
				  var question = {
					    "BOOK":item.BOOK,
					    "BOOK_NUMBER":item.BOOK_NUMBER,
					  	"CHAPTER":item.CHAPTER,
						"QUESTION_NUMBER":item.QUESTION_NUMBER,
						"SEQUENCE":item.SEQUENCE,
						"BCQ_KEY":item.BCQ_KEY,
						"CORRECT_OPTION":item.CORRECT_OPTION,
						"QUESTION":item.QUESTION,
						"CHOICE_A":item.CHOICE_A,
						"CHOICE_B":item.CHOICE_B,
						"CHOICE_C":item.CHOICE_C,
						"CHOICE_D":item.CHOICE_D,
						"CARD_SET":item.CARD_SET
					  };
					
					  if( question.BOOK_NUMBER==booknum && question.CHAPTER==chapter ){
	  					if (!(question.BOOK_NUMBER+question.CHAPTER+question.SEQUENCE in lookup)) {
	  						lookup[question.BOOK+question.CHAPTER+question.SEQUENCE] = 1;
	  						result.push(question);
	  						counter++; 
	  						this.available_questions.push(question);
	  					}

	    					console.log( "loaded: set: " + question.CARD_SET + " Book Number: " + question.BOOK_NUMBER + " Chapter: " + question.CHAPTER + " count: " + question.QUESTION_NUMBER );					  	
					  }

				}
				// this.available_questions.push(result);
			}
			
			this.update_quiz = function( imo ) {
				//We are expecting an object array.
				this.tear_down_quizzes();
				if( imo.length >= 1 ){
					//iterate the object array and apply the logic
					for( i=0; i<imo.length; i++){
						var bookitem = imo[i];
						this.add_to_quizzes( "" + this.selected_deck, "" + bookitem.BOOK_NUMBER, "" + bookitem.CHAPTER );
					}
				}
				if( this.available_questions.length>0 ){
					this.card = this.available_questions[this.active_card];
				}
			}
			
		});

	// }
// )();