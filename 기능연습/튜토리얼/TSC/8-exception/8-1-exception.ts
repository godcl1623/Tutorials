{
  /**
   * try, catch, finally 기본 예제
   */
  function readFile(fileName: string): void {
    if (fileName === 'not exist!') {
      throw new Error(`Invalid file name: ${fileName}`);
    }
    console.log(fileName);
  }

  function closeFile(): void {
    console.log('closed!');
  }

  /*
    const fileName1 = 'filename';
    const fileName2 = 'not exist!';
    console.log(readFile(fileName1));
    console.log(readFile(fileName2));
    * 결과: Error: Invalid file name: not exist!
  */

  const filename = 'not exist!';

  function run(): void {
    /*
    try {
      console.log(readFile(filename));
    } catch {
      console.log('error occured !');
      return;
    }
    closeFile();
    console.log('finally !');
    * 결과: error occured ! - finally를 작성하지 않을 경우
  */
    try {
      console.log(readFile(filename));
    } catch {
      console.log('error occured !');
      return;
    } finally {
      closeFile();
      console.log('finally !');
    }
    /**
     * 결과
      error occured !
      closed!
      finally !
     */
  }

  run();
}
