angular.module('bookApp', [])
  .controller('TiendaController', function($scope, $http) {

    $scope.productos = [];
    $scope.carrito = [];
    $scope.totalCarrito = 0;
    $scope.categorias = [];
    $scope.categoriaSeleccionada = '';
    $scope.filtroNombre = '';
    $scope.mostrarModalDetalles = false;
    $scope.mostrarModalCarrito = false;
    $scope.eliminarDelCarrito = function(producto) {
  const index = $scope.carrito.indexOf(producto);
  if (index > -1) {
    $scope.totalCarrito -= producto.precio * producto.cantidad;
    $scope.carrito.splice(index, 1);
  }
};


    // Cargar productos 
    $http.get('https://fakestoreapi.com/products').then(function(response) {
      // Mapeado de datos
      $scope.productos = response.data.map(producto => ({
        id: producto.id,
        nombre: producto.title,
        autor: producto.category, 
        precio: producto.price,
        categoria: producto.category,
        imagen: producto.image,
        descripcion: producto.description
      }));

     
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
      alert('Gracias por su preferencia. ¡Disfrute su compra!');
      $scope.carrito = [];
      $scope.totalCarrito = 0;
      $scope.mostrarModalCarrito = false;
    };

    $scope.contacto = {};

    $scope.enviarMensaje = function() {
      if ($scope.contactForm.$valid) {
        alert("Gracias por contactarnos. Estamos aquí para ayudarte, " + $scope.contacto.nombre + " :D");
        $scope.contacto = {};
        $scope.contactForm.$setPristine();
        $scope.contactForm.$setUntouched();
      }
    };

  });
