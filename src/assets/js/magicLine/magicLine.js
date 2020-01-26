$(function() {
  'use strict';
  /*Activate default tab contents*/
  var leftPos, newWidth, $magicLine;

  $('.magicLine').append("<li id='magic-line'></li>");
  $magicLine = $('#magic-line');
  $magicLine.width($('.active').width())
      .css('left', $('.active a').position().left + 1000)
      .data('origLeft', $magicLine.position().left + 1000)
      .data('origWidth', $magicLine.width());

  $('.magicLine li a').click(function() {
    var $this = $(this);
    $this.parent().addClass('active').siblings().removeClass('active');
    $magicLine
        .data('origLeft', $this.position().left)
        .data('origWidth', $this.parent().width());
    return false;
  });

  /*Magicline hover animation*/
  $('.magicLine li').find('a').hover(function() {
    var $thisBar = $(this);
    leftPos = $thisBar.position().left;
    newWidth = $thisBar.parent().width();
    $magicLine.css({
      "left": leftPos,
      "width": newWidth
    });
  }, function() {
    $magicLine.css({
      "left": $magicLine.data('origLeft'),
      "width": $magicLine.data('origWidth')
    });
  });
});
