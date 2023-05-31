const _ = require('lodash');

const mapArgs = (language, args, argsType) => {
  const languagesWithTypes = ['c++', 'c', 'java'];
  if (languagesWithTypes.includes(language)) {
    return args
      ? args.map((arg, index) => `${argsType[index]} ${arg}`).join(', ')
      : '';
  }
  return args ? args.join(', ') : '';
};

const getCustomClasses = (types, language) => {
    const classes = _.uniq(types);
    const commentSigns = '//';
    if (language === 'java' || language === 'c++') {
        return classes.reduce((acc, currentType) =>
                acc + `class ${currentType} {
   ${commentSigns} Implement your class ${currentType} here
}\n\n`, '');
    }
    return '';
};


export const getSignature = (language, functionName, args, argsType = [], customTypes) => {
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
\n${getCustomClasses(customTypes, language)}
${
  argsType ? argsType[argsType.length - 1] : 'void'
} ${functionName}(${argsAsString}) {
    // write your code here
}`,
    java: getCustomClasses(customTypes, language) + `public class Main {
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
