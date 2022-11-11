export const getSignature = (language, functionName, args) => {
  const argsAsString = args ? args.join(', ') : '';
  const functionsMap = {
    javascript: `const ${functionName} = (${argsAsString}) => {
    //write your code here
}`,
    bash: `${functionName} (${argsAsString}) {
    #write your code here
}`,
    c: `#include <stdio.h>
  
int ${functionName} (${argsAsString}) {
    // write your code here
}`,
    'c++': `#include <iostream>
using namespace std;
          
int ${functionName}(${argsAsString}) {
    // write your code here
}`,
    java: `public static void ${functionName}(${argsAsString}){
    // write your code here
}`,
    python: `def ${functionName}(${argsAsString}):
    # write your code here`,
    r: `${functionName} <- function(${argsAsString}) {
    # write your code here
} `,
  };
  return functionsMap[language] ?? 'Language not found';
};
