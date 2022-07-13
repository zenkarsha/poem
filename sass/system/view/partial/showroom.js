---
$path
---

$('.load-more').click(function(){
  $('.load-more').hide();
  $('.ajax-loading').show();
  var page = $('#loadingpage').val();
  var sort = $('#sort').val();
  $.ajax({
    url: '{{$path}}loadmore',
    dataType: 'html',
    type:'POST',
    data: {page: page,sort: sort},
    success: function(response){
      $('.ajax-loading').hide();
      $('.load-more').show();
      if(response=='') {
        $('.load-more').html('到底了');
      }
      else {
        var newpage = parseInt(page) + 1;
        $('#loadingpage').val(newpage);
        $('#showroom-list').append(response);
      }
    }
  });
});
