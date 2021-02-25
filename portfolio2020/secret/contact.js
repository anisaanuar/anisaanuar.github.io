<script src="https://cdn.jotfor.ms/static/prototype.forms.js" type="text/javascript"></script>
<script src="https://cdn.jotfor.ms/static/jotform.forms.js?3.3.6111" type="text/javascript"></script>
<script type="text/javascript">
   JotForm.init(function(){
      setTimeout(function() {
          $('input_4').hint('example@example.com');
       }, 20);
      setTimeout(function() {
          $('input_7').hint('Subject');
       }, 20);
      JotForm.setCustomHint( 'input_6', 'Message' );
      JotForm.alterTexts(undefined);
	JotForm.clearFieldOnHide="disable";
	JotForm.submitError="jumpToFirstError";
    /*INIT-END*/
});

   JotForm.prepareCalculationsOnTheFly([null,{"name":"tellMe","qid":"1","text":"Tell me about you","type":"control_head"},{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},{"description":"","name":"whatsYour","qid":"3","text":"What's your name?","type":"control_fullname"},{"description":"","name":"whatEmail","qid":"4","subLabel":"","text":"What e-mail address can I use to reach you?","type":"control_email"},{"description":"","name":"whatPhone","qid":"5","text":"What phone number can I use to reach you?","type":"control_phone"},{"description":"","name":"whatIs6","qid":"6","subLabel":"","text":"What is your message?","type":"control_textarea"},{"description":"","name":"whatIs","qid":"7","subLabel":"","text":"What is the subject of your message?","type":"control_textbox"}]);
   setTimeout(function() {
JotForm.paymentExtrasOnTheFly([null,{"name":"tellMe","qid":"1","text":"Tell me about you","type":"control_head"},{"name":"submit2","qid":"2","text":"Submit","type":"control_button"},{"description":"","name":"whatsYour","qid":"3","text":"What's your name?","type":"control_fullname"},{"description":"","name":"whatEmail","qid":"4","subLabel":"","text":"What e-mail address can I use to reach you?","type":"control_email"},{"description":"","name":"whatPhone","qid":"5","text":"What phone number can I use to reach you?","type":"control_phone"},{"description":"","name":"whatIs6","qid":"6","subLabel":"","text":"What is your message?","type":"control_textarea"},{"description":"","name":"whatIs","qid":"7","subLabel":"","text":"What is the subject of your message?","type":"control_textbox"}]);}, 20); 
</script>