// Crear modulo de Angular
var app = angular.module('tiendaApp', []);

// Controlador principal
app.controller('TiendaController', ['$scope', '$http', function($scope, $http) {
    
    // Inicializacion de variables
    $scope.productos = [];
    $scope.carrito = [];
    $scope.productoSeleccionado = {};
    $scope.categorias = [];
    $scope.categoriaSeleccionada = '';
    $scope.busqueda = '';
    $scope.totalCarrito = 0;
    
    // Variables para el formulario de pago
    $scope.formularioPago = {
        nombreCliente: '',
        numeroTarjeta: '',
        pin: '',
        tipoEntrega: 'tienda',
        direccion: ''
    };
    $scope.mostrarFormularioPago = false;

    // Cargar productos desde el archivo JSON
    $http.get('productos.json').then(function(response) {
        $scope.productos = response.data.map(function(producto) {
            producto.stock = 35;
            producto.rating = 5;
            return producto;
        });
        
        // Extraer categorias unicas
        var categoriasSet = new Set();
        $scope.productos.forEach(function(producto) {
            categoriasSet.add(producto.categoria);
        });
        $scope.categorias = Array.from(categoriasSet);
    }, function(error) {
        console.error('Error al cargar productos:', error);
        // Datos de ejemplo si no se puede cargar el JSON
        $scope.productos = obtenerProductosEjemplo();
        var categoriasSet = new Set();
        $scope.productos.forEach(function(producto) {
            categoriasSet.add(producto.categoria);
        });
        $scope.categorias = Array.from(categoriasSet);
    });

    // Funcion para obtener productos de ejemplo
    function obtenerProductosEjemplo() {
        return [
            {
                id: 1,
                nombre: "Converse Chuck Taylor All Star Lift Double Stack para mujer",
                descripcion: "Zapatos Converse Chuck Taylor All Star Lift Double Stack para mujer color blanco",
                descripcionCompleta: "Son una version audaz y elevada de las iconicas Chuck Taylor, disenadas para quienes buscan destacar con estilo y comodidad. Estas zapatillas presentan una plataforma doble, la mas alta de Converse hasta la fecha, que aporta una altura adicional sin sacrificar la ligereza gracias a la amortiguacion de EVA..",
                precio: 95.00,
                imagen: "Converse Chuck Taylor All Star Lift Double Stack.png",
                categoria: "Zapatos",
                rating: 5,
                stock: 35
            },
            {
                id: 2,
                nombre: "New Balance 237 ",
                descripcion: "New Balance 237 para mujer",
                descripcionCompleta: "Tienen un diseno perfecto para el dia a dia. Las zapatillas vuelven para no quitartelas de encima: ligueras, comodas, modernas. Una prenda indispensable en tu armario, destacan por el diseno y sobre todo su suela de goma que aportan comodidad en cada paso.",
                precio: 120.00,
                imagen: "New Balance 237.png",
                categoria: "Zapatos",
                rating: 5,
                stock: 35
            },
            {
                id: 3,
                nombre: " Sneakers Kiara para mujer color blanco",
                descripcion: "CATERPILLAR",
                descripcionCompleta: "Estan confeccionados en material sintetico de alta calidad, que garantiza durabilidad y comodidad. Su diseno contemporaneo ofrece soporte adecuado y versatilidad, ideales para complementar atuendos casuales con un estilo moderno y funcional.",
                precio: 42.00,
                imagen: "SneakersKiaras.png",
                categoria: "Zapatos",
                rating: 5,
                stock: 35
            },
            {
                id: 4,
                nombre: "Camisa Logo Vans",
                descripcion: "100% algodon",
                descripcionCompleta: "Camisa Vans color blanca 100% algodon.",
                precio: 20.00,
                imagen: "Camisa Vans.jpeg",
                categoria: "Camisas",
                rating: 5,
                stock: 35
            },
            {
                id: 5,
                nombre: "Camisa Columbina",
                descripcion: "Camisa manga larga",
                descripcionCompleta: "100% Poliester, camisa antitranspirante, proteccion contra rayos UV.",
                precio: 50.00,
                imagen: "Camisa MangaLarga.jpeg",
                categoria: "Camisas",
                rating: 5,
                stock: 35
            },
            {
                id: 6,
                nombre: "Camisa Nike Barcelona",
                descripcion: "Camiseta Nike autografiada por el mejor jugador de la historia",
                descripcionCompleta: "Camisa Nike Barcelona autografiada por Messi, 100% Poliester.",
                precio: 50.00,
                imagen: "Camisa Barcelona.jpeg",
                categoria: "Camisas",
                rating: 5,
                stock: 35
            },
            {
                id: 7,
                nombre: "Jogger deportivo Teammate athletic fit negro solido para hombre",
                descripcion: "Pantalon deportivo marca Teammate, disenado en color negro solido y cintura elastica con lazo ajustable.",
                descripcionCompleta: "De ajuste relajado con punos elasticos en los tobillos,corte con mayor amplitud en muslos,material suave al tacto, comodo, flexible, y resistente a manchas, arrugas y roturas.",
                precio: 25.90,
                imagen: "Jogger deportivo.jpg",
                categoria: "Pantalon",
                rating: 5,
                stock: 35
            },
            {
                id: 8,
                nombre: "Pantalon Ancho ",
                descripcion: "Pantalon Ancho Holgado de Mezclilla Vaqueros Para Hombre",
                descripcionCompleta: "Son una prenda comoda y moderna, caracterizada por su corte suelto desde la cintura hasta el tobillo, que ofrece gran libertad de movimiento y un estilo urbano.",
                precio: 40.00,
                imagen: "Pantalon Jeans.jpg",
                categoria: "Pantalon",
                rating: 5,
                stock: 35
            },
            {
                id: 9,
                nombre: "Pantalon cargo Jack & Jones wide fit solido para hombre",
                descripcion: "Caracterizado por multiples bolsillos grandes en los laterales.",
                descripcionCompleta: "Puedes combinarlo con una camiseta basica o polo y unas zapatillas deportivas para un estilo casual. Si buscas un outfit mas distinguido, agregale una camisa abierta o chaqueta tipo bomber.",
                precio: 99.00,
                imagen: "Pantalon Cargo.jpg",
                categoria: "Pantalon",
                rating: 5,
                stock: 35
            },
            {
                id: 10,
                nombre: "Tenis Industrial Streamline Mesh 2.0 para Hombre",
                descripcion: "Marca CATERPILLAR color Navy",
                descripcionCompleta: "Tenis con cubo no metalico, 40% Mas liviano que el cubo de acero. Ofrece proteccion hasta 14,000 voltios en condiciones secas. Cuenta con suela antideslizante para una mayor proteccion ante caidas.",
                precio: 135.00,
                imagen: "Tenis Industrial Streamline Mesh 2.0.png",
                categoria: "Zapatos",
                rating: 5,
                stock: 35
            },
            {
                id: 11,
                nombre: "Camisa manga larga Nike Pro ",
                descripcion: "Camisa manga larga Nike Pro de compresion ",
                descripcionCompleta: "100% Poliester, antitranspirable  .",
                precio: 40.00,
                imagen: "Camisa Nike.jpeg",
                categoria: "Camisas",
                rating: 5,
                stock: 35
            },
            {
                id: 12,
                nombre: "Short deportivo Nike Navy para hombre",
                descripcion: "Ofrece frescura, secado rapido y libertad de movimiento durante tus entrenamientos o actividades diarias.",
                descripcionCompleta: "Short deportivo de la marca Nike, disenado en color Navy con el iconico logo Swoosh bordado en blanco, pretina elastica y ajuste comodo,Combinalo con una camiseta deportiva Nike y tenis de entrenamiento para un look atletico moderno y funcional. Ideal para correr, entrenar o usar en dias casuales.",
                precio: 35.50,
                imagen: "Short Nike.png",
                categoria: "Pantalon",
                rating: 5,
                stock: 35
            },
            {
                id: 13,
                nombre: "Tennis Hex Ready Lo para Hombre",
                descripcion: "CATERPILLAR Color Gris",
                descripcionCompleta: "Elaborado en material piel con agujetas, punta redonda, textura lisa, plantilla confort y altura de suela de 3.2 cm. con cuero de la mas alta calidad para larga durabilidad. Plantilla de espuma de PU moldeada para mayor comodidad bajo los pies y entresuela de EVA duradera y ligera.",
                precio: 105.00,
                imagen: "Tennis Hex Ready Lo.png",
                categoria: "Zapatos",
                rating: 5,
                stock: 35
            },
            {
                id: 14,
                nombre: "Camiseta Adidas Stan Smith  ",
                descripcion: "Stan Smith ",
                descripcionCompleta: "100% algodon  .",
                precio: 30.00,
                imagen: "Camisa Adidas.jpeg",
                categoria: "Camisas",
                rating: 5,
                stock: 35
            },
            {
                id: 15,
                nombre: "Pantalon carpenter Orange verde sage solido para hombre",
                descripcion: "Combinalo con camisetas basicas o camisas de manga corta para un look relajado. Funciona muy bien con tenis urbanos o botas ligeras, segun la ocasion.",
                descripcionCompleta: "Se caracterizan por su silueta holgada, tener multiples bolsillos grandes y trabillas adicionales, originalmente considerado un jeans de trabajo adaptado a la moda urbana. ",
                precio: 39.99,
                imagen: "pantalon carpenter.jpg",
                categoria: "Pantalon",
                rating: 5,
                stock: 35
            },
            {
                id: 16,
                nombre: "Sneakers Ventura para hombre",
                descripcion: "CATERPILLAR Color indigo gris",
                descripcionCompleta: "Cuentan con forro de malla de nylon suave y transpirable. Espuma EVA suave para una mayor comodidad. Suela de goma duradera la cual ayuda para la traccion..",
                precio: 85.00,
                imagen: "Sneakers Ventura.png",
                categoria: "Zapatos",
                rating: 5,
                stock: 35
            },
            {
                id: 17,
                nombre: "Camisa Polo Ralph Lauren  ",
                descripcion: "Camisa Polo   ",
                descripcionCompleta: "Camisa Polo Ralph Lauren 100% algodon  .",
                precio: 35.00,
                imagen: "Camisa Polo.jpeg",
                categoria: "Camisas",
                rating: 5,
                stock: 35
            },
            {
                id: 18,
                nombre: "Pants deportivo Los Angeles Lakers gris para hombre",
                descripcion: "Ideal para entrenamientos o para un look urbano, su ajuste perfecto y su confeccion de alta calidad garantizan libertad de movimiento.",
                descripcionCompleta: "Muestra tu pasion por el baloncesto con este pants deportivo de Los Angeles Lakers. En color gris, su diseno destaca con el iconico logo, mientras que en la parte posterior lleva un bolsillo con el logo oficial del equipo y el logo de la NBA. Fabricado con materiales ligeros y transpirables, te brinda comodidad y estilo en todo momento.",
                precio: 44.99,
                imagen: "Pants LA.jpeg",
                categoria: "Pantalon",
                rating: 5,
                stock: 35
            }
        ];
    }

    // Funcion para filtrar productos por categoria
    $scope.filtrarPorCategoria = function(producto) {
        if (!$scope.categoriaSeleccionada || $scope.categoriaSeleccionada === '') {
            return true;
        }
        return producto.categoria === $scope.categoriaSeleccionada;
    };

    // Funcion para obtener estrellas de rating
    $scope.getStars = function(rating) {
        return new Array(rating);
    };

    // Funcion para ver detalles del producto
    $scope.verDetalles = function(producto) {
        $scope.productoSeleccionado = angular.copy(producto);
        $('#modalDetalles').modal('show');
    };

    // Funcion para agregar producto al carrito
    $scope.agregarAlCarrito = function(producto) {
        // Verificar stock disponible
        if (producto.stock <= 0) {
            alert('THE SHADOW STORE\n\nLo sentimos, este producto esta agotado');
            return;
        }

        // Buscar si el producto ya esta en el carrito
        var itemExistente = $scope.carrito.find(function(item) {
            return item.producto.id === producto.id;
        });

        if (itemExistente) {
            // Verificar si hay stock suficiente
            if (itemExistente.cantidad >= producto.stock) {
                alert('THE SHADOW STORE\n\nNo hay mas unidades disponibles de este producto');
                return;
            }
            // Si existe, aumentar la cantidad
            itemExistente.cantidad++;
        } else {
            // Si no existe, agregarlo
            $scope.carrito.push({
                producto: angular.copy(producto),
                cantidad: 1
            });
        }

        // Actualizar total
        calcularTotal();

        // Cerrar modal de detalles
        $('#modalDetalles').modal('hide');

        // Mostrar mensaje de exito personalizado
        alert('THE SHADOW STORE\n\nHas agregado:\n' + producto.nombre + '\n\nCantidad en carrito: ' + (itemExistente ? itemExistente.cantidad : 1));
    };

    // Funcion para abrir el carrito
    $scope.abrirCarrito = function() {
        $('#modalCarrito').modal('show');
    };

    // Funcion para aumentar cantidad
    $scope.aumentarCantidad = function(item) {
        // Buscar el producto original para verificar stock
        var productoOriginal = $scope.productos.find(function(p) {
            return p.id === item.producto.id;
        });

        if (item.cantidad >= productoOriginal.stock) {
            alert('THE SHADOW STORE\n\nNo hay mas unidades disponibles de este producto\n\nStock maximo: ' + productoOriginal.stock + ' unidades');
            return;
        }

        item.cantidad++;
        calcularTotal();
    };

    // Funcion para disminuir cantidad
    $scope.disminuirCantidad = function(item) {
        if (item.cantidad > 1) {
            item.cantidad--;
            calcularTotal();
        }
    };

    // Funcion para eliminar del carrito
    $scope.eliminarDelCarrito = function(item) {
        var index = $scope.carrito.indexOf(item);
        if (index > -1) {
            $scope.carrito.splice(index, 1);
            calcularTotal();
        }
    };

    // Funcion para calcular el total del carrito
    function calcularTotal() {
        $scope.totalCarrito = 0;
        $scope.carrito.forEach(function(item) {
            $scope.totalCarrito += item.producto.precio * item.cantidad;
        });
    }

    // Funcion para iniciar el proceso de pago
    $scope.iniciarPago = function() {
        if ($scope.carrito.length === 0) {
            alert('THE SHADOW STORE\n\nTu carrito esta vacio');
            return;
        }

        // Limpiar formulario
        $scope.formularioPago = {
            nombreCliente: '',
            numeroTarjeta: '',
            pin: '',
            tipoEntrega: 'tienda',
            direccion: ''
        };

        // Mostrar formulario de pago
        $scope.mostrarFormularioPago = true;
    };

    // Funcion para cancelar el pago
    $scope.cancelarPago = function() {
        $scope.mostrarFormularioPago = false;
    };

    // Funcion para realizar el pago
    $scope.realizarPago = function() {
        // Validar formulario
        if (!$scope.formularioPago.nombreCliente || $scope.formularioPago.nombreCliente.trim() === '') {
            alert('THE SHADOW STORE\n\nPor favor ingrese el nombre del cliente');
            return;
        }

        if (!$scope.formularioPago.numeroTarjeta || $scope.formularioPago.numeroTarjeta.length < 16) {
            alert('THE SHADOW STORE\n\nPor favor ingrese un numero de tarjeta valido (16 digitos)');
            return;
        }

        if (!$scope.formularioPago.pin || $scope.formularioPago.pin.length < 3) {
            alert('THE SHADOW STORE\n\nPor favor ingrese un CVV valido (minimo 3 digitos)');
            return;
        }

        if ($scope.formularioPago.tipoEntrega === 'domicilio') {
            if (!$scope.formularioPago.direccion || $scope.formularioPago.direccion.trim() === '') {
                alert('THE SHADOW STORE\n\nPor favor ingrese la direccion de entrega');
                return;
            }
        }

        // Descontar del inventario
        $scope.carrito.forEach(function(item) {
            var productoOriginal = $scope.productos.find(function(p) {
                return p.id === item.producto.id;
            });
            if (productoOriginal) {
                productoOriginal.stock -= item.cantidad;
            }
        });

        // Calcular total con envio si aplica
        var totalFinal;
        if ($scope.formularioPago.tipoEntrega === 'domicilio') {
            totalFinal = $scope.totalCarrito + 5;
        } else {
            totalFinal = $scope.totalCarrito;
        }

        // Preparar mensaje de confirmacion
        var tipoEntregaTexto;
        if ($scope.formularioPago.tipoEntrega === 'tienda') {
            tipoEntregaTexto = 'Retiro en tienda';
        } else {
            tipoEntregaTexto = 'Entrega a domicilio: ' + $scope.formularioPago.direccion;
        }

        // Simular proceso de pago exitoso
        alert('THE SHADOW STORE\n' +
              '========================\n' +
              'PAGO REALIZADO CON EXITO!\n' +
              '========================\n\n' +
              'Cliente: ' + $scope.formularioPago.nombreCliente + '\n\n' +
              'Total pagado: $' + totalFinal.toFixed(2) + '\n\n' +
              'Entrega: ' + tipoEntregaTexto + '\n\n' +
              'Gracias por tu compra!\n' +
              'Tu pedido sera procesado pronto.');
        
        // Limpiar carrito
        $scope.carrito = [];
        $scope.totalCarrito = 0;
        $scope.mostrarFormularioPago = false;
        
        // Cerrar modal
        $('#modalCarrito').modal('hide');
    };

    // Funcion para validar solo numeros en tarjeta
    $scope.validarNumeros = function(event) {
        var charCode = event.which || event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault();
            return false;
        }
        return true;
    };

}]);