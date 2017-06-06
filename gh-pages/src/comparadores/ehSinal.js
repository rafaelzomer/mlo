var sinais = [",", ";", ":", "(", ")", "{", "}", "[", "]", "+",
  "-", "*", "/", "=", "<", ">", "!", "&", "|"];
function ehSinal(valor) {
  for (var i = 0; i < sinais.length; i++) {
    if (valor == sinais[i])
      return true;
  }
  return false;
}

export default ehSinal;