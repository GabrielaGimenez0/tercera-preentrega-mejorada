let nombre = '';
    let apellido = '';
    let nombreMateria1 = '';
    let notaMateria1 = 0;
    let nombreMateria2 = '';
    let notaMateria2 = 0;
    let nombreMateria3 = '';
    let notaMateria3 = 0;
    let nombreMateria4 = '';
    let notaMateria4 = 0;
    let nombreMateria5 = '';
    let notaMateria5 = 0;

    function agregarEstudiante() {
      nombre = document.getElementById("nombre").value;
      apellido = document.getElementById("apellido").value;
      
      nombreMateria1 = document.getElementById("nombreMateria1").value;
      notaMateria1 = parseFloat(document.getElementById("notaMateria1").value) || 0;
      
      nombreMateria2 = document.getElementById("nombreMateria2").value;
      notaMateria2 = parseFloat(document.getElementById("notaMateria2").value) || 0;
      
      nombreMateria3 = document.getElementById("nombreMateria3").value;
      notaMateria3 = parseFloat(document.getElementById("notaMateria3").value) || 0;
      
      nombreMateria4 = document.getElementById("nombreMateria4").value;
      notaMateria4 = parseFloat(document.getElementById("notaMateria4").value) || 0;
      
      nombreMateria5 = document.getElementById("nombreMateria5").value;
      notaMateria5 = parseFloat(document.getElementById("notaMateria5").value) || 0;

      const promedio = calcularPromedio([notaMateria1, notaMateria2, notaMateria3, notaMateria4, notaMateria5]);

      const estudiante = {
        nombre,
        apellido,
        materias: [
          { nombre: nombreMateria1, nota: notaMateria1 },
          { nombre: nombreMateria2, nota: notaMateria2 },
          { nombre: nombreMateria3, nota: notaMateria3 },
          { nombre: nombreMateria4, nota: notaMateria4 },
          { nombre: nombreMateria5, nota: notaMateria5 }
        ],
        promedio
      };

      guardarEstudiante(estudiante);
      mostrarEstudiantes();
      limpiarFormulario();
    }

    function calcularPromedio(notas) {
      const total = notas.reduce((suma, nota) => suma + nota, 0);
      return (total / notas.length).toFixed(2);
    }

    function guardarEstudiante(estudiante) {
      let estudiantes = obtenerEstudiantes();
      estudiantes.push(estudiante);
      localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
    }

    function obtenerEstudiantes() {
      return JSON.parse(localStorage.getItem("estudiantes")) || [];
    }

    function mostrarEstudiantes() {
      let estudiantes = obtenerEstudiantes();
      const tablaEstudiantes = document.getElementById("tablaEstudiantes");

      // Limpiar la tabla
      tablaEstudiantes.innerHTML = "";

      // Mostrar cada estudiante en la tabla
      estudiantes.forEach(estudiante => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td>${estudiante.nombre}</td>
          <td>${estudiante.apellido}</td>
          <td>${estudiante.materias[0].nombre}: ${estudiante.materias[0].nota}</td>
          <td>${estudiante.materias[1].nombre}: ${estudiante.materias[1].nota}</td>
          <td>${estudiante.materias[2].nombre}: ${estudiante.materias[2].nota}</td>
          <td>${estudiante.materias[3].nombre}: ${estudiante.materias[3].nota}</td>
          <td>${estudiante.materias[4].nombre}: ${estudiante.materias[4].nota}</td>
          <td>${estudiante.promedio}</td>
        `;
        tablaEstudiantes.appendChild(fila);
      });
    }

    function limpiarFormulario() {
      document.getElementById("nombre").value = "";
      document.getElementById("apellido").value = "";
      document.getElementById("nombreMateria1").value = "";
      document.getElementById("notaMateria1").value = "";
      document.getElementById("nombreMateria2").value = "";
      document.getElementById("notaMateria2").value = "";
      document.getElementById("nombreMateria3").value = "";
      document.getElementById("notaMateria3").value = "";
      document.getElementById("nombreMateria4").value = "";
      document.getElementById("notaMateria4").value = "";
      document.getElementById("nombreMateria5").value = "";
      document.getElementById("notaMateria5").value = "";
    }

    function seleccionarEstudiante(event) {
      const fila = event.target.parentElement;
      const nombre = fila.children[0].textContent;
      const apellido = fila.children[1].textContent;
      const materia1 = fila.children[2].textContent;
      const materia2 = fila.children[3].textContent;
      const materia3 = fila.children[4].textContent;
      const materia4 = fila.children[5].textContent;
      const materia5 = fila.children[6].textContent;
      const promedio = fila.children[7].textContent;

      const mensaje = `
        Nombre: ${nombre}
        Apellido: ${apellido}
        Materias:
          - ${materia1}
          - ${materia2}
          - ${materia3}
          - ${materia4}
          - ${materia5}
        Promedio: ${promedio}
      `;

      alert(mensaje);
    }

    function ordenarTabla(criterio) {
      let estudiantes = obtenerEstudiantes();
      estudiantes.sort((a, b) => {
        if (a[criterio] < b[criterio]) return -1;
        if (a[criterio] > b[criterio]) return 1;
        return 0;
      });

      localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
      mostrarEstudiantes();
    }

    function borrarLocalStorage() {
      localStorage.removeItem("estudiantes");
      mostrarEstudiantes(); // Limpiar la tabla al borrar el localStorage
    }

    // Mostrar estudiantes almacenados al cargar la página
    mostrarEstudiantes();
