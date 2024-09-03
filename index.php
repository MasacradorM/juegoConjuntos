<?php include 'form_handler.php'; ?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Iniciar sesión</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">  
</head>
<body>
  <div class="container">
    <div class="row justify-content-center align-items-center min-vh-100">
      <div class="col-md-6 col-lg-4">
        <div class="card shadow-none border border-light rounded-lg">  <div class="card-body">
            <div class="text-center mb-4">
              <div class="user-icon mx-auto mb-3"></div>
              <h2 class="mb-3">Iniciar sesión</h2>
            </div>
            <form class="login-form" method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
              <div class="mb-3">
                <input type="email" class="form-control" name="email" placeholder="Email" required>
              </div>
              <div class="mb-3 position-relative">
                <input type="password" class="form-control" name="password" placeholder="Contraseña" required>
                <span class="toggle-password position-absolute end-0 top-50 translate-middle-y me-2"></span>
              </div>
              <button type="submit" class="btn btn-primary w-100">Iniciar sesión</button>
            </form>
            <div class="text-center mt-3">
              <a href="recuperar.php" class="text-muted">¿Olvidaste tu contraseña?</a>
            </div>
            <p class="text-center mt-3 mb-0">¿Es tu primera vez? <a href="#">Regístrate</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>