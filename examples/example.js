"use strict"

const { spawn } = require('child_process');
const fs = require('fs');
const { Graph } = require('../graph.js');

const G = new Graph({});

G.addVertex('a');
G.addVertex('b');
G.addEdge('a', 'b', 1);
G.addVertex('c', {});
G.addEdge('b', 'c', 2);
G.addEdge('c', 'a', 3);

const fromNodes = [
    '',
    'a',
    'b',
    'c'
];
fromNodes.forEach(id => {
    let output;
    if (id === '') {
        output = G.toDot();
        id = '0'
    } else {
        G.breadthFirstSearch(id);
        output = G.toDot();
    }
    fs.writeFileSync(`${id}.dot`, output, err => console.log(err));

    const out = fs.openSync(`${id}.png`, 'a');
    const err = fs.openSync(`${id}.log`, 'a');

    spawn('dot', ['-Tpng', `${id}.dot`], {
        stdio: [
            'ignore',
            out,
            err
        ]
    });
});

