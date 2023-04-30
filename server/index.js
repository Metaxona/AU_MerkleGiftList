const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList.json');

const port = 1225;

const app = express();
app.use(express.json());

// const MERKLE_ROOT = new MerkleTree(niceList).getRoot(); <- Use This For A Dynamic Merkle Root That Changes When The Nice List Is Changed
const MERKLE_ROOT = 'ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa'; 

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const {proof, leaf} = req.body;
  
  const isInTheList = verifyProof(proof, leaf, MERKLE_ROOT);

  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
