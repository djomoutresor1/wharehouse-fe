$(document).ready(function () {
  // In this section, when the modal appears,
  // I don't want scrolling the page by the user
  setTimeout(() => {
    var $modalOverlay = $(".cdk-overlay-container");
    if ($modalOverlay.length) {
      $modalOverlay.parent().addClass("overlay-container");
    } else {
      $("body").removeClass("overlay-container");
    }
  }, 100);
});
