"use strict"

var Alexa = require('alexa-sdk');
var APP_ID = "";

exports.handler = (event, context) => {
	var alexa = Alexa.handler(event,context);
	alexa.app_Id = APP_ID;
	alexa.registerHandlers(handlers);
	alexa.execute();
};

var handlers = {
	'AMAZON.HelpIntent': function(){
        var speechOutput = "You can say give me  the result of two plus three or you can say exit..";
        var reprompt = "What can I help you with ?";
        this.emit(":ask", speechOutput, reprompt);
    },
    'AMAZON.StopIntent': function(){
        this.emit(":tell", "Good Bye!");
    },
    'AMAZON.CancelIntent': function(){
        this.emit(":tell", "Good Bye!");
    },
    'LaunchRequest': function(){
        this.emit(":tell","hellow");
    },
    'calculateThis' : function(){
    	var speechOutput = "the result is ";
    	var filledSlots = delegateSlotCollection.call(this);

    	//getting the numbers
    	var firstNum = Number(this.event.request.intent.slots.firstNum.value);
    	var secondNum = Number(this.event.request.intent.slots.secondNum.value);
    	var operator = this.event.request.intent.slots.operator.value;
    	console.log(operator);

    	//building calculator
    	var result = 0 ;
    	if(operator == "plus"){
    		result = firstNum + secondNum;
    	}else if(operator == "minus"){
    		result = firstNum - secondNum;	
    	}else if(operator == "multiplied by"){
    		result = firstNum * secondNum;
    	}else{
    		result = firstNum/secondNum;
    	}
    	console.log(result);
    	console.log(secondNum);

    	speechOutput += result;
    	console.log(speechOutput);
    	this.emit(":tell", speechOutput);
    },
    'SessionEndedRequest': function () {
        var speechOutput = "";
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    }

};

function delegateSlotCollection(){
  console.log("in delegateSlotCollection");
  console.log("current dialogState: "+ this.event.request.dialogState);
    if (this.event.request.dialogState === "STARTED") {
      console.log("in Beginning");
      var updatedIntent=this.event.request.intent;
      //optionally pre-fill slots: update the intent object with slot values for which
      //you have defaults, then return Dialog.Delegate with this updated intent
      // in the updatedIntent property
      this.emit(":delegate", updatedIntent);
    } else if (this.event.request.dialogState !== "COMPLETED") {
      console.log("in not completed");
      // return a Dialog.Delegate directive with no updatedIntent property.
      this.emit(":delegate");
    } else {
      console.log("in completed");
      console.log("returning: "+ JSON.stringify(this.event.request.intent));
      // Dialog is now complete and all required slots should be filled,
      // so call your normal intent handler.
      return this.event.request.intent;
    }
}