// Reference of the algorithm: https://llimllib.github.io/pymag-trees/

const distance = 70;

export default class PrettyTree {
  constructor(nodes, edges) {
    this.nodes = nodes;
    this.edges = edges;
  }

  buildTree() {
    // Add children to each node
    for (let u of this.nodes) {
      u.children = [];
      u.vis = 0;
    }

    for (let edge of this.edges) {
      const u = this.nodes.find(node => {
        return node.id === edge[0].from;
      });
      const v = this.nodes.find(node => {
        return node.id === edge[0].to;
      });
      u.children.push(v);
    }

    let sum = distance;
    for (let u of this.nodes)
      if (!u.vis) {
        this.assign(u);
        this.buchheim(u);  
        let mn = this.dfs(u);
        if (mn > 0) {
          this.moveTree(u, sum);
          sum += mn;
        }
      }
  }

  assign(u, parent = undefined, depth = 1, pos = 1) {
    u.vis = 1;
    u.x = -1;
    u.y = depth * distance;
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
        this.assign(v, u, depth + 1, i++);
      }
  }

  left(u) {
    return u.thread || (u.children.length && u.children[0]);
  }

  right(u) {
    return u.thread || (u.children.length && u.children[u.children.length - 1]);
  }

  leftBrother(u) {
    if (u.parent === undefined)
      return undefined;
    let bro = undefined;
    for (let v of u.parent.children) {
      if (v === u) break;
      bro = v;
    }
    return bro;
  }

  leftmostSibling(u) {
    if (u.leftmost === undefined && u.parent && u !== u.parent.children[0]) {
      u.leftmost = u.parent.children[0];
    }
    return u.leftmost;
  }

  noChildrenLeft(u) {
    for (let v of u.children)
      if (v.vis === 1)
        return false;
    return true;
  }

  buchheim(u) {
    u.vis = 2;
    if (this.noChildrenLeft(u)) {
      if (this.leftmostSibling(u)) {
        u.x = this.leftBrother(u).x + distance;
      } else {
        u.x = 0;
      }
    } else {
      let defaultAncestor = u.children[0];
      for (let v of u.children) 
        if (v.vis === 1) {
          this.buchheim(v);
          defaultAncestor = this.apportion(v, defaultAncestor);
        }
      this.executeShifts(u);

      const mid = (u.children[0].x + u.children[u.children.length - 1].x) / 2;
      const bro = this.leftBrother(u);
      if (bro) {
        u.x = bro.x + distance;
        u.offset = u.x - mid;
      } else {
        u.x = mid;
      }
    }
  }

  apportion(u, defaultAncestor) {
    const w = this.leftBrother(u);
    if (w !== undefined && w !== u) {
      let vir = u;
      let vor = u;
      let vil = w;
      let vol = this.leftmostSibling(u);
      let sir = u.offset;
      let sor = u.offset;
      let sil = vil.offset;
      let sol = vol.offset;
      while (this.right(vil) && this.left(vir)) {
        vil = this.right(vil);
        vir = this.left(vir);
        vol = this.left(vol);
        vor = this.right(vor);
        vor.ancestor = u;
        let shift = (vil.x + sil) - (vir.x + sir) + distance;
        if (shift > 0) {
          this.moveSubtree(this.ancestor(vil, u, defaultAncestor), u, shift);
          sir = sir + shift;
          sor = sor + shift;
        }
        sil += vil.offset;
        sir += vir.offset;
        sol += vol.offset;
        sor += vor.offset;
      }
      if (this.right(vil) && !this.right(vor)) {
        vor.thread = this.right(vil);
        vor.offset += sil - sor;
      } else {
        if (this.left(vir) && !this.left(vol)) {
          vol.thread = this.left(vir);
          vol.offset += sir - sol;
        }
        defaultAncestor = u;
      }
    }
    return defaultAncestor;
  }

  moveSubtree(wl, wr, shift) {
    if (wl !== undefined && wr !== undefined) {
      let subtrees = wr.pos - wl.pos;
      wr.change -= shift / subtrees;
      wr.shift += shift;
      wl.change += shift / subtrees;
      wr.x += shift;
      wr.offset += shift;
    }
  }

  executeShifts(u) {
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

  ancestor(vil, u, defaultAncestor) {
    if (u.parent === undefined) 
      return defaultAncestor;

    console.log("u:", u);
    console.log("u.parent", u.parent);
    console.log("vil", vil);

    const isChild = u.parent.children.includes((node) => {
      return node.id === vil.ancestor.id;
    });
    return isChild ? vil.ancestor : defaultAncestor;
  }

  dfs(u, m = distance, depth = 1, mn = undefined) {
    u.x += m;
    // u.y = depth;
    u.vis = 3;
    if (mn === undefined || u.x < mn)
      mn = u.x;
    for (let v of u.children) 
      if (v.vis === 2) {
        mn = this.dfs(v, m + u.offset, depth + 1, mn);
      }
    return mn;
  }

  moveTree(u, mn) {
    u.x += mn;
    u.vis = 4;
    for (let v of u.children) 
      if (v.vis === 3) {
        this.moveTree(v, mn);
      }
  } 
}
