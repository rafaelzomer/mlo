var alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
  "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "_"
];
function ehLetra(valor) {
  for (var i = 0; i < alfabeto.length; i++) {
    if (valor && valor.toLowerCase() == alfabeto[i])
      return true;
  }
  return false;
}
export default ehLetra;