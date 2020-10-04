"use strict"

class Graph {
    _adj = [];

    get adj() {
        return this._adj;
    }
    getVertex (id) {
        let v;
        for(v of this.adj) {
            if (v.id == id) {
                return v;
            }
        }
        this.addVertex(id);
    }
    addVertex (id) {
        this.adj.push({
            id: id,
            adj: []
        });
    }
    addEdge (id1, id2, w) {
        const v1 = this.getVertex(id1);
        const v2 = this.getVertex(id2);
        v1.adj.push({
            v: v2,
            w: w
        });
    }
    toDot () {
        var out = 
`digraph {${this.from
? '\n\tlabel = "From vertex ' + this.from + '"'
: '\n\tlabel = "Distance not calculated yet"'}\n\tlabelloc = "t"${this.adj.reduce((acc, vertex) => {
        return acc + `\n\t${vertex.id} ${vertex.distance >= 0
            ? '[ label = "' + vertex.id + ': ' + vertex.distance + '" ]'
            : ''
        }`
    }, '')}${this.adj.reduce((acc, vertex) => {
    return acc + vertex.adj.reduce((acc, edge) => {
            return acc + `\n\t${vertex.id} -> ${edge.v.id} [label = ${edge.w}]`;
        }, '');
    }, '')}
}`
        return out;
    }

    /**
     *  Returns array of distances to each vertex identified by ID
     *  from vertex identified by s.
     *  Structure of return:
     *  {
     *      {
     *          id: number          // Identifier of edge
     *          distance: number    // Distance to edge from s
     *          predecessor: number // identifier of previous vertex
     *          color: in {'white', 'gray', 'black'}
     *              // white: not yet visited
     *              // gray: currently visting
     *              // black: already visited
     *      }, 
     *      ... // more id-distance pairs
     *  }
     * 
     */
    breadthFirstSearch (s_id) {
        this.from = s_id;
        const WHITE = 'white';
        const GRAY = 'gray';
        const BLACK = 'black';

        for (const v of this.adj) {
            if (v.id === s_id) {
                continue;
            }
            v.color = WHITE;
            v.distance = Number.POSITIVE_INFINITY;
            v.predecessor = null;
        }

        const s = this.getVertex(s_id);
        s.color = GRAY;
        s.distance = 0;
        s.predecessor = null;
        const Q = [];
        Q.push(s);
        while (Object.keys(Q).length !== 0) {
            const u = Q.shift();
            for (const edge of u.adj) {
                const v = edge.v;
                if (v.color === WHITE) {
                    v.color = GRAY;
                    v.distance = u.distance + edge.w;
                    v.predecessor = u;
                    Q.push(v);
                }
            }
            u.color = BLACK;
        }
        return this;
    }
}

exports.Graph = Graph;