interface Distance {
  one: number[];
  other: number[];
  distance: number;
}

export function part1(input: string, size = 1000): number {
  const coords = input.split('\n').map((line) => line.split(',').map(Number));
  const networks: Set<number[]>[] = coords.map((coord) => new Set([coord]));
  let distances: Distance[] = [];
  for (let i = 0; i < coords.length; i++) {
    const coord1 = coords[i]!;
    for (let j = i + 1; j < coords.length; j++) {
      const coord2 = coords[j]!;
      const distance = Math.sqrt(
        Math.pow(coord1[0]! - coord2[0]!, 2) +
          Math.pow(coord1[1]! - coord2[1]!, 2) +
          Math.pow(coord1[2]! - coord2[2]!, 2)
      );
      distances.push({ one: coord1, other: coord2, distance });
    }
  }
  distances.sort((a, b) => a.distance - b.distance);

  const connections = Math.min(size, distances.length);
  for (let i = 0; i < connections; i++) {
    const { one, other } = distances[i]!;
    const oneNetwork = networks.find((network) => network.has(one))!;
    const otherNetwork = networks.find((network) => network.has(other))!;
    if (oneNetwork != otherNetwork) {
      const target = oneNetwork.size >= otherNetwork.size ? oneNetwork : otherNetwork;
      const source = target === oneNetwork ? otherNetwork : oneNetwork;
      for (const coord of source) target.add(coord);
      networks.splice(networks.indexOf(source), 1);
    }
  }

  return networks
    .sort((a, b) => b.size - a.size)
    .slice(0, 3)
    .reduce((prod, set) => prod * set.size, 1);
}

export function part2(input: string): number {
  const coords = input.split('\n').map((line) => line.split(',').map(Number));
  const networks: Set<number[]>[] = coords.map((coord) => new Set([coord]));
  let distances: Distance[] = [];
  for (let i = 0; i < coords.length; i++) {
    const coord1 = coords[i]!;
    for (let j = i + 1; j < coords.length; j++) {
      const coord2 = coords[j]!;
      const distance = Math.sqrt(
        Math.pow(coord1[0]! - coord2[0]!, 2) +
          Math.pow(coord1[1]! - coord2[1]!, 2) +
          Math.pow(coord1[2]! - coord2[2]!, 2)
      );
      distances.push({ one: coord1, other: coord2, distance });
    }
  }
  distances.sort((a, b) => a.distance - b.distance);

  let last: Number[][];
  for (let i = 0; i < distances.length; i++) {
    const { one, other } = distances[i]!;
    last = [one, other];
    const oneNetwork = networks.find((network) => network.has(one))!;
    const otherNetwork = networks.find((network) => network.has(other))!;
    if (oneNetwork != otherNetwork) {
      const target = oneNetwork.size >= otherNetwork.size ? oneNetwork : otherNetwork;
      const source = target === oneNetwork ? otherNetwork : oneNetwork;
      for (const coord of source) target.add(coord);
      networks.splice(networks.indexOf(source), 1);
    }
    if (networks.length == 1) {
      break;
    }
  }

  return last![0]![0]! * last![1]![0]!;
}
