
(function($){
  $(function(){

    $('.button-collapse').sideNav({
          menuWidth: 300, // Default is 240
          edge: 'left', // Choose the horizontal origin
          // closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
        }
      );


    $('h2').each(function (index, value){
        var id = $(this).attr('id')
        var name = $(this).text()
        var li = "<li><a href='#" +
          id + "'>" +
          name + "</a></li>";

          $('#toc').append($(li));

      });

    $('.scrollspy').scrollSpy();



  }); // end of document ready
})(jQuery); // end of jQuery name space
