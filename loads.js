// loads.js

// Hacer disponible el array en window para script.js
window.guests = [
  { id: "1",  name: "Aura González de Soberanis", passes: 2 },
  { id: "2",  name: "Esposos González Soberanis", passes: 2 },
  { id: "3",  name: "Familia González Tobar", passes: 4 },
  { id: "4",  name: "Maria Jose González", passes: 3 },
  { id: "5",  name: "Julio Roberto González", passes: 1 },
  { id: "6",  name: "Esposos Zepeda Mazariegos", passes: 2 },
  { id: "7",  name: "Familia González Pérez", passes: 3 },
  { id: "8",  name: "Familia Pérez Esperias", passes: 4 },
  { id: "9",  name: "Familia Mazariegos Torres", passes: 4 },
  { id: "10", name: "Esposos Morales Mazariegos", passes: 2 },
  { id: "11", name: "Virginia Mazariegos", passes: 1 },
  { id: "12", name: "Elvia Mazariegos e Hijos", passes: 4 },
  { id: "13", name: "Esposos Godinez Muñoz e Hijas", passes: 5 },
  { id: "14", name: "Familia Mangandid Muñoz", passes: 4 },
  { id: "15", name: "Marlen Muñoz", passes: 1 },
  { id: "16", name: "Familia Rodas Muñoz", passes: 3 },
  { id: "17", name: "Esposos Serrano Mazariegos", passes: 2 },
  { id: "18", name: "Familia Lopez Serrano", passes: 2 },
  { id: "19", name: "Familia Mazariegos Celada", passes: 4 },
  { id: "20", name: "Familia Castillo Mazariegos", passes: 3 },
  { id: "21", name: "Familia Juarez Nuñez", passes: 3 },
  { id: "22", name: "Familia Juarez Caceres", passes: 3 },
  { id: "23", name: "Familia Muñoz Ortiz", passes: 4 },
  { id: "24", name: "Celvin Morán", passes: 2 },
  { id: "25", name: "Esposos Mazariegos Orozco", passes: 2 },
  { id: "26", name: "José Luis Mazariegos", passes: 1 },
  { id: "27", name: "Nieves Marroquin", passes: 1 },
  { id: "28", name: "Loamy Enriquez", passes: 2 },
  { id: "29", name: "Brenda Cruz", passes: 1 },
  { id: "30", name: "Alba Magaly Garcia", passes: 1 },
  { id: "31", name: "Aura Liseth Galicia", passes: 1 },
  { id: "32", name: "Maria Isabel Pedroza", passes: 1 },
  { id: "33", name: "Angela Pineda", passes: 2 },
  { id: "34", name: "Shirley Guillen", passes: 3 }
];

document.addEventListener("DOMContentLoaded", () => {
  const params  = new URLSearchParams(window.location.search);
  const guestId = params.get("id");
  const guest   = window.guests.find(g => g.id === guestId);

  if (guest) {
    const invitText = guest.passes > 1
      ? `¡${guest.name}, están invitados!`
      : `¡${guest.name}, estás invitado!`;

    document.getElementById("nombreInvitado").textContent   = invitText;
    document.getElementById("cantidadPases").textContent   =
      `${guest.passes} ${guest.passes === 1 ? "pase" : "pases"}`;

    // Abrir invitación automáticamente
  } else {
    // Si no existe el invitado, ocultar la invitación completa
    const invitacion = document.getElementById("invitacion");
    if (invitacion) invitacion.style.display = "none";
  }
});


  