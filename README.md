# AsciiMiladies
Ascii Miladies are a collection of 10,000 generative pfpNFT's in a neochibi aesthetic inspired by retro ascii art and milady street style tribes. Unlike many Milady derivatives, Ascii Milady is mapped by token ID to the original Milady.

Free mints were offered to several Remilia collections like Milady, Remilio, Radbro.

Contract - https://etherscan.io/address/0x7BCF14419DEeF9eb466BeEFA75cF294BcA65D985
Mint page - https://www.scatter.art/ascii-milady?tab=mint


# NPM

First install NPM (Node Package Manager) here: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
Check it is working by running `npm` and seeing an output.

# Installing dependencies

Go to the TLD (Top Level Directory) and run:

```
npm install
```

This will install all the dependencies listed in `package.json`.

# Modifying the art
To run a JS file, you can type `node <file>.js`.

- Choose the collection smart contract, which is defined in `index.js`.
  - fully-on-chain metadata/art or base64 encoded is not currently supported. 
- Choose the width and height dimensions.
- Choose any auras, or remove references in the code to "aura" if that is not desired. 
- Choose the valid letter options -- defined in asciify.js.
- Choose the color fidelity (imagine the code is "rounding" the colors to condense the code runtime). Higher fidelity/more colors will make the code runtime longer and increase space requirements.
- Sign up for Alchemy and get a key: https://www.alchemy.com/
- Pick the token IDs in the for loop (currently it says 0-10000, excluding 10000).
- Check the metadata, *the image url should not be populated yet!*
- Upload the art to IPFS, you can use `web3-storage-upload.js` for this, it uses `web3.storage` service for this. You will need an API token from the website, and put that in next to `token: "<token>"`.
- Check that the art is pinned by opening it on IPFS. You can use an IPFS gateway like `ipfs.io` for this.
- Run `update-md.js` to update the metadata with the new IPFS hash (will look something like: `bafybeigvhgkcqqamlukxcmjodalpk2kuy5qzqtx6m4i6pvb7o3ammss3y4`)
  - The updated file will be in the `finaljson` directory.
- Run the web3-storage-upload.js again, replace the folder in `getFilesFromPath` to "./output/finaljson".
