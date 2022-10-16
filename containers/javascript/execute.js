const isPalindrom = (word) => {
  if(word.length <= 1) return true;
  if(word[0] !== word[word.length - 1]) return false
  return isPalindrom(word.substring(1, -1))
}

console.log(isPalindrom("ala"))