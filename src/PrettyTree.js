// Reference of the algorithm: https://llimllib.github.io/pymag-trees/

let distanceY = 80;
let distanceX = 120;

function findDfsTree(u, parent = undefined, depth = 0) {
  u.vis = 0;
  for (let v of u.children) 
    if (v.vis === -1) {
      u.dfsTreeChildren.push(v);
      findDfsTree(v, u, depth + 1);
    }
}

function assign(u, parent = undefined, depth = 1, pos = 1) {
  u.vis = 1;
  u.x = -1;
  u.y = depth * distanceY;
  u.parent = parent;
  u.thread = undefined;
  u.offset = 0;
  u.ancestor = u;
  u.change = 0;
  u.shift = 0;
  u.leftmost = undefined;
  u.pos = pos;

  let i = 1;
  for (let v of u.children)
    if (v.vis === 0) {
      assign(v, u, depth + 1, i++);
    }
}

function left(u) {
  return u.thread || (u.children.length && u.children[0]);
}

function right(u) {
  return u.thread || (u.children.length && u.children[u.children.length - 1]);
}

function leftBrother(u) {
  if (u.parent === undefined)
    return undefined;
  let bro = undefined;
  for (let v of u.parent.children) {
    if (v === u) break;
    bro = v;
  }
  return bro;
}

function leftmostSibling(u) {
  if (u.leftmost === undefined && u.parent && u !== u.parent.children[0]) {
    u.leftmost = u.parent.children[0];
  }
  return u.leftmost;
}

function noChildrenLeft(u) {
  for (let v of u.children)
    if (v.vis === 1)
      return false;
  return true;
}

function buchheim(u) {
  u.vis = 2;
  if (noChildrenLeft(u)) {
    if (leftmostSibling(u)) {
      u.x = leftBrother(u).x + distanceX;
    } else {
      u.x = 0;
    }
  } else {
    let defaultAncestor = u.children[0];
    for (let v of u.children) 
      if (v.vis === 1) {
        buchheim(v);
        defaultAncestor = apportion(v, defaultAncestor);
      }
    executeShifts(u);

    const mid = (u.children[0].x + u.children[u.children.length - 1].x) / 2;
    const bro = leftBrother(u);
    if (bro) {
      u.x = bro.x + distanceX;
      u.offset = u.x - mid;
    } else {
      u.x = mid;
    }
  }
}

function apportion(u, defaultAncestor) {
  const w = leftBrother(u);
  if (w !== undefined && w !== u) {
    let vir = u;
    let vor = u;
    let vil = w;
    let vol = leftmostSibling(u);
    let sir = u.offset;
    let sor = u.offset;
    let sil = vil.offset;
    let sol = vol.offset;
    while (right(vil) && left(vir)) {
      vil = right(vil);
      vir = left(vir);
      vol = left(vol);
      vor = right(vor);
      vor.ancestor = u;
      let shift = (vil.x + sil) - (vir.x + sir) + distanceX;
      if (shift > 0) {
        moveSubtree(ancestor(vil, u, defaultAncestor), u, shift);
        sir = sir + shift;
        sor = sor + shift;
      }
      sil += vil.offset;
      sir += vir.offset;
      sol += vol.offset;
      sor += vor.offset;
    }
    if (right(vil) && !right(vor)) {
      vor.thread = right(vil);
      vor.offset += sil - sor;
    } else {
      if (left(vir) && !left(vol)) {
        vol.thread = left(vir);
        vol.offset += sir - sol;
      }
      defaultAncestor = u;
    }
  }
  return defaultAncestor;
}

function moveSubtree(wl, wr, shift) {
  if (wl !== undefined && wr !== undefined) {
    let subtrees = wr.pos - wl.pos;
    wr.change -= shift / subtrees;
    wr.shift += shift;
    wl.change += shift / subtrees;
    wr.x += shift;
    wr.offset += shift;
  }
}

function executeShifts(u) {
  let shift = 0;
  let change = 0;
  for (let i = u.children.length - 1; i >= 0; i--) {
    let v = u.children[i];
    v.x += shift;
    v.offset += shift;
    change += v.change;
    shift += v.shift + change;
  }
}

function ancestor(vil, u, defaultAncestor) {
  if (u.parent === undefined) 
    return defaultAncestor;
  const isChild = u.parent.children.includes((node) => {
    return node.id === vil.ancestor.id;
  });
  return isChild ? vil.ancestor : defaultAncestor;
}

function dfs(u, m = distanceX, depth = 1, mn = undefined) {
  u.x += m;
  u.vis = 3;
  if (mn === undefined || u.x < mn)
    mn = u.x;
  for (let v of u.children) 
    if (v.vis === 2) {
      mn = dfs(v, m + u.offset, depth + 1, mn);
    }
  return mn;
}

function moveTree(u, mn) {
  u.x += mn;
  u.vis = 4;
  for (let v of u.children) 
    if (v.vis === 3) {
      moveTree(v, mn);
    }
} 

export function prettyTree(props, callback) {
  const {drawGraph, likeTree, nodes, edges} = props;

  if (drawGraph) {
    distanceY = 80;
    distanceX = 120;
  } else {
    distanceY = 70;
    distanceX = 70;
  }

  const byLabel = (a, b) => {
    if (a.label < b.label) 
      return -1;
    if (a.label > b.label) 
      return 1;
    return 0;
  }

  if (likeTree) {
    for (let u of nodes) {
      u.children = [];
      u.dfsTreeChildren = [];
      u.vis = -1;
    }

    for (let edge of edges) {
      const u = nodes.find(node => {
        return node.id === edge[0].from;
      });
      const v = nodes.find(node => {
        return node.id === edge[0].to;
      });
      u.children.push(v);
    }

    if (!drawGraph) {
      // Drawing a trie
      for (let u of nodes) 
        u.children.sort(byLabel);  
    }

    // find the dfs tree
    for (let u of nodes) {
      if (u.vis === -1) 
        findDfsTree(u);
    }

    // change the children with the dfsTreeChildren
    for (let u of nodes) {
      u.children = u.dfsTreeChildren;  
      delete u.dfsTreeChildren;
    }
  
    // algorithm of buchheim for a pretty tree
    let sum = 0;
    for (let u of nodes) 
      if (u.vis === 0) {
        assign(u);
        buchheim(u);  
        let mn = dfs(u);
        if (mn > 0) {
          moveTree(u, sum);
          sum += mn;
        }
      }
  }

  callback();
}
