$(document).ready(function() {

  // When the form is submitted, send a request to the server to create a todo
  // After you're sure the todo was created in the DB, prepend an <li> to the list of todos with the new todo info
  $("form").on("submit", function(e) {
    e.preventDefault();
    input = $('input[type="text"]').val();
    $.ajax({
    	type: 'POST',
    	url: '/todos',
    	data: { 
    		todo: { task: input,
    		done: false 
    		}
    	},
    	success: $('ul').prepend('<li>' + input + '<input id="done" name="done" type="checkbox" value="yes"> <span>x</span></li>')
    });
    $('input[type="text"]').val('');
  });

 $('li input[type="checkbox"]').on('click', function(){
 		item = $(this).parent();
 		item_id = item.attr('data-todo-id');
 		$.ajax({
 			type: 'PUT', 
 			url: '/todos/' + item_id,
 			data: {todo: { task: item.text(), done: true }},
 			success: item.addClass('done')
 		})
 })

 $('li span').on('click', function(){
 	item = $(this).parent();
 	item_id = item.attr('data-todo-id');
 
 		$.ajax({
 		type: 'DELETE',
 		url: '/todos/' + item_id,
 		// data: { todo: item_id},
 		success: $(item, 'ul').remove()
 	})

 })
});