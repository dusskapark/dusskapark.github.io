
(function($){
  $(function(){

    $('.button-collapse').sideNav({
          menuWidth: 300, // Default is 240
          edge: 'left', // Choose the horizontal origin
          // closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
        }
      );

    $('.post-content').find('img').addClass('responsive-img');

    $('h1').each(function (index, value){
        var id = $(this).attr('id')
        var name = $(this).text()
        var li = "<li class='truncate'><a href='#" +
          id + "'>" +
          name + "</a></li>";

          $('#toc').append($(li));

      });

    $('.scrollspy').scrollSpy();
    $('.dropdown-button').dropdown();



  }); // end of document ready
})(jQuery); // end of jQuery name space
