angular.module('bookApp', [])
  .controller('TiendaController', function($scope, $http) {

    // Variables iniciales
    $scope.productos = [];              // lista de productos desde el JSON
    $scope.carrito = [];                // productos añadidos al carrito
    $scope.totalCarrito = 0;            // total acumulado del carrito
    $scope.categorias = [];             // lista única de categorías
    $scope.categoriaSeleccionada = '';  // filtro por categoría
    $scope.filtroNombre = '';           // filtro por nombre
    $scope.mostrarModalDetalles = false;
    $scope.mostrarModalCarrito = false;

    // cargar productos desde JSON
    $http.get('data/productos.json').then(function(response) {
      $scope.productos = response.data;

    // extraer categorías únicas de los productos
      $scope.categorias = [...new Set($scope.productos.map(p => p.categoria))];
    });

    $scope.verDetalles = function(producto) {
      $scope.productoSeleccionado = producto;
      $scope.mostrarModalDetalles = true;
    };

    $scope.cerrarModal = function() {
      $scope.mostrarModalDetalles = false;
    };

    $scope.agregarAlCarrito = function(producto) {
      const item = $scope.carrito.find(p => p.id === producto.id);
      if (item) {
        item.cantidad += 1;
      } else {
        $scope.carrito.push({ ...producto, cantidad: 1 });
      }
      $scope.totalCarrito += producto.precio;
      $scope.cerrarModal();
    };

    $scope.cerrarCarrito = function() {
      $scope.mostrarModalCarrito = false;
    };

    $scope.pagar = function() {
      alert('Gracias por su preferencia. ¡Disfrute su lectura!');
      $scope.carrito = [];
      $scope.totalCarrito = 0;
      $scope.mostrarModalCarrito = false;
    };

    $scope.contacto = {};

    $scope.enviarMensaje = function() {
      if ($scope.contactForm.$valid) {
        alert("Gracias por contactarnos. Estamos aquí para ayudarte, " + $scope.contacto.nombre + ":D");
        $scope.contacto = {};
        $scope.contactForm.$setPristine();
        $scope.contactForm.$setUntouched();
      }
    };

  });