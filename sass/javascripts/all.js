var containCheck, countdown, createImage, currentTime, poemGen;

countdown = Date.now();

currentTime = Date.now();

poemGen = function() {
  var length, poemgen, position, text;
  $('.loading').show();
  $('.tools,.preview-img').addClass('process');
  position = parseInt($('input[name=position]:checked').val());
  length = parseInt($('input[name=length]:checked').val());
  if (length === 7 && position === 5) {
    position = 7;
  } else if (length === 5 && position === 6) {
    position = 3;
  } else if (length === 7 && position === 6) {
    position = 4;
  } else if (position === 7) {
    position = 'lr';
  } else if (position === 8) {
    position = 'rl';
  }
  text = $('#text').val();
  text = text.replace(/[^\u4e00-\u9fa5]/g, "");
  text = text.replace(/[\ufe30-\uffa0]/g, "");
  poemgen = new PoemGen();
  poemgen.setting({
    position: position,
    length: length,
    input_str: text
  });
  return poemgen.run(function(result) {
    $("#poem").val(result.join("\r\n"));
    $('.loading').hide();
    $('.tools,.preview-img').removeClass('process');
    return createImage();
  });
};

createImage = function() {
  $('.loading').show();
  $('.tools,.preview-img').addClass('process');

  return $.ajax({
    url: 'generate',
    dataType: 'html',
    type: 'POST',
    data: {
      text: $('#text').val(),
      poem: $('#poem').val(),
      length: $('input[name=length]:checked').val(),
      position: $('input[name=position]:checked').val(),
      bgcolor: $("#bgcolor").val(),
      color: $("#color").val(),
      vertical: $("#vertical").prop('checked'),
      shadow: $("#shadow").prop('checked'),
      font: $("#font").val(),
      fontsize: $("#fontsize").val(),
      type: 1
    },
    success: function(result) {
      var data;

      data = $.parseJSON(result);
      $('.preview-img').html(data.preview);
      if (data.renew === 1) {
        $('#poem').val(data.poem);
      }
      $('.loading').hide();
      return $('.tools,.preview-img').removeClass('process');
    }
  });
};

$(function() {
  poemGen();
  $('input.minicolors').ColorPickerSliders({
    placement: 'top',
    order: {
      rgb: 1
    }
  });
  $('#default-submit').click(function() {
    $('#type').val('3');
    return $('#appform').attr('target', '_self').submit();
  });
  $('#showroom-submit').click(function() {
    $('#type').val('2');
    return $('#appform').attr('target', '_self').submit();
  });

  $('#regen').on('click', function() {
    $('#poem').val('');
    return poemGen();
  });
  $('input[name=vertical]').on('change', function() {
    if ($('input[name=vertical]').prop('checked') === true) {
      $('#pos7').text('／');
      $('#pos8').text('＼');
    } else {
      $('#pos7').text('＼');
      $('#pos8').text('／');
    }
    return createImage();
  });


  $('input[name=shadow],#font,#fontsize').on('change', function() {
    return createImage();
  });
  $('#bgcolor,#color').on('blur', function() {
    return createImage();
  });
  $('input[name=length],input[name=position]').on('change', function() {
    $('#poem').val('');
    return poemGen();
  });
  $('#text').on('keyup', function(e) {
    if (e.which === 13) {
      $('#poem').val('');
      return poemGen();
    }
  });
  $('#poem').on('blur', function() {
    return createImage();
  });
  $('#poem').on('keydown', function() {
    return countdown = Date.now();
  });
  $('#poem').on('keyup', function() {
    return setTimeout((function() {
      currentTime = Date.now();
      if (currentTime - countdown >= 240) {
        $('#loading').show();
        return createImage();
      }
    }), 250);
  });
  $('.likebtn').on('click', function() {
    var current, _this;

    _this = $(this);
    current = _this.parent().find('.likecount').text();
    _this.removeClass('likebtn').addClass('unlikebtn').html('收回好詩');
    _this.parent().find('.likecount').text(parseInt(current) + 1);
    return $.ajax({
      url: 'like',
      dataType: 'html',
      type: 'POST',
      data: {
        url: _this.data('url')
      },
      success: function(result) {
        var data;

        data = $.parseJSON(result);
        if (data.state === true) {
          return _this.parent().find('.likecount').text(data.count);
        } else {
          _this.removeClass('unlikebtn').addClass('likebtn').html('好詩');
          return _this.parent().find('.likecount').text(current);
        }
      }
    });
  });
  $('.unlikebtn').on('click', function() {
    var current, _this;

    _this = $(this);
    current = _this.parent().find('.likecount').text();
    _this.removeClass('unlikebtn').addClass('likebtn').html('好詩');
    _this.parent().find('.likecount').text(parseInt(current) - 1);
    return $.ajax({
      url: 'unlike',
      dataType: 'html',
      type: 'POST',
      data: {
        url: _this.data('url')
      },
      success: function(result) {
        var data;

        data = $.parseJSON(result);
        if (data.state === true) {
          return _this.parent().find('.likecount').text(data.count);
        } else {
          _this.removeClass('likebtn').addClass('unlikebtn').html('收回好詩');
          return _this.parent().find('.likecount').text(current);
        }
      }
    });
  });
  return $('.gototop').click(function() {
    return $('html,body').animate({
      scrollTop: 0
    }, 'fast');
  });
});

$(window).scroll(function(event) {
  var height, scroll;

  scroll = $(window).scrollTop();
  height = $(window).height();
  if (scroll > height * 0.5) {
    return $('.gototop').show();
  } else {
    return $('.gototop').hide();
  }
});
