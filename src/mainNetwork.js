import natural from 'natural';

class BayesNetwork {
  constructor(fileName) {
    this.fileName = fileName;

    this.classifier = natural.BayesClassifier.load(
      this.fileName, natural.PorterStemmerPt, (err, loadedClassifier) => {
        if (err) {
          this.classifier = new natural.BayesClassifier();
          return;
        }

        this.classifier = loadedClassifier;
        this.trainedClassifier = loadedClassifier;
        this.trainedClassifier.train();
        console.log('Successfully loaded!');
      },
    );
  }

  saveAndTrain() {
    this.classifier.save(this.fileName, (err, savedClassifier) => {
      console.log('Trained!');
      savedClassifier.train();
      this.trainedClassifier = savedClassifier;
    });
  }

  tokenizeAndLearn(message, label) {
    const tokenizedMessage = natural.PorterStemmerPt.tokenizeAndStem(message);
    console.log(tokenizedMessage);
    this.classifier.addDocument(tokenizedMessage, label);
  }

  classificationSumary(text) {
    const classification = this.trainedClassifier.getClassifications(text);
    return classification.sort((a, b) => {
      if (a.value > b.value) return -1;
      if (a.value < b.value) return 1;
      return 0;
    });
  }
}

export default BayesNetwork;
