export const getDataTypes = (language) => {
  const dataTypesMap = {
    java: [
      'int',
      'float',
      'char',
      'boolean',
      'String',
      'byte',
      'long',
      'double',
    ],
    'c++': ['char', 'int', 'long', 'float', 'double', 'string', 'bool'],
    c: ['char', 'short', 'int', 'long', 'float', 'double', 'bool', 'void'],
  };
  return dataTypesMap[language.toLowerCase()] ?? ['wrong language'];
};
