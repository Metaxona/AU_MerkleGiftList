const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  const tree = new MerkleTree(niceList)
  const args = process.argv
  const name = args.slice(2)[0]
  const leaf = niceList.indexOf(args.slice(2)[0])
  const proof = tree.getProof(leaf)

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof: proof,
    leaf: name
  });

  console.log({ gift });
}

main();