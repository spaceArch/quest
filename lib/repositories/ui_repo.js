UIRepo = {
  changeContentView: function (isMapView) {
    if (isMapView) {
      $('.toggle-navbar, .map-filters').removeClass("hide");
      $('.navbar').removeClass("expanded");
      $('body').addClass("map-view");
    }
    else {
      $('.toggle-navbar, .map-filters').addClass("hide");
      $('.navbar').addClass("expanded");
      $('body').removeClass("map-view");
    }
  },
  toggleNavbar: function () {
    if ($('.navbar').hasClass("expanded"))
      $('.navbar').removeClass("expanded");
    else
      $('.navbar').addClass("expanded");
  },
  toggleSidebar: function () {
    if ($('.sidebar').hasClass("expanded")) {
      $('.toggle-sidebar').removeClass("expanded");
      $('.sidebar').removeClass("expanded");
    }
    else {
      $('.toggle-sidebar').addClass("expanded");
      $('.sidebar').addClass("expanded")
    }
  }
}