const texts = {
  javascript: 'console.log("hello world!");',
  java: `public class Main {
    public static void main(String[] args){
      System.out.print("Hello World");
    }
  }`,
  bash: 'echo "Hello world!"',
  c: `#include <stdio.h>
  
  int main() {
      printf("Hello World");
      return 0;
  }`,
  python: 'print("Hello world!")',
  r: 'print("Hello world!")',
  'c++': `#include <iostream>
  using namespace std;
    
  int main() {
      cout << "Hello World";
      return 0;
  }`,
};

module.exports = texts;
