// 15 - Sep - 2022

const SHA256 = require('crypto-js/sha256');

class Block {

    constructor(index, data, timeStamp, previousHash = '') {
        this.index = index;
        this.data = data;
        this.timeStamp = timeStamp;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(
            this.index +
            JSON.stringify(this.data) +
            this.timeStamp +
            this.previousHash)
            .toString();
    }
}

// 🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗
class BlockChain {

    constructor() {
        this.chain = [this.createGenesisBlock()]
    }

    // 1st Block init...
    createGenesisBlock() {
        return new Block(1, 'Genesis Block', '15-09-2022', '0');
    }

    // just return last block from blockchain...
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();

        this.chain.push(newBlock);
    }

    isChainValid() {

        const blockChain = this.chain.length;

        for (let i = 1; i < blockChain; i++) {

            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false
            }
        }

        return true;
    }
}
// 🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗


// create instance of BlockChain class... 
const seenCoin = new BlockChain();

// add Block into BlocChain...
seenCoin.addBlock(new Block(2, { amount: 10 }, '16-09-2022'));
seenCoin.addBlock(new Block(3, { amount: 20 }, '16-09-2022'));

console.log(seenCoin);
// console.log(seenCoin.chain[1]);
// console.log(seenCoin.chain[1].data);

console.log('Is BlockChain valid? ==>', seenCoin.isChainValid());

// trying to temper blockChain...
seenCoin.chain[1].data = { amount: 50 }
seenCoin.chain[1].hash = seenCoin.chain[1].calculateHash()

console.log('Is BlockChain valid? ==>', seenCoin.isChainValid());
