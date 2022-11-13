const mapArgs = (language, args, argsType) => {
  const languagesWithTypes = ['c++', 'c', 'java'];
  if (languagesWithTypes.includes(language)) {
    return args
      ? args.map((arg, index) => `${argsType[index]} ${arg}`).join(', ')
      : '';
  }
  return args ? args.join(', ') : '';
};

export const getSignature = (language, functionName, args, argsType = []) => {
  const argsAsString = mapArgs(language, args, argsType);
  const functionsMap = {
    javascript: `const ${functionName} = (${argsAsString}) => {
    //write your code here
}`,
    bash: `${functionName} () {
    #write your code here
}`,
    c: `#include <stdio.h>
  
${
  argsType ? argsType[argsType.length - 1] : 'void'
} ${functionName} (${argsAsString}) {
    // write your code here
}`,
    'c++': `#include <iostream>
using namespace std;
          
${
  argsType ? argsType[argsType.length - 1] : 'void'
} ${functionName}(${argsAsString}) {
    // write your code here
}`,
    java: `public class Main() {
  public static ${
    argsType ? argsType[argsType.length - 1] : 'void'
  } ${functionName}(${argsAsString}){
    // write your code here
  }
}`,
    python: `def ${functionName}(${argsAsString}):
    # write your code here`,
    r: `${functionName} <- function(${argsAsString}) {
    # write your code here
} `,
  };
  return functionsMap[language] ?? 'Language not found';
};
