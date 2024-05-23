export function parseLevelLetters(levelLetters) {
    return levelLetters.split(",");
}

export function parseLevelWords(levelWords) {
    const wordsArray = levelWords.split("|");
    
    const parsedWords = [];
    
    wordsArray.forEach(word => {
        const wordInfo = word.split(",");
        // const x = parseInt(wordInfo[0]);
        // const y = parseInt(wordInfo[1]);
        // const text = wordInfo[2];
        // const direction = wordInfo[3];
        parsedWords.push(wordInfo);
    });
    
    return parsedWords;
}


export function getMaxLength(wordList) {
    if (wordList.length === 0) {
        return 0; 
    }
    const firstWordLength = wordList[0][2].length; 

    const remainingMaxLength = getMaxLength(wordList.slice(1));

    return Math.max(firstWordLength, remainingMaxLength);
}