(function() {
  
  var Menu = (function() {
    var burger = document.querySelector('.hamburger');
    var menu = document.querySelector('.menu');
    var menuList = document.querySelector('.menu-list');
    var brand = document.querySelector('.menu-logo');
    var menuItems = document.querySelectorAll('.menu-item');
    
    var active = false;
    
    var toggleMenu = function() {
        menu.classList.toggle('menu--active');
        menuList.classList.toggle('menu-list--active');
        brand.classList.toggle('menu-logo--active');
        burger.classList.toggle('hamburger--close');
        for (var i = 0, ii = menuItems.length; i < ii; i++) {
          menuItems[i].classList.toggle('menu-item--active');
      }
    };

    var bindActions = function() {
    
      burger.addEventListener('click', toggleMenu, false);
      menuList.addEventListener('click', toggleMenu, false);
      brand.addEventListener('click', toggleMenu, false);
    };




    
    var init = function() {
      bindActions();
    };
    
    return {
      init: init
    };
    
  }());
  
  Menu.init();
  
}());