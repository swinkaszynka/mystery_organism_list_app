// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (organismNumber, arrayDNA) => {
  return {
    specimenNum: organismNumber,
    dna: arrayDNA,
    mutate() {
      let arrayRoll = Math.floor(Math.random()*15)
      while (true) {
        let newBase = returnRandBase(); 
        if (arrayDNA[arrayRoll] !== newBase) {
          arrayDNA[arrayRoll] = newBase;
          break;
        }
      }
      return this.dna = arrayDNA;
    },
    compareDNA(comparedpAequor) {
      let counter = 0;
      for (let i = 0; i < comparedpAequor.dna.length; i++) {
        if (this.dna[i] === comparedpAequor.dna[i]) {
          counter++;
        }
      }
      const percentDNA = Math.floor(counter/comparedpAequor.dna.length*100);
      console.log(`specimen ${comparedpAequor.specimenNum} and specimen ${this.specimenNum} have ${percentDNA}% DNA in common`)
    },
    willLikelySurvive(){
      let surviveCounter = 0;
      this.dna.forEach(element => {
        if (element === 'C' || element === 'G') {
          surviveCounter++;
        }
      });
      if (surviveCounter/this.dna.length*100 >= 60) {
        return true;
      } else {
        return false;
      };
    },
  }
};

const createSamples = () => {
  let sampleList = [];
  let instancesCounter = 0;
  while (instancesCounter<30){
    let sample = pAequorFactory(instancesCounter, mockUpStrand());
    console.log(sample.willLikelySurvive());
    if (sample.willLikelySurvive() === true) {
      sampleList.push(sample);
      instancesCounter++;
      console.log(sampleList);
    } else {
      delete sample;
    }
  };
  return sampleList;
}

console.log(pAequorFactory(1,mockUpStrand()));
//console.log(JSON.stringify(pAequorFactory[0]));

const johnny = pAequorFactory(2, mockUpStrand());
const kalesony = pAequorFactory(3, mockUpStrand());

console.log(JSON.stringify(johnny));
johnny.mutate();
console.log(JSON.stringify(johnny));

johnny.compareDNA(kalesony);

johnny.willLikelySurvive();

console.log(createSamples());