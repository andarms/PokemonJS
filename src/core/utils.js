export function findObjectsByType(type, map, layer, yOffset) {
  var result = new Array();
  map.objects[layer].forEach(function (element) {
    if (element.type == type) {
      if (yOffset) element.y -= map.tileHeight;
      result.push(element);
    }
  });
  return result;
}


export function range(n) {
  let array = [];
  for (var i = 0; i < n; i++) {
    array.push(i)
  }
  return array;
}
