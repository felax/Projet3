function getItemBounds(item) {
  const start = item.offset;
  const end = item.step ? 
    start + item.yData.length * item.step : 
    start + item.xData[item.xData.length - 1];
  return [start, end]
}

export function getBounds(itemIDs, items) {
  let start = Infinity;
  let end = -Infinity;
  itemIDs.forEach(id => {
    const bounds = getItemBounds(items[id]);
    if (bounds[0] < start) start = bounds[0];
    if (bounds[1] > end) end = bounds[1];
  })
  return [start, end];
}

export function getStep(itemIDs, items) {
  let step = Infinity;
  itemIDs.forEach(id => {
    const item = items[id];
    if (item.step < step) step = item.step;
  })
  return step;
}

export function merge(arrays) {
  let result = [];
  for (let i = 0; i < arrays[0].length; i++) {
    result.push([]);
    for (let arr of arrays) {
      result[i].push(arr[i]);
    }
  }
  return result;
}

export function arange(bounds, step) {
  let start = bounds[0];
  let stop = bounds[1];
  let result = [];
  while (start < stop) {
    result.push(start);
    start += step;
  }
  return result;
}

export function scale(item, bounds, step) {
  const start = bounds[0];
  const stop = bounds[1];
  const result = [];
  const drawStart = item.offset / step;
  const drawEnd = drawStart + item.yData.length * item.step / step;
  for (let i = start/step; i < stop/step; i++) {
    if (i < drawStart || i >= drawEnd) {
      result.push(null);
    }
    else {
      const idx = Math.round((i - drawStart) * step / item.step);
      result.push(item.yData[idx]);
    }
  }
  return result;
}

export function scale2(item, bounds, step) {
  const start = bounds[0];
  const stop = bounds[1];
  const arrLength = Math.round((stop - start) / step);
  const result = new Array(arrLength).fill(null);
  item.yData.forEach((value, i) => {
    const time = (item.step ? i * item.step : item.xData[i]) + item.offset;
    const idx = Math.round((time - start) / step);
    result[idx] = value;
  })

  return result;
}