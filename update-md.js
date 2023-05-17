// updates metadata with the image IPFS (once uploaded), and optionally change the token description!

import * as fs from "fs";
import "json";

for(let i = 0; i < 10000; i++) {
    fs.readFile('output/json/' + i.toString() + '.json', 'utf8', function(err, data) {
        let rawMetadata = JSON.parse(data);
        rawMetadata['image'] = 'ipfs://bafybeic2gtxx2amwykfil6mbxrw4sysleyjjsvv223c7cgpb3bqe5oov6y/baguette.png';
        rawMetadata['description'] = 'Ascii Miladies are a collection of 10,000 generative pfpNFTs in a neochibi aesthetic inspired by retro ascii art and milady street style tribes.'
        fs.writeFile("output/finaljson/", i.toString(), JSON.stringify(rawMetadata), (err) => {
            if (err) {
        console.error(err);
        }
    });});
}
