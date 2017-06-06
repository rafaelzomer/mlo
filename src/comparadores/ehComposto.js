var compostos = ["<", ">", ":", "-", "="];
function ehComposto(valor) {
  for (var i = 0; i < compostos.length; i++) {
    if (valor == compostos[i])
    {
      return true;
    }
  }
  return false;
}
export default ehComposto;